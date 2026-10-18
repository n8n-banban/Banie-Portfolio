import React, { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const ClickEffects: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let nextId = 0;
    const handleClick = (e: MouseEvent) => {
      // Don't spawn on form inputs to avoid visual interference
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      const newRipple: Ripple = {
        id: nextId++,
        x: e.clientX,
        y: e.clientY,
        size: 48,
      };

      setRipples((prev) => [...prev.slice(-12), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 650);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full border border-blue-400/60 dark:border-blue-400/70 bg-blue-500/15 dark:bg-blue-400/20 animate-ping-once pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            animation: 'clickRipple 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        />
      ))}
    </div>
  );
};
