import { createFileRoute, redirect } from "@tanstack/react-router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import BackLink from "#/components/BackLink";
import PostForm from "#/components/PostForm";
import { getSession } from "#/server/authServerFunctions";

export const Route = createFileRoute("/posts/new")({
  ssr: false,
  beforeLoad: async () => {
    const { user } = await getSession();
    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          message: "Please login first",
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <div className="max-container py-12 md:py-20">
        <BackLink>Back to Posts</BackLink>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-foreground">
          Create Post
        </h2>
        <PostForm type="Post" />
      </div>
    </section>
  );
}
