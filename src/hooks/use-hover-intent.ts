import { useCallback, useEffect, useRef } from 'react';

export const useHoverIntent = <T>(onIntent: (value: T) => void, delay = 80) => {
  const timerRef = useRef<number | null>(null);
  const onIntentRef = useRef(onIntent);

  useEffect(() => {
    onIntentRef.current = onIntent;
  }, [onIntent]);

  const cancel = useCallback(() => {
    if (timerRef.current === null) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const schedule = useCallback(
    (value: T) => {
      cancel();
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        onIntentRef.current(value);
      }, delay);
    },
    [cancel, delay]
  );

  useEffect(() => cancel, [cancel]);

  return { schedule, cancel };
};
