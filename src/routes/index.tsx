import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="bg-background">
      <div className="space-y-10">
        <h1 className="text-4xl font-semibold">Welcome to My Blog</h1>
      </div>
    </main>
  );
}
