import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import useGetPost, { postQueryOptions } from "#/hooks/useGetPost";
import dayjs from "dayjs";

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
            <span
              key={tag}
              className="font-mono text-[10px] tracking-wide px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-mono text-4xl font-bold text-foreground leading-tight mb-4">
          {post?.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
          <span>{dayjs(post?.createdAt).format("MMM D, YYYY")}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span>{post?.readingTime} min read</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          {/* <span>{post.views} views</span> */}
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
