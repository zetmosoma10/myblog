import PostCard from "#/components/PostCard";
import useGetPosts, { postQueryOptions } from "#/hooks/useGetPosts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(postQueryOptions);
  },
});

function RouteComponent() {
  const { data: posts } = useGetPosts();

  return (
    <div>
      <section className="py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground">
          Posts
        </h2>
        <p className="text-muted-foreground mb-8">
          Explore the latest thoughts on technology, design and programming.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7">
          {posts?.map((post) => (
            <PostCard
              key={post._id}
              title={post.title}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
              tags={post.tags}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
