import React from "react";

const c2 = 65.41;

const interval = 0.2;
const generateSemiTone = (frequency: number, steps: number) => {
  return frequency * Math.pow(2, steps / 12);
};

export const playNote = (
  frequency: number,
  steps: number,
  harmonics: number = 4,
  attack = 0.2,
  decay = 0.2,
  sustain = 0.15,
  sustainLevel = 0.2,
  release = 0.5
) => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

  const note = generateSemiTone(frequency, steps);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);

  //attack
  gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + attack);
  //decay
  gain.gain.linearRampToValueAtTime(
    sustainLevel,
    ctx.currentTime + attack + decay
  );
  //sustain
  gain.gain.linearRampToValueAtTime(
    sustainLevel,
    ctx.currentTime + attack + decay + sustain
  );
  gain.gain.linearRampToValueAtTime(
    0,
    ctx.currentTime + attack + decay + sustain + release
  );

  gain.connect(ctx.destination);

  for (let i = 1; i < harmonics + 1; i++) {
    const oscillator = ctx.createOscillator();
    oscillator.frequency.value = note * i;
    oscillator.type = "sawtooth";
    gain.gain.value = 0.5 / (i * 2);
    oscillator.connect(gain);
    oscillator.start();
    oscillator.stop(ctx.currentTime + interval);
    oscillator.onended = () => ctx.close();
  }
};
