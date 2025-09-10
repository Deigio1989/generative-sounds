"use client";
import { playNote } from "./components/ScaleGenerator";

export default function Home() {
  const frequency = 65.41; // Frequency of C2
  const majorScale = [0, 2, 4, 5, 7, 9, 11, 12];

  return (
    <div>
      {majorScale.map((step) => (
        <button key={step} onClick={() => playNote(frequency, step)}>
          Play {step}
        </button>
      ))}
    </div>
  );
}
