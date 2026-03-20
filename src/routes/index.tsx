import { createFileRoute } from "@tanstack/react-router";
import Hero from "#/components/Hero";
import { getPosts } from "#/server/postsSeverFunctions";
import PostCard from "#/components/PostCard";
import Newsletter from "#/components/Newsletter";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => {
    return await getPosts({ data: { page: 1 } });
  },
  staleTime: 1000 * 60 * 10,
});

function App() {
  const { data: posts } = Route.useLoaderData();
  const features = posts.slice(0, 4);

  return (
    <main className="bg-background">
      <Hero />

      <div className="max-container  my-20">
        <div className="space-y-12">
          <h2 className="text-foreground text-3xl md:text-4xl mb-7">Latest</h2>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7">
            {features.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </section>
          <Newsletter />
        </div>
      </div>
    </main>
  );
}
