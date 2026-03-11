import { CheckCircle2 } from "lucide-react";

interface ProgressBadgeProps {
  completed: boolean;
  accentVar?: string;
}

export function ProgressBadge({ completed, accentVar }: ProgressBadgeProps) {
  if (!completed) return null;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: accentVar
          ? `oklch(${accentVar.replace("var(", "").replace(")", "")} / 0.15)`
          : "oklch(0.22 0.01 275)",
        color: accentVar
          ? `oklch(${accentVar.replace("var(", "").replace(")", "")})`
          : "oklch(0.8 0.01 275)",
      }}
    >
      <CheckCircle2 className="h-3 w-3" />
      Completed
    </span>
  );
}
