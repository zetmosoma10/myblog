import { createFileRoute } from "@tanstack/react-router";
import ArticleCard from "@/components/ArticleCard";
import img from "@/assets/cloud-2.png";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="bg-background">
      <div className="space-y-10">
        <h1 className="text-4xl font-semibold">Welcome to My Blog</h1>
        <ArticleCard
          post={{
            title: "My First Post",
            slug: "my-first-post",
            excerpt: "This is the excerpt for my first post.",
            tags: ["JavaScript", "React"],
            publishedAt: new Date().toISOString(),
            readingTime: 5,
            coverImage: img,
          }}
        />
      </div>
    </main>
  );
}
