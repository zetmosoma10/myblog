import PostCard from "#/components/PostCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <PostCard
              key={item}
              title="React Perfomance"
              createdAt={new Date("23-03-2026")}
              excerpt="lo sdas dasd safg a jdkl na hbhbdas hsbda sdb  sbdha "
              tags={["react", "typescript"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
