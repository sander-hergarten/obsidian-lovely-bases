import { useLayoutEffect, useRef, useState } from "react";

export const useElementWidth = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Medición inmediata (evita el primer render a 0)
    const initial = el.getBoundingClientRect().width;
    if (initial) setWidth(initial);

    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0]?.contentRect.width ?? 0);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width] as const;
}
