import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

const BackLink = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-6">
      <Link
        to=".."
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {children}
      </Link>
    </div>
  );
};

export default BackLink;
