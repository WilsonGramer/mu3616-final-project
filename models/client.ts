export type ClientMessage = JoinClientMessage | SequenceClientMessage;

export interface JoinClientMessage {
    type: "join";
}

export interface SequenceClientMessage {
    type: "sequence";
    sequence: boolean[]; // 16 beats
}
