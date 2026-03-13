import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$slug_/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/posts/$slug/edit"!</div>;
}
