import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main>
      <div>
        <h1>Welcome to My Blog</h1>
      </div>
    </main>
  );
}
