export type ServerMessage = SetupServerMessage | BeginGameServerMessage | EndGameServerMessage;

export interface SetupServerMessage {
    type: "setup";
    team: Team;
    prompt: string;
    instrument: { name: string; pitched: boolean };
}

export type Team = "red" | "green" | "blue" | "yellow";

export interface BeginGameServerMessage {
    type: "beginGame";
    endTime: string; // ISO 8601 date
}

export interface EndGameServerMessage {
    type: "endGame";
}
