import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="bg-amber-600">
      <div>
        <h1>Welcome to My Blog</h1>
      </div>
    </main>
  );
}
