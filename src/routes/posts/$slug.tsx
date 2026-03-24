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

export const Route = createFileRoute("/posts/$slug")({
  component: RouteComponent,
  loader: async ({ context, params: { slug } }) => {
    const { user } = await getSession();
    await context.queryClient.ensureQueryData(postQueryOptions(slug));

    return { user };
  },
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const { user } = Route.useLoaderData();
  const { data: post } = useGetPost(slug);

  return (
    <section className="max-container">
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
              </div>
            </div>

            {/* Action Buttons */}
            {user && (
              <div className="flex md:flex-col gap-3">
                <PostModal post={post} />
                {/* <Button size="lg" className="cursor-pointer md:w-30"> */}
                <Link
                  to="/posts/$slug/edit"
                  params={{ slug: post?.slug! }}
                  className="w-full bg-primary text-primary-foreground py-1 rounded-md text-base text-center no-underline hover:bg-primary/90 focus:outline-0 focus:ring-2 focus:ring-primary/50"
                >
                  Edit
                </Link>
                {/* </Button> */}
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
