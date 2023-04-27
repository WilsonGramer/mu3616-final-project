export interface Instrument {
    channel: number;
    program: number;
    pitched: boolean;
    note?: number;
}

const instrumentChannel = 1;
const percussionChannel = 10;
const percussionProgram = 0;

export const instruments: Record<string, Instrument> = {
    "Acoustic Grand Piano": {
        channel: instrumentChannel,
        program: 0,
        pitched: true,
    },
    "Bright Acoustic Piano": {
        channel: instrumentChannel,
        program: 1,
        pitched: true,
    },
    "Electric Grand Piano": {
        channel: instrumentChannel,
        program: 2,
        pitched: true,
    },
    "Honky-tonk Piano": {
        channel: instrumentChannel,
        program: 3,
        pitched: true,
    },
    "Electric Piano 1": {
        channel: instrumentChannel,
        program: 4,
        pitched: true,
    },
    "Electric Piano 2": {
        channel: instrumentChannel,
        program: 5,
        pitched: true,
    },
    Harpsichord: {
        channel: instrumentChannel,
        program: 6,
        pitched: true,
    },
    Clavi: {
        channel: instrumentChannel,
        program: 7,
        pitched: true,
    },
    Celesta: {
        channel: instrumentChannel,
        program: 8,
        pitched: true,
    },
    Glockenspiel: {
        channel: instrumentChannel,
        program: 9,
        pitched: true,
    },
    "Music Box": {
        channel: instrumentChannel,
        program: 10,
        pitched: true,
    },
    Vibraphone: {
        channel: instrumentChannel,
        program: 11,
        pitched: true,
    },
    Marimba: {
        channel: instrumentChannel,
        program: 12,
        pitched: true,
    },
    Xylophone: {
        channel: instrumentChannel,
        program: 13,
        pitched: true,
    },
    "Tubular Bells": {
        channel: instrumentChannel,
        program: 14,
        pitched: true,
    },
    Dulcimer: {
        channel: instrumentChannel,
        program: 15,
        pitched: true,
    },
    "Drawbar Organ": {
        channel: instrumentChannel,
        program: 16,
        pitched: true,
    },
    "Percussive Organ": {
        channel: instrumentChannel,
        program: 17,
        pitched: true,
    },
    "Rock Organ": {
        channel: instrumentChannel,
        program: 18,
        pitched: true,
    },
    "Church Organ": {
        channel: instrumentChannel,
        program: 19,
        pitched: true,
    },
    "Reed Organ": {
        channel: instrumentChannel,
        program: 20,
        pitched: true,
    },
    Accordion: {
        channel: instrumentChannel,
        program: 21,
        pitched: true,
    },
    Harmonica: {
        channel: instrumentChannel,
        program: 22,
        pitched: true,
    },
    "Tango Accordion": {
        channel: instrumentChannel,
        program: 23,
        pitched: true,
    },
    "Acoustic Guitar (nylon)": {
        channel: instrumentChannel,
        program: 24,
        pitched: true,
    },
    "Acoustic Guitar (steel)": {
        channel: instrumentChannel,
        program: 25,
        pitched: true,
    },
    "Electric Guitar (jazz)": {
        channel: instrumentChannel,
        program: 26,
        pitched: true,
    },
    "Electric Guitar (clean)": {
        channel: instrumentChannel,
        program: 27,
        pitched: true,
    },
    "Electric Guitar (muted)": {
        channel: instrumentChannel,
        program: 28,
        pitched: true,
    },
    "Overdriven Guitar": {
        channel: instrumentChannel,
        program: 29,
        pitched: true,
    },
    "Distortion Guitar": {
        channel: instrumentChannel,
        program: 30,
        pitched: true,
    },
    "Guitar harmonics": {
        channel: instrumentChannel,
        program: 31,
        pitched: true,
    },
    "Acoustic Bass": {
        channel: instrumentChannel,
        program: 32,
        pitched: true,
    },
    "Electric Bass (finger)": {
        channel: instrumentChannel,
        program: 33,
        pitched: true,
    },
    "Electric Bass (pick)": {
        channel: instrumentChannel,
        program: 34,
        pitched: true,
    },
    "Fretless Bass": {
        channel: instrumentChannel,
        program: 35,
        pitched: true,
    },
    "Slap Bass 1": {
        channel: instrumentChannel,
        program: 36,
        pitched: true,
    },
    "Slap Bass 2": {
        channel: instrumentChannel,
        program: 37,
        pitched: true,
    },
    "Synth Bass 1": {
        channel: instrumentChannel,
        program: 38,
        pitched: true,
    },
    "Synth Bass 2": {
        channel: instrumentChannel,
        program: 39,
        pitched: true,
    },
    Violin: {
        channel: instrumentChannel,
        program: 40,
        pitched: true,
    },
    Viola: {
        channel: instrumentChannel,
        program: 41,
        pitched: true,
    },
    Cello: {
        channel: instrumentChannel,
        program: 42,
        pitched: true,
    },
    Contrabass: {
        channel: instrumentChannel,
        program: 43,
        pitched: true,
    },
    "Tremolo Strings": {
        channel: instrumentChannel,
        program: 44,
        pitched: true,
    },
    "Pizzicato Strings": {
        channel: instrumentChannel,
        program: 45,
        pitched: true,
    },
    "Orchestral Harp": {
        channel: instrumentChannel,
        program: 46,
        pitched: true,
    },
    Timpani: {
        channel: instrumentChannel,
        program: 47,
        pitched: true,
    },
    "String Ensemble 1": {
        channel: instrumentChannel,
        program: 48,
        pitched: true,
    },
    "String Ensemble 2": {
        channel: instrumentChannel,
        program: 49,
        pitched: true,
    },
    "SynthStrings 1": {
        channel: instrumentChannel,
        program: 50,
        pitched: true,
    },
    "SynthStrings 2": {
        channel: instrumentChannel,
        program: 51,
        pitched: true,
    },
    "Choir Aahs": {
        channel: instrumentChannel,
        program: 52,
        pitched: true,
    },
    "Voice Oohs": {
        channel: instrumentChannel,
        program: 53,
        pitched: true,
    },
    "Synth Voice": {
        channel: instrumentChannel,
        program: 54,
        pitched: true,
    },
    "Orchestra Hit": {
        channel: instrumentChannel,
        program: 55,
        pitched: true,
    },
    Trumpet: {
        channel: instrumentChannel,
        program: 56,
        pitched: true,
    },
    Trombone: {
        channel: instrumentChannel,
        program: 57,
        pitched: true,
    },
    Tuba: {
        channel: instrumentChannel,
        program: 58,
        pitched: true,
    },
    "Muted Trumpet": {
        channel: instrumentChannel,
        program: 59,
        pitched: true,
    },
    "French Horn": {
        channel: instrumentChannel,
        program: 60,
        pitched: true,
    },
    "Brass Section": {
        channel: instrumentChannel,
        program: 61,
        pitched: true,
    },
    "SynthBrass 1": {
        channel: instrumentChannel,
        program: 62,
        pitched: true,
    },
    "SynthBrass 2": {
        channel: instrumentChannel,
        program: 63,
        pitched: true,
    },
    "Soprano Sax": {
        channel: instrumentChannel,
        program: 64,
        pitched: true,
    },
    "Alto Sax": {
        channel: instrumentChannel,
        program: 65,
        pitched: true,
    },
    "Tenor Sax": {
        channel: instrumentChannel,
        program: 66,
        pitched: true,
    },
    "Baritone Sax": {
        channel: instrumentChannel,
        program: 67,
        pitched: true,
    },
    Oboe: {
        channel: instrumentChannel,
        program: 68,
        pitched: true,
    },
    "English Horn": {
        channel: instrumentChannel,
        program: 69,
        pitched: true,
    },
    Bassoon: {
        channel: instrumentChannel,
        program: 70,
        pitched: true,
    },
    Clarinet: {
        channel: instrumentChannel,
        program: 71,
        pitched: true,
    },
    Piccolo: {
        channel: instrumentChannel,
        program: 72,
        pitched: true,
    },
    Flute: {
        channel: instrumentChannel,
        program: 73,
        pitched: true,
    },
    Recorder: {
        channel: instrumentChannel,
        program: 74,
        pitched: true,
    },
    "Pan Flute": {
        channel: instrumentChannel,
        program: 75,
        pitched: true,
    },
    "Blown Bottle": {
        channel: instrumentChannel,
        program: 76,
        pitched: true,
    },
    Shakuhachi: {
        channel: instrumentChannel,
        program: 77,
        pitched: true,
    },
    Whistle: {
        channel: instrumentChannel,
        program: 78,
        pitched: true,
    },
    Ocarina: {
        channel: instrumentChannel,
        program: 79,
        pitched: true,
    },
    "Lead 1 (square)": {
        channel: instrumentChannel,
        program: 80,
        pitched: true,
    },
    "Lead 2 (sawtooth)": {
        channel: instrumentChannel,
        program: 81,
        pitched: true,
    },
    "Lead 3 (calliope)": {
        channel: instrumentChannel,
        program: 82,
        pitched: true,
    },
    "Lead 4 (chiff)": {
        channel: instrumentChannel,
        program: 83,
        pitched: true,
    },
    "Lead 5 (charang)": {
        channel: instrumentChannel,
        program: 84,
        pitched: true,
    },
    "Lead 6 (voice)": {
        channel: instrumentChannel,
        program: 85,
        pitched: true,
    },
    "Lead 7 (fifths)": {
        channel: instrumentChannel,
        program: 86,
        pitched: true,
    },
    "Lead 8 (bass + lead)": {
        channel: instrumentChannel,
        program: 87,
        pitched: true,
    },
    "Pad 1 (new age)": {
        channel: instrumentChannel,
        program: 88,
        pitched: true,
    },
    "Pad 2 (warm)": {
        channel: instrumentChannel,
        program: 89,
        pitched: true,
    },
    "Pad 3 (polysynth)": {
        channel: instrumentChannel,
        program: 90,
        pitched: true,
    },
    "Pad 4 (choir)": {
        channel: instrumentChannel,
        program: 91,
        pitched: true,
    },
    "Pad 5 (bowed)": {
        channel: instrumentChannel,
        program: 92,
        pitched: true,
    },
    "Pad 6 (metallic)": {
        channel: instrumentChannel,
        program: 93,
        pitched: true,
    },
    "Pad 7 (halo)": {
        channel: instrumentChannel,
        program: 94,
        pitched: true,
    },
    "Pad 8 (sweep)": {
        channel: instrumentChannel,
        program: 95,
        pitched: true,
    },
    "FX 1 (rain)": {
        channel: instrumentChannel,
        program: 96,
        pitched: true,
    },
    "FX 2 (soundtrack)": {
        channel: instrumentChannel,
        program: 97,
        pitched: true,
    },
    "FX 3 (crystal)": {
        channel: instrumentChannel,
        program: 98,
        pitched: true,
    },
    "FX 4 (atmosphere)": {
        channel: instrumentChannel,
        program: 99,
        pitched: true,
    },
    "FX 5 (brightness)": {
        channel: instrumentChannel,
        program: 100,
        pitched: true,
    },
    "FX 6 (goblins)": {
        channel: instrumentChannel,
        program: 101,
        pitched: true,
    },
    "FX 7 (echoes)": {
        channel: instrumentChannel,
        program: 102,
        pitched: true,
    },
    "FX 8 (sci-fi)": {
        channel: instrumentChannel,
        program: 103,
        pitched: true,
    },
    Sitar: {
        channel: instrumentChannel,
        program: 104,
        pitched: true,
    },
    Banjo: {
        channel: instrumentChannel,
        program: 105,
        pitched: true,
    },
    Shamisen: {
        channel: instrumentChannel,
        program: 106,
        pitched: true,
    },
    Koto: {
        channel: instrumentChannel,
        program: 107,
        pitched: true,
    },
    Kalimba: {
        channel: instrumentChannel,
        program: 108,
        pitched: true,
    },
    "Bag pipe": {
        channel: instrumentChannel,
        program: 109,
        pitched: true,
    },
    Fiddle: {
        channel: instrumentChannel,
        program: 110,
        pitched: true,
    },
    Shanai: {
        channel: instrumentChannel,
        program: 111,
        pitched: true,
    },
    "Tinkle Bell": {
        channel: instrumentChannel,
        program: 112,
        pitched: true,
    },
    Agogo: {
        channel: instrumentChannel,
        program: 113,
        pitched: true,
    },
    "Steel Drums": {
        channel: instrumentChannel,
        program: 114,
        pitched: true,
    },
    Woodblock: {
        channel: instrumentChannel,
        program: 115,
        pitched: true,
    },
    "Taiko Drum": {
        channel: instrumentChannel,
        program: 116,
        pitched: true,
    },
    "Melodic Tom": {
        channel: instrumentChannel,
        program: 117,
        pitched: true,
    },
    "Synth Drum": {
        channel: instrumentChannel,
        program: 118,
        pitched: true,
    },
    "Reverse Cymbal": {
        channel: instrumentChannel,
        program: 119,
        pitched: true,
    },
    "Guitar Fret Noise": {
        channel: instrumentChannel,
        program: 120,
        pitched: true,
    },
    "Breath Noise": {
        channel: instrumentChannel,
        program: 121,
        pitched: true,
    },
    Seashore: {
        channel: instrumentChannel,
        program: 122,
        pitched: true,
    },
    "Bird Tweet": {
        channel: instrumentChannel,
        program: 123,
        pitched: true,
    },
    "Telephone Ring": {
        channel: instrumentChannel,
        program: 124,
        pitched: true,
    },
    Helicopter: {
        channel: instrumentChannel,
        program: 125,
        pitched: true,
    },
    Applause: {
        channel: instrumentChannel,
        program: 126,
        pitched: true,
    },
    Gunshot: {
        channel: instrumentChannel,
        program: 127,
        pitched: true,
    },
    "Acoustic Bass Drum": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 35,
    },
    "Bass Drum 1": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 36,
    },
    "Side Stick": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 37,
    },
    "Acoustic Snare": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 38,
    },
    "Hand Clap": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 39,
    },
    "Electric Snare": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 40,
    },
    "Low Floor Tom": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 41,
    },
    "Closed Hi Hat": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 42,
    },
    "High Floor Tom": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 43,
    },
    "Pedal Hi-Hat": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 44,
    },
    "Low Tom": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 45,
    },
    "Open Hi-Hat": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 46,
    },
    "Low-Mid Tom": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 47,
    },
    "Hi-Mid Tom": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 48,
    },
    "Crash Cymbal 1": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 49,
    },
    "High Tom": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 50,
    },
    "Ride Cymbal 1": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 51,
    },
    "Chinese Cymbal": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 52,
    },
    "Ride Bell": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 53,
    },
    Tambourine: {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 54,
    },
    "Splash Cymbal": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 55,
    },
    Cowbell: {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 56,
    },
    "Crash Cymbal 2": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 57,
    },
    Vibraslap: {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 58,
    },
    "Ride Cymbal 2": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 59,
    },
    "Hi Bongo": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 60,
    },
    "Low Bongo": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 61,
    },
    "Mute Hi Conga": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 62,
    },
    "Open Hi Conga": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 63,
    },
    "Low Conga": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 64,
    },
    "High Timbale": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 65,
    },
    "Low Timbale": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 66,
    },
    "High Agogo": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 67,
    },
    "Low Agogo": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 68,
    },
    Cabasa: {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 69,
    },
    Maracas: {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 70,
    },
    "Short Whistle": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 71,
    },
    "Long Whistle": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 72,
    },
    "Short Guiro": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 73,
    },
    "Long Guiro": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 74,
    },
    Claves: {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 75,
    },
    "Hi Wood Block": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 76,
    },
    "Low Wood Block": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 77,
    },
    "Mute Cuica": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 78,
    },
    "Open Cuica": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 79,
    },
    "Mute Triangle": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 80,
    },
    "Open Triangle": {
        channel: percussionChannel,
        program: percussionProgram,
        pitched: false,
        note: 81,
    },
};
