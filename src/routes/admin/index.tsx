import { Button } from "#/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="max-container">
      <Link to="/posts/new">
        <Button
          variant="default"
          size="lg"
          className="py-6 px-5 cursor-pointer hover:bg-primary/90 transition-colors"
        >
          New Post
        </Button>
      </Link>
    </section>
  );
}
