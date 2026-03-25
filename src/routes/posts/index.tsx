import PostCard from "#/components/PostCard";
import useGetPosts, { postsQueryOptions } from "#/hooks/useGetPosts";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { getSession } from "#/server/authServerFunctions";
import { postSearchQuerySchema } from "#/schemas/post.schema";
import PaginationComponent from "#/components/PaginationComponent";
import clsx from "clsx";
import _ from "lodash";
import useGetTags, { tagsQueryOptions } from "#/hooks/useGetTags";
import SearchInput from "#/components/SearchInput";
import type { ChangeEvent } from "react";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  validateSearch: postSearchQuerySchema,

  // * Re-run loader when search params change
  loaderDeps: ({ search: { page, tags, search } }) => ({ page, tags, search }),

  loader: async ({ context: { queryClient }, deps }) => {
    const { user } = await getSession();

    await queryClient.ensureQueryData(tagsQueryOptions);

    await queryClient.ensureQueryData(
      postsQueryOptions({
        page: deps.page,
        tags: deps.tags,
        search: deps.search,
      }),
    );

    return { user };
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { user } = Route.useLoaderData();
  const search = Route.useSearch();
  const { data: results } = useGetPosts(search);
  const { data: tags } = useGetTags();

  const numberOfPages = _.range(1, (results?.totalPages ?? 1) + 1); // * Use this variable to conditionally render pagination

  const onSearch = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    navigate({
      to: "/posts",
      search: (prev) => ({ ...prev, page: 1, search: event.target.value }),
    });
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
            <SearchInput onChange={onSearch} />
          </div>

          {user && (
            <div className="grid gap-2">
              <Button asChild size="lg">
                <Link to="/posts/new">New Post</Link>
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
              onClick={() =>
                navigate({
                  to: "/posts",
                  search: () => ({ page: 1 }),
                })
              }
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
        {results?.totalDocuments! > 0 ? (
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
