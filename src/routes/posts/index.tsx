import PostCard from "#/components/PostCard";
import useGetPosts, { postsQueryOptions } from "#/hooks/useGetPosts";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { getSession } from "#/server/authServerFunctions";
import { postSearchQuerySchema } from "#/schemas/post.schema";
import PaginationComponent from "#/components/PaginationComponent";
import clsx from "clsx";
import _ from "lodash";
import useGetTags, { tagsQueryOptions } from "#/hooks/useGetTags";
import SearchInput from "#/components/SearchInput";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDebounce } from "use-debounce";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,

  validateSearch: postSearchQuerySchema,
  // * Re-run loader when search params change
  loaderDeps: ({ search: { page, tags, search } }) => ({ page, tags, search }),
  loader: async ({ context: { queryClient }, deps }) => {
    const { user } = await getSession();

    queryClient.prefetchQuery(tagsQueryOptions);

    queryClient.prefetchQuery(
      postsQueryOptions({
        page: deps.page,
        tags: deps.tags,
        search: deps.search,
      }),
    );

    return { user };
  },

  head: () => ({
    meta: [
      { title: "DeveloperBlog — articles" },
      { name: "description", content: "All articles about web development." },
      { property: "og:title", content: "DeveloperBlog — articles" },
      {
        property: "og:url",
        content: "https://zet-blog.netlify.app",
      },
    ],
  }),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { user } = Route.useLoaderData();
  const search = Route.useSearch();
  const [input, setInput] = useState(search.search ?? "");
  const [debouncedValue] = useDebounce(input ?? "", 350);
  const { data: results, isPending } = useGetPosts({
    ...search,
    search: debouncedValue,
  });
  const { data: tags } = useGetTags();

  useEffect(() => {
    navigate({
      to: "/posts",
      search: (prev) => ({
        ...prev,
        page: 1,
        search: debouncedValue,
      }),
    });
  }, [debouncedValue]);

  const numberOfPages = _.range(1, (results?.totalPages ?? 1) + 1); // * Use this variable to conditionally render pagination

  const onSearch = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <section className="max-container py-12 md:py-20 min-h-screen">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground">
              Posts
            </h2>
            <p className="text-muted-foreground">
              Explore the latest thoughts on technology, design and programming.
            </p>

            {/* Search Input */}
            <SearchInput input={input} onChange={onSearch} />
          </div>

          {user && (
            <div className="grid gap-2">
              <Button asChild size="lg">
                <Link to="/posts/new" preload={false}>
                  New Post
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/tags">Add Tag</Link>
              </Button>
            </div>
          )}
        </div>

        {/* FILTERS BTN */}
        <div className="flex items-center pt-4 mb-8 gap-4 flex-wrap">
          {tags?.map((tag) => (
            <Button
              key={tag.name}
              onClick={() =>
                navigate({
                  to: "/posts",
                  search: (prev) => ({ ...prev, page: 1, tags: tag.name }),
                })
              }
              className={clsx(
                "cursor-pointer bg-primary/10 border border-primary/50 text-primary hover:text-primary hover:bg-primary/20 capitalize",
                search.tags === tag.name &&
                  "ring-primary/50! border-primary! bg-primary/20",
              )}
            >
              {tag.name}
            </Button>
          ))}

          {/* Clear filter button */}
          {(search.search || search.tags) && (
            <Button
              onClick={() => {
                setInput("");
                navigate({
                  to: "/posts",
                  search: () => ({ page: 1 }),
                });
              }}
              className={clsx(
                "cursor-pointer bg-destructive/10 border border-destructive/50 text-destructive hover:text-destructive hover:bg-destructive/20 capitalize",
                search.tags === "" &&
                  "ring-primary/50! border-primary! bg-primary/20",
              )}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Cards */}

        {isPending ? (
          <p>Loading Posts...</p>
        ) : results?.totalDocuments! > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7">
            {results?.data?.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-foreground font-medium mt-4">
            No Posts for a given filter
          </p>
        )}

        {/* PAGINATION */}
        {numberOfPages.length > 1 && (
          <div className="mt-15">
            <PaginationComponent
              results={results}
              page={search.page}
              numberOfPages={numberOfPages}
            />
          </div>
        )}
      </section>
    </div>
  );
}
