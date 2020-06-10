const notes = [
  "A",
  "A#/Bb",
  "B",
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
];

const maj_scale_steps = [2, 2, 1, 2, 2, 2];
const min_scale_steps = [2, 1, 2, 2, 1, 2];
const maj_chords = ["maj", "min", "min", "maj", "maj", "min", "dim"];
const min_chords = ["min", "dim", "maj", "min", "min", "maj", "maj"];

const maj_penta_steps = [2, 2, 3, 2];
const min_penta_steps = [3, 2, 2, 3];
const maj_penta_chords = ["maj", "min", "min", "maj", "min"];
const min_penta_chords = ["min", "maj", "min", "min", "maj"];

const scale_list = ["7-note scale", "Pentatonic Scale"];

function scale_tone_to_note(key, scaleTone, isMajor) {
  let arr = isMajor ? maj_scale_steps : min_scale_steps;
  let sum = 0;

  for (let i = 0; i < scaleTone; i++) {
    sum += arr[i];
  }

  return (key + sum) % 12;
}

function scale_tone_to_note_pentatonic(key, scaleTone, isMajor) {
  let arr = isMajor ? maj_penta_steps : min_penta_steps;
  let sum = 0;

  for (let i = 0; i < scaleTone; i++) {
    sum += arr[i];
  }

  return (key + sum) % 12;
}

export function getChords(isMajor, size, key, seventh) {
  let chords = [];
  if (isMajor) {
    for (let i = 0; i < size; i++) {
      let scaleTone = Math.floor(Math.random() * 7);
      let chordRoot = scale_tone_to_note(key, scaleTone, isMajor);
      let chord = notes[chordRoot] + " " + maj_chords[scaleTone];
      chord = seventh ? chord + "7" : chord;
      let tone = 0;

      if (maj_chords[scaleTone] === "maj") {
        tone = 0;
      } else if (maj_chords[scaleTone] === "min") {
        tone = 1;
      } else {
        tone = 2;
      }

      chords.push({
        root: chordRoot,
        tonality: tone,
        name: chord,
      });
    }
  } else {
    for (let i = 0; i < size; i++) {
      let scaleTone = Math.floor(Math.random() * 7);
      let chordRoot = scale_tone_to_note(key, scaleTone, isMajor);
      let chord = notes[chordRoot] + " " + min_chords[scaleTone];
      chord = seventh ? chord + "7" : chord;
      let tone = 0;

      if (min_chords[scaleTone] === "maj") {
        tone = 0;
      } else if (min_chords[scaleTone] === "min") {
        tone = 1;
      } else {
        tone = 2;
      }

      chords.push({
        root: chordRoot,
        tonality: tone,
        name: chord,
      });
    }
  }

  return chords;
}

export function getChordsPentatonic(isMajor, size, key, seventh) {
  let chords = [];
  if (isMajor) {
    for (let i = 0; i < size; i++) {
      let scaleTone = Math.floor(Math.random() * 5);
      let chordRoot = this.scale_tone_to_note_pentatonic(
        key,
        scaleTone,
        isMajor
      );
      let chord = notes[chordRoot] + " " + maj_penta_chords[scaleTone];
      chord = seventh ? chord + "7" : chord;
      let tone = 0;

      if (maj_chords[scaleTone] === "maj") {
        tone = 0;
      } else if (maj_chords[scaleTone] === "min") {
        tone = 1;
      } else {
        tone = 2;
      }

      chords.push({
        root: chordRoot,
        tonality: tone,
        name: chord,
      });
    }
  } else {
    for (let i = 0; i < size; i++) {
      let scaleTone = Math.floor(Math.random() * 5);
      let chordRoot = this.scale_tone_to_note_pentatonic(
        key,
        scaleTone,
        isMajor
      );
      let chord = notes[chordRoot] + " " + min_penta_chords[scaleTone];
      chord = seventh ? chord + "7" : chord;
      let tone = 0;

      if (min_chords[scaleTone] === "maj") {
        tone = 0;
      } else if (min_chords[scaleTone] === "min") {
        tone = 1;
      } else {
        tone = 2;
      }

      chords.push({
        root: chordRoot,
        tonality: tone,
        name: chord,
      });
    }
  }

  return chords;
}

function convertNoteToString(noteArr) {
  let a = [];
  let i = 0;
  noteArr.forEach((n) => (a[i++] = notes[n]));

  return a;
}

export function getMajorNotes(root, is7th) {
  let arr = [];

  arr[0] = root;
  arr[1] = (root + 4) % 12;
  arr[2] = (root + 7) % 12;

  if (is7th) {
    arr[3] = (root + 11) % 12;
  }

  return convertNoteToString(arr);
}

export function getMinorNotes(root, is7th) {
  let arr = [];

  arr[0] = root;
  arr[1] = (root + 3) % 12;
  arr[2] = (root + 7) % 12;

  if (is7th) {
    arr[3] = (root + 10) % 12;
  }

  return convertNoteToString(arr);
}

export function getDiminishedNotes(root, is7th) {
  let arr = [];

  arr[0] = root;
  arr[1] = (root + 3) % 12;
  arr[2] = (root + 6) % 12;

  if (is7th) {
    arr[3] = (root + 9) % 12;
  }

  return convertNoteToString(arr);
}
