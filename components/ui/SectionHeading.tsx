import React from "react";

export default function SectionHeading({
  children,
  number,
}: {
  children: React.ReactNode;
  number: string;
}) {
  return (
    <div className="flex items-baseline gap-4 mb-20 border-b border-ink/10 pb-8">
      <span className="font-mono text-sm opacity-40">{number}</span>

      <h2 className="text-5xl md:text-7xl font-display tracking-tighter uppercase">
        {children}
      </h2>
    </div>
  );
}
