import { useEffect, useRef, useState } from "react";

export function formatCountdown(seconds: number) {
 const minutes = Math.floor(seconds / 60);
 const secs = seconds % 60;
 return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

/**
 * Counts down to a wall-clock deadline, so a throttled background tab
 * can't make the timer drift from the server's expiry.
 */
export default function useResetCountdown() {
 const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
 const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

 const stop = () => {
  if (timerRef.current) {
   clearInterval(timerRef.current);
   timerRef.current = null;
  }
 };

 const start = (seconds: number) => {
  stop();
  const deadline = Date.now() + seconds * 1000;
  setSecondsLeft(seconds);

  timerRef.current = setInterval(() => {
   const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
   setSecondsLeft(left);
   if (left <= 0) stop();
  }, 250);
 };

 useEffect(() => stop, []);

 return { secondsLeft, start, stop };
}
