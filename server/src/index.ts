import { WebSocket, WebSocketServer } from "ws";
import addMilliseconds from "date-fns/addMilliseconds";
import secondsToMilliseconds from "date-fns/secondsToMilliseconds";
import {
    BeginGameServerMessage,
    ClientMessage,
    EndGameServerMessage,
    Pitch,
    SetupServerMessage,
    Team,
} from "../../models";
import { Instrument, instruments as initialInstruments } from "./instruments";
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

const joined: [WebSocket, Team][] = [];

const teams: Team[] = ["red", "green", "blue", "yellow"];

let lastTeam = 0;
let prompts = [...initialPrompts];
let promptMap = new Map<Team, string>();
let instrumentMap = new Map<Team, Record<string, Instrument>>();
let keyMap = new Map<Team, number>();
let sequences = new Map<Team, Map<WebSocket, [Instrument, Pitch, boolean[]]>>();

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
        instrumentMap.set(team, { ...initialInstruments });
    }

    keyMap = new Map();
    for (const team of teams) {
        keyMap.set(team, Math.floor(Math.random() * 12));
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

const gameLengthMs = secondsToMilliseconds(4500);

const beginGame = () => {
    console.log("Beginning game");

    const endTime = addMilliseconds(new Date(), gameLengthMs);

    for (const [ws] of joined) {
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

let previousNotes: [Instrument, number][] = [];

const stop = () => {
    if (!Max) return;

    // Stop playing old notes
    for (const [instrument, note] of previousNotes) {
        Max.outlet("program", instrument.program, instrument.channel);
        Max.outlet("note", note, 0, instrument.channel);
    }

    previousNotes = [];
};

Max?.addHandler("stop", stop);

Max?.addHandler("play", async (team: Team, index: number) => {
    if (!Max) return;

    stop();

    const teamKey = keyMap.get(team)!;

    let teamUsers: [Instrument, Pitch, boolean[]][] = [];
    for (const [ws, joinedTeam] of joined) {
        if (joinedTeam !== team) continue;
        teamUsers.push(sequences.get(team)!.get(ws)!);
    }

    // Start playing new notes
    for (const [instrument, pitch, sequence] of teamUsers) {
        const note = instrument.note ?? teamKey + pitch * 12 + 24;
        const velocity = sequence[index] ? 127 : 0;

        Max.outlet("program", instrument.program, instrument.channel);
        Max.outlet("note", note, velocity, instrument.channel);
        previousNotes.push([instrument, note]);
    }
});

const endGame = () => {
    console.log("Ending game");

    for (const [ws] of joined) {
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

const nextInstrument = (
    team: Team,
    previousInstrument?: [string, Instrument]
): [string, Instrument] => {
    const instruments = instrumentMap.get(team)!;
    const index = Math.floor(Math.random() * Object.keys(instruments).length);
    const instrumentName = Object.keys(instruments)[index];
    const instrument = instruments[instrumentName];

    console.log("new instrument:", instrument);

    delete instruments[instrumentName];

    if (previousInstrument != null) {
        instruments[previousInstrument[0]] = previousInstrument[1];
    }

    if (Object.keys(instruments).length === 0) {
        instrumentMap.set(team, { ...initialInstruments });
    }

    return [instrumentName, instrument];
};

server.on("connection", (ws) => {
    ws.on("error", console.error);

    let team: Team;
    let prompt: string;
    let instrumentName: string;
    let instrument: Instrument;
    let pitch: Pitch;
    let sequence: boolean[];

    const setup = () => {
        ws.send(
            JSON.stringify({
                type: "setup",
                team,
                prompt,
                instrument: {
                    name: instrumentName,
                    pitched: instrument.pitched,
                },
            } satisfies SetupServerMessage)
        );
    };

    const update = () => {
        sequences.get(team)!.set(ws, [instrument, pitch, sequence]);
    };

    ws.on("message", (data) => {
        const message: ClientMessage = JSON.parse(data.toString());

        switch (message.type) {
            case "join":
                team = nextTeam();
                prompt = promptForTeam(team);
                [instrumentName, instrument] = nextInstrument(team);

                const existing = joined.findIndex(([ws_]) => ws_ === ws);
                if (existing !== -1) {
                    joined.splice(existing, 1);
                }

                joined.push([ws, team]);

                setup();

                break;
            case "newInstrument":
                [instrumentName, instrument] = nextInstrument(team, [instrumentName, instrument]);
                update();
                setup();

                break;
            case "pitch":
                pitch = message.pitch;
                update();

                break;
            case "sequence":
                sequence = message.sequence;
                update();

                break;
        }
    });

    ws.on("close", () => {
        const existing = joined.findIndex(([ws_]) => ws_ === ws);

        if (existing !== -1) {
            joined.splice(existing, 1);
        }

        console.log(joined.length);
    });
});
