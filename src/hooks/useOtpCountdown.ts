import { useEffect, useState } from 'react';

export function useOtpCountdown(seconds = 30) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  const restart = () => setRemaining(seconds);

  return {
    remaining,
    canResend: remaining <= 0,
    restart,
  };
}
