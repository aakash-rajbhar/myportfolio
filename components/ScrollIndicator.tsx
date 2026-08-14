'use client';

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
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
      // Scroll down by roughly one viewport
      window.scrollBy({
        top: window.innerHeight * 0.7,
        behavior: "smooth",
      });
    } else {
      // At bottom → go to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 animate-bounce">
      <button
        onClick={handleClick}
        className="rounded-full bg-ink/50 text-fg p-2"
        aria-label={isAtTop ? "Scroll down" : "Scroll to top"}
      >
        {isAtTop ? "↓" : "↑"}
      </button>
    </div>
  );
}