import BackLink from "#/components/BackLink";
import PostForm from "#/components/PostForm";
import { postQueryOptions } from "#/hooks/useGetPost";
import type { PostType } from "#/types/post.type";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$slug_/edit")({
  ssr: false,
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { slug } = params;
    const { queryClient } = context;

    await queryClient.ensureQueryData(postQueryOptions(slug));
  },
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const { queryClient } = Route.useRouteContext();
  const post = queryClient.getQueryData<PostType>(["post", slug]);

  return (
    <section className="max-container">
      <div className="py-12 md:py-20">
        <BackLink>Back to Posts</BackLink>
        <div>
          <h2 className="text-4xl font-bold text-foreground leading-tight mb-6">
            Edit Post
          </h2>
          <PostForm type="Edit" post={post} />
        </div>
      </div>
    </section>
  );
}
