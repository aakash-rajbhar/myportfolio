import Image from "next/image";
import { ReactNode } from "react";

interface ImageFrameProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
}

export default function ImageFrame({
  src,
  alt,
  caption,
  width = 800,
  height = 600,
  children,
}: ImageFrameProps) {
  return (
    <figure className="my-6">
      <div className="relative rounded-lg overflow-hidden bg-ink/5 dark:bg-white/5 border border-ink/10 dark:border-white/10">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          priority
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-ink/60 dark:text-ink/50">
          {caption}
        </figcaption>
      )}
      {children && (
        <div className="mt-3 text-sm text-ink/70 dark:text-ink/60">
          {children}
        </div>
      )}
    </figure>
  );
}
