import { createFileRoute } from "@tanstack/react-router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import BackLink from "#/components/BackLink";
import PostForm from "#/components/PostForm";

export const Route = createFileRoute("/posts/new")({
  ssr: false,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <div className="max-container py-12">
        <BackLink />
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-foreground">
          Create Post
        </h2>
        <PostForm type="Post" />
      </div>
    </section>
  );
}
