import PostCard from "#/components/PostCard";
import useGetPosts, { postsQueryOptions } from "#/hooks/useGetPosts";
import { createFileRoute } from "@tanstack/react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { SearchIcon } from "lucide-react";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(postsQueryOptions);
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
        <p className="text-muted-foreground">
          Explore the latest thoughts on technology, design and programming.
        </p>
        <InputGroup className="mt-6 py-5 mb-8 w-full md:w-[35%]">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7">
          {posts?.map((post) => (
            <PostCard
              key={post._id}
              slug={post.slug}
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
