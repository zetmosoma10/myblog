import { Button } from "#/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="font-bold text-foreground text-3xl">Posts</h1>
      <Link to="/posts/new">
        <Button variant="default" size="lg">
          New Post
        </Button>
      </Link>
    </div>
  );
}
