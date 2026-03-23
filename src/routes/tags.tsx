import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tags")({
  component: RouteComponent,
});

function RouteComponent() {
  return <section className="max-container h-screen pt-12">Tags</section>;
}
