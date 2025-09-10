"use client";
import { generativeLoop } from "./components/GenenrativeSound";

export default function Home() {
  const { start, stop } = generativeLoop();
  const { start: start2, stop: stop2 } = generativeLoop();

  return (
    <div>
      <button onClick={start}>MusiD</button>
      <button onClick={stop}>Stop</button>
      <button onClick={start2}>MusiD</button>
      <button onClick={stop2}>Stop</button>
    </div>
  );
}
