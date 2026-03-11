import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

export const Route = createFileRoute("/posts/$slug")({
  component: RouteComponent,
});

const content = `# Building a Full-Stack Blog with TanStack Start

TanStack Start is a new full-stack React framework built on top of **Vinxi** and **Vite**. In this post we'll explore how to set it up with MongoDB and TanStack Query to build a production-ready blog.

## Why TanStack Start?

Most React frameworks force you to choose between flexibility and features. TanStack Start gives you:

- **File-based routing** — just like Next.js but powered by TanStack Router
- **Server functions** — type-safe RPC calls with \`createServerFn\`
- **Isomorphic rendering** — SSR where you need it, CSR where you don't
- **Full TypeScript** — end to end, no compromises

> TanStack Start is what happens when you take the best ideas from Next.js, Remix, and tRPC and combine them into one framework.

## Setting Up the Project

\`\`\`bash
npm create tsrouter-app@latest myblog
cd myblog
npm install
\`\`\`

## Connecting to MongoDB

\`\`\`typescript
export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!)
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
\`\`\`

## Comparing Approaches

| Feature | Next.js | TanStack Start |
|---|---|---|
| Routing | File-based | File-based |
| Type safety | Partial | Full end-to-end |
| Bundle size | Large | Small |

## What's Next

1. Adding authentication with sessions
2. Building an admin dashboard
3. Deploying to a VPS with PM2

---

That's it for this post! ~~No spam, ever.~~`;

function RouteComponent() {
  return (
    <section>
      <article className="py-12 prose dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
        >
          {content}
        </ReactMarkdown>
      </article>
    </section>
  );
}
