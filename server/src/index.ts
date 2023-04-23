import { WebSocket, WebSocketServer } from "ws";
import addMilliseconds from "date-fns/addMilliseconds";
import secondsToMilliseconds from "date-fns/secondsToMilliseconds";
import {
    BeginGameServerMessage,
    ClientMessage,
    EndGameServerMessage,
    SetupServerMessage,
    Team,
} from "../../models";
import { instruments as initialInstruments } from "./instruments";
import { prompts as initialPrompts } from "./prompts";
import { zip } from "./zip";

let Max: typeof import("max-api").default | undefined = undefined;
try {
    Max = require("max-api");
    console.log("max-api loaded");
} catch {
    console.log("failed to load max-api, disabling Max integration");
}

const port = 8080;

const server = new WebSocketServer({ port });

interface User {
    team: string;
    prompt: string;
    instrument: string;
}

const joined = new Map<WebSocket, User>();

const teams: Team[] = ["red", "green", "blue", "yellow"];

let lastTeam = 0;
let prompts = [...initialPrompts];
let promptMap = new Map<Team, string>();
let instrumentMap = new Map<Team, string[]>();
let sequences = new Map<Team, Map<WebSocket, [string, boolean[]]>>();

const newGame = () => {
    console.log("Starting new game");

    lastTeam = 0;

    promptMap = new Map();
    for (const team of teams) {
        const index = Math.floor(Math.random() * prompts.length);
        const prompt = prompts[index];
        prompts.splice(index, 1);

        if (prompts.length === 0) {
            prompts = [...initialPrompts];
        }

        promptMap.set(team, prompt);
    }

    instrumentMap = new Map();
    for (const team of teams) {
        instrumentMap.set(team, [...initialInstruments]);
    }

    sequences = new Map();
    for (const team of teams) {
        sequences.set(team, new Map());
    }
};

newGame();

Max?.addHandler("new-game", () => {
    newGame();
});

const gameLengthMs = secondsToMilliseconds(15); // FIXME: MAKE LONGER

const beginGame = () => {
    console.log("Beginning game");

    const endTime = addMilliseconds(new Date(), gameLengthMs);

    for (const ws of joined.keys()) {
        ws.send(
            JSON.stringify({
                type: "beginGame",
                endTime: endTime.toISOString(),
            } satisfies BeginGameServerMessage)
        );
    }

    setTimeout(() => {
        endGame();
    }, gameLengthMs);
};

Max?.addHandler("begin-game", () => {
    beginGame();
});

Max?.addHandler("sequences", async (team: Team) => {
    if (!Max) return;

    const teamSequences = [
        ...zip(
            ...[...joined]
                .filter(([ws, user]) => user.team === team)
                .map(([ws, user]) => sequences.get(team)!.get(ws)![1])
                .filter((sequence): sequence is boolean[] => sequence != null)
        ),
    ].map((sequence) => sequence.map(Number).join(" "));

    for (let i = 0; i < teamSequences.length; i++) {
        Max.outlet("sequences", i, teamSequences[i]);
    }
});

Max?.addHandler("instruments", async (team: Team) => {
    if (!Max) return;

    const teamInstruments = [...joined]
        .filter(([ws, user]) => user.team === team)
        .map(([ws, user]) => sequences.get(team)!.get(ws)![0])
        .map((instrument) => initialInstruments.indexOf(instrument));

    for (let i = 0; i < teamInstruments.length; i++) {
        Max.outlet("instruments", i, teamInstruments[i]);
    }
});

const endGame = () => {
    console.log("Ending game");

    for (const ws of joined.keys()) {
        ws.send(JSON.stringify({ type: "endGame" } satisfies EndGameServerMessage));
    }
};

const nextTeam = () => {
    const team = teams[lastTeam];
    lastTeam = (lastTeam + 1) % teams.length;
    return team;
};

const promptForTeam = (team: Team) => promptMap.get(team)!;

const nextInstrument = (team: Team) => {
    const instruments = instrumentMap.get(team)!;
    const index = Math.floor(Math.random() * instruments.length);
    const instrument = instruments[index];
    instruments.splice(index, 1);

    if (instruments.length === 0) {
        instrumentMap.set(team, [...initialInstruments]);
    }

    return instrument;
};

server.on("connection", (ws) => {
    ws.on("error", console.error);

    let team: Team;
    let prompt: string;
    let instrument: string;
    ws.on("message", (data) => {
        const message: ClientMessage = JSON.parse(data.toString());

        switch (message.type) {
            case "join":
                team = nextTeam();
                prompt = promptForTeam(team);
                instrument = nextInstrument(team);

                joined.set(ws, {
                    team,
                    prompt,
                    instrument,
                });

                ws.send(
                    JSON.stringify({
                        type: "setup",
                        team,
                        prompt,
                        instrument,
                    } satisfies SetupServerMessage)
                );

                break;
            case "sequence":
                sequences.get(team)!.set(ws, [instrument, message.sequence]);

                break;
        }
    });

    ws.on("close", () => {
        joined.delete(ws);
    });
});
