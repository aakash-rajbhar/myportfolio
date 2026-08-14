"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

export default function ScrollIndicator() {
  const lenis = useLenis();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollPosition(scrollY);
      setIsAtBottom(scrollY >= maxScroll - 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isAtTop = scrollPosition <= 10;

  if (!isAtTop && !isAtBottom) {
    return null;
  }

  const handleClick = () => {
    if (isAtTop) {
      lenis?.scrollTo(window.innerHeight * 0.7);
    } else {
      lenis?.scrollTo(0);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-bounce">
      <button
        onClick={handleClick}
        className="rounded h-10 w-10 bg-surface text-fg p-2"
        aria-label={isAtTop ? "Scroll down" : "Scroll to top"}
      >
        {isAtTop ? "↓" : "↑"}
      </button>
    </div>
  );
}