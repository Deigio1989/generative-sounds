import React from "react";

const c2major = [65.41, 73.42, 82.41, 92.5];
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
const interval = 0.2;

const playRandomNote = (
  attack = 0.2,
  decay = 0.2,
  sustain = 0.15,
  sustainLevel = 0.2,
  release = 0.5
) => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

  const note = c2major[random(0, c2major.length)];

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

  const harmonics = 4;

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

export function generativeLoop() {
  let intervalId: NodeJS.Timeout | null = null;

  function start() {
    if (intervalId) return; // já está rodando
    intervalId = setInterval(playRandomNote, 1000 * interval);
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  return { start, stop };
}
