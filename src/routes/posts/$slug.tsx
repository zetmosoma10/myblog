import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "#/components/ui/badge";
import { Calendar, Clock4 } from "lucide-react";
import useGetPost, { postQueryOptions } from "#/hooks/useGetPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import dayjs from "dayjs";
import BackLink from "#/components/BackLink";
import PostModal from "#/components/PostModal";
import { getSession } from "#/server/authServerFunctions";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/posts/$slug")({
  component: RouteComponent,
  loader: async ({ context, params: { slug } }) => {
    const { user } = await getSession();
    const post = await context.queryClient.ensureQueryData(
      postQueryOptions(slug),
    );

    return { user, post };
  },

  head: ({ loaderData }) => ({
    title: `DeveloperBlog - ${loaderData?.post?.title}`,

    meta: [
      { name: "description", content: loaderData?.post?.excerpt },

      // * Open Graph
      { property: "og:title", content: loaderData?.post?.title },
      { property: "og:description", content: loaderData?.post?.excerpt },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: `https://zet-blog.netlify.app/${loaderData?.post?.slug}`,
      },
      {
        property: "og:image",
        content: loaderData?.post?.coverImage ?? "",
      },

      // * Twitter
      { name: "twitter:title", content: loaderData?.post?.title },
      { name: "twitter:description", content: loaderData?.post?.excerpt },
      {
        name: "twitter:image",
        content: loaderData?.post?.coverImage ?? "",
      },

      // * Article specific
      {
        property: "article:published_time",
        content: loaderData?.post?.createdAt.toString(),
      },
      { property: "article:tag", content: loaderData?.post?.tags?.join(", ") },
    ],
  }),
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const { user } = Route.useLoaderData();
  const { data: post } = useGetPost(slug);

  return (
    <section className="max-container min-h-screen">
      <article className="py-12 md:py-20">
        <BackLink>Back</BackLink>

        <div className="grow prose dark:prose-invert max-w-none">
          <header className="flex flex-col gap-5 md:flex-row md:justify-between md:gap-15">
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post?.tags.map((tag) => (
                  <Badge
                    variant="outline"
                    key={tag._id}
                    className="text-xs tracking-wide bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-foreground leading-tight mb-4">
                {post?.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-x-1">
                  <Calendar size={13} />
                  <span>{dayjs(post?.createdAt).format("MMM D, YYYY")}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <Clock4 size={13} />
                  <span>{post?.readingTime} min read</span>
                </div>
                <Badge variant="secondary">{post?.status}</Badge>
              </div>
            </div>

            {/* Action Buttons */}
            {user && (
              <div className="flex md:flex-col gap-3">
                <PostModal post={post} />
                <Button asChild size="lg" className="cursor-pointer">
                  <Link
                    to="/posts/$slug/edit"
                    params={{ slug: post?.slug! }}
                    className="no-underline"
                  >
                    Edit
                  </Link>
                </Button>
              </div>
            )}
          </header>

          {/* Cover image */}
          {post?.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-md border border-border mb-8 object-cover max-h-100"
            />
          )}

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeSlug]}
          >
            {post?.content}
          </ReactMarkdown>
        </div>
      </article>
    </section>
  );
}
