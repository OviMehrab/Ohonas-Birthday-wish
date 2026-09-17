// Web Audio API generator for reliable, zero-dependency background music and sound effects

let audioCtx: AudioContext | null = null;
let isMusicPlaying = false;
let currentLoopTimeout: number | null = null;
let musicStopCallback: (() => void) | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle music box note player
function playMusicBoxNote(freq: number, startTime: number, duration = 0.8) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Sine with subtle high overtone for music box twinkle
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  // Soft envelope attack and gentle ring release
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

// Happy Birthday melody notes (frequencies in Hz)
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.00;
const A4 = 440.00;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;

interface NoteEvent {
  note: number;
  duration: number; // in beats
}

const melody: NoteEvent[] = [
  { note: G4, duration: 0.75 },
  { note: G4, duration: 0.25 },
  { note: A4, duration: 1.0 },
  { note: G4, duration: 1.0 },
  { note: C5, duration: 1.0 },
  { note: B4, duration: 2.0 },

  { note: G4, duration: 0.75 },
  { note: G4, duration: 0.25 },
  { note: A4, duration: 1.0 },
  { note: G4, duration: 1.0 },
  { note: D5, duration: 1.0 },
  { note: C5, duration: 2.0 },

  { note: G4, duration: 0.75 },
  { note: G4, duration: 0.25 },
  { note: G4 * 2, duration: 1.0 },
  { note: E4 * 2, duration: 1.0 },
  { note: C5, duration: 1.0 },
  { note: B4, duration: 1.0 },
  { note: A4, duration: 1.5 },

  { note: F4 * 2, duration: 0.75 },
  { note: F4 * 2, duration: 0.25 },
  { note: E4 * 2, duration: 1.0 },
  { note: C5, duration: 1.0 },
  { note: D5, duration: 1.0 },
  { note: C5, duration: 2.5 },
];

export function startBackgroundMusic(onStateChange?: (playing: boolean) => void) {
  if (isMusicPlaying) return;
  isMusicPlaying = true;
  if (onStateChange) onStateChange(true);

  const ctx = getAudioContext();
  const beatTime = 0.55; // tempo

  function scheduleMelody() {
    if (!isMusicPlaying) return;
    const now = ctx.currentTime + 0.1;
    let accumulatedTime = 0;

    melody.forEach((item) => {
      playMusicBoxNote(item.note, now + accumulatedTime, item.duration * beatTime * 1.5);
      accumulatedTime += item.duration * beatTime;
    });

    const totalSeconds = accumulatedTime + 1.5;
    currentLoopTimeout = window.setTimeout(() => {
      if (isMusicPlaying) {
        scheduleMelody();
      }
    }, totalSeconds * 1000);
  }

  scheduleMelody();
}

export function stopBackgroundMusic(onStateChange?: (playing: boolean) => void) {
  isMusicPlaying = false;
  if (currentLoopTimeout) {
    clearTimeout(currentLoopTimeout);
    currentLoopTimeout = null;
  }
  if (onStateChange) onStateChange(false);
}

export function toggleBackgroundMusic(onStateChange?: (playing: boolean) => void): boolean {
  if (isMusicPlaying) {
    stopBackgroundMusic(onStateChange);
    return false;
  } else {
    startBackgroundMusic(onStateChange);
    return true;
  }
}

export function getIsMusicPlaying(): boolean {
  return isMusicPlaying;
}

// Sound effects
export function playSparkleSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.45);
    });
  } catch (err) {
    // Ignore audio autoplay restrictions
  }
}

export function playPopSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  } catch (err) {}
}

export function playBlowSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch (err) {}
}
