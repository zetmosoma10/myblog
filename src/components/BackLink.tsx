import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

const BackLink = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        size="lg"
        onClick={() => router.history.back()}
        className="cursor-pointer"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {children}
      </Button>
    </div>
  );
};

export default BackLink;
