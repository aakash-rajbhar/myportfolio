import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { ReactNode } from "react";

type CalloutType = "info" | "warning" | "success" | "error";

interface CalloutProps {
  type: CalloutType;
  children: ReactNode;
}

export default function Callout({ type = "info", children }: CalloutProps) {
  const styles: Record<
    CalloutType,
    { bg: string; border: string; icon: ReactNode }
  > = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      icon: (
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      ),
    },
    success: {
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      icon: (
        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      ),
    },
    error: {
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-800",
      icon: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
    },
  };

  const config = styles[type];

  return (
    <div
      className={`flex gap-3 px-4 py-3 rounded-lg border ${config.bg} ${config.border} my-4`}
    >
      <div className="shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1 text-ink/90 dark:text-ink/80">{children}</div>
    </div>
  );
}
