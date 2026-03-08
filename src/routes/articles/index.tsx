import { Button } from "#/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="font-bold text-foreground text-3xl">Articles</h1>
      <Link to="/articles/new">
        <Button variant="default" size="lg">
          New Article
        </Button>
      </Link>
    </div>
  );
}
