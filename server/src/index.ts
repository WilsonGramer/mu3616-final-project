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
import {
    Instrument,
    percussion as initialPercussion,
    instruments as initialInstruments,
} from "./instruments";
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
    instrumentName: string;
    instrument: Instrument;
}

const joined = new Map<WebSocket, User>();

const teams: Team[] = ["red", "green", "blue", "yellow"];

let lastTeam = 0;
let prompts = [...initialPrompts];
let promptMap = new Map<Team, string>();
let instrumentMap = new Map<
    Team,
    {
        instruments: Record<string, Instrument>;
        percussion: Record<string, Instrument>;
    }
>();
let sequences = new Map<Team, Map<WebSocket, [Instrument, boolean[]]>>();

const minNote = 24;
const maxNote = 72;

const randomizeInstruments = (): Record<string, Instrument> =>
    Object.fromEntries(
        Object.entries(initialInstruments).map(([name, instrument]) => [
            name,
            {
                ...instrument,
                note: Math.floor(Math.random() * (maxNote - minNote + 1)) + minNote,
            },
        ])
    );

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
        instrumentMap.set(team, {
            percussion: { ...initialPercussion },
            instruments: randomizeInstruments(),
        });
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
        .map(([ws, user]) => sequences.get(team)!.get(ws)![0]);

    for (let i = 0; i < teamInstruments.length; i++) {
        const instrument = teamInstruments[i];
        Max.outlet("instruments", i, instrument.channel, instrument.program, instrument.note);
    }
});

const endGame = () => {
    console.log("Ending game");

    for (const ws of joined.keys()) {
        ws.send(JSON.stringify({ type: "endGame" } satisfies EndGameServerMessage));
    }

    for (const team of teams) {
        console.log("================");
        console.log(team, "team:");
        console.log("Prompt:", promptMap.get(team)!);
    }
};

const nextTeam = () => {
    const team = teams[lastTeam];
    lastTeam = (lastTeam + 1) % teams.length;
    return team;
};

const promptForTeam = (team: Team) => promptMap.get(team)!;

const percussionProbability = 0.75;

const nextInstrument = (team: Team): [string, Instrument] => {
    const [kind, initial] =
        Math.random() < percussionProbability
            ? ["percussion" as const, initialPercussion]
            : ["instruments" as const, randomizeInstruments()];

    const instruments = instrumentMap.get(team)![kind];
    const index = Math.floor(Math.random() * Object.keys(instruments).length);
    const instrumentName = Object.keys(instruments)[index];
    const instrument = instruments[instrumentName];
    delete instruments[instrumentName];

    if (Object.keys(instruments).length === 0) {
        instrumentMap.get(team)![kind] = { ...initial };
    }

    return [instrumentName, instrument];
};

server.on("connection", (ws) => {
    ws.on("error", console.error);

    let team: Team;
    let prompt: string;
    let instrumentName: string;
    let instrument: Instrument;
    ws.on("message", (data) => {
        const message: ClientMessage = JSON.parse(data.toString());

        switch (message.type) {
            case "join":
                team = nextTeam();
                prompt = promptForTeam(team);
                [instrumentName, instrument] = nextInstrument(team);

                joined.set(ws, {
                    team,
                    prompt,
                    instrumentName,
                    instrument,
                });

                ws.send(
                    JSON.stringify({
                        type: "setup",
                        team,
                        prompt,
                        instrument: instrumentName,
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
