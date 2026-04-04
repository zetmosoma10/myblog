import { createFileRoute } from "@tanstack/react-router";
import Hero from "#/components/Hero";
import PostCard from "#/components/PostCard";
import Newsletter from "#/components/Newsletter";
import useGetLatestPosts, {
  latestPostsQueryOptions,
} from "#/hooks/useGetLatestPosts";

export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(latestPostsQueryOptions());
  },
  staleTime: 1000 * 60 * 10,

  head: () => ({
    meta: [
      { title: "DeveloperBlog — Web Dev Articles" },
      {
        name: "description",
        content:
          "Weekly articles on React, TypeScript, TanStack and the modern web.",
      },
      { property: "og:title", content: "DeveloperBlog — Web Dev Articles" },
      {
        property: "og:description",
        content:
          "Weekly articles on React, TypeScript, TanStack and the modern web.",
      },
      {
        property: "og:url",
        content: "https://zet-blog.netlify.app/",
      },
    ],
  }),
});

function App() {
  const { data: posts } = useGetLatestPosts();

  return (
    <main className="bg-background">
      <Hero />

      <div className="max-container  my-20">
        <div className="space-y-12">
          <h2 className="text-foreground text-3xl md:text-4xl mb-7">Latest</h2>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7">
            {posts?.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </section>
          <Newsletter />
        </div>
      </div>
    </main>
  );
}
