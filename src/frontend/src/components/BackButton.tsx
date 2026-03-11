import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to: string;
  label?: string;
}

export function BackButton({ to, label = "Back" }: BackButtonProps) {
  return (
    <Link
      to={to}
      data-ocid="back.button"
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      {label}
    </Link>
  );
}
