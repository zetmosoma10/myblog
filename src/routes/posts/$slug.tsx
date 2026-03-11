import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import useGetPost, { postQueryOptions } from "#/hooks/useGetPost";
import dayjs from "dayjs";
import { Badge } from "#/components/ui/badge";
import { Calendar, Clock4 } from "lucide-react";

export const Route = createFileRoute("/posts/$slug")({
  component: RouteComponent,
  loader: async ({ context, params: { slug } }) => {
    await context.queryClient.ensureQueryData(postQueryOptions(slug));
  },
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const { data: post } = useGetPost(slug);

  return (
    <section>
      <article className="py-12 prose dark:prose-invert max-w-none">
        {/* Cover image */}
        {/* {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-md border border-border mb-8 object-cover max-h-100"
          />
        )} */}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post?.tags.map((tag) => (
            <Badge
              variant="outline"
              key={tag}
              className="text-xs tracking-wide bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
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

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
        >
          {post?.content}
        </ReactMarkdown>
      </article>
    </section>
  );
}
