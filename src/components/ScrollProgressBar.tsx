import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400 dark:from-blue-600 dark:via-blue-400 dark:to-cyan-400 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(59,130,246,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
