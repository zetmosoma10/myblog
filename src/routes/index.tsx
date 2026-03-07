import { createFileRoute } from "@tanstack/react-router";
import Article from "#/components/Article";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-semibold">Welcome to My Blog</h1>
        <Article />
      </div>
    </main>
  );
}
