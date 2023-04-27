import { Pitch } from "./index";

export type ClientMessage =
    | JoinClientMessage
    | NewInstrumentClientMessage
    | PitchClientMessage
    | SequenceClientMessage;

export interface JoinClientMessage {
    type: "join";
}

export interface NewInstrumentClientMessage {
    type: "newInstrument";
}

export interface PitchClientMessage {
    type: "pitch";
    pitch: Pitch;
}

export interface SequenceClientMessage {
    type: "sequence";
    sequence: boolean[]; // 16 beats
}
