import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock4 } from "lucide-react";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
};

type Props = {
  post: Post;
};

const ArticleCard = ({ post }: Props) => {
  return (
    <Link to="/" className="block">
      <Card className="group overflow-hidden border-border bg-card transition-all duration-200  hover:shadow-lg">
        {/* Cover image */}
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-45 w-full border-b border-border object-cover"
          />
        ) : (
          <div className="flex h-45 items-center justify-center border-b border-border bg-linear-to-br from-muted to-primary/5 font-mono text-[11px] tracking-widest text-muted-foreground">
            cover_image.jpg
          </div>
        )}

        <CardContent>
          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-primary/20 bg-primary/10 text-[10px] tracking-wide text-primary"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-card-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between border-t border-border px-5 py-3">
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <Calendar size={13} />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            {/* <span className="h-1 w-1 rounded-full bg-muted-foreground/40" /> */}
            <div className="flex items-center gap-x-1">
              <Clock4 size={13} />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          <Link
            to="/"
            // params={{ slug: post.slug }}
            className="flex items-center  gap-1  text-xs lg:hidden tracking-wide text-primary transition-all group-hover:gap-2"
          >
            read post{" "}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;
