import { createFileRoute } from "@tanstack/react-router";
import Hero from "#/components/Hero";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="bg-background">
      <Hero />
    </main>
  );
}
