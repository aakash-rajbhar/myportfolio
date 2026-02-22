interface MacWindowProps {
  title?: string;
  children: string;
  language?: string;
}

export default function MacWindow({
  title = "Terminal",
  children,
  language = "bash",
}: MacWindowProps) {
  return (
    <div className="my-6 rounded-xl overflow-hidden bg-ink/10 dark:bg-white/10 border border-ink/20 dark:border-white/20 shadow-lg">
      {/* Mac Window Header */}
      <div className="bg-gradient-to-b from-ink/20 to-ink/15 dark:from-white/10 dark:to-white/5 px-4 py-3 flex items-center gap-2 border-b border-ink/20 dark:border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 text-sm font-medium text-ink/70 dark:text-ink/60">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-sm text-ink/80 dark:text-ink/70 whitespace-pre-wrap break-words bg-ink/5 dark:bg-white/5">
        {children}
      </div>
    </div>
  );
}
