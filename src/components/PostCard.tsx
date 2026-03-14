import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock4 } from "lucide-react";
import dayjs from "dayjs";

type Props = {
  title: string;
  slug?: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  createdAt: Date;
  readingTime: number;
};

const PostCard = ({
  title,
  slug,
  coverImage,
  excerpt,
  tags,
  createdAt,
  readingTime,
}: Props) => {
  //
  return (
    <Link to="/posts/$slug" params={{ slug: slug as string }} className="block">
      <Card className="group overflow-hidden border-border bg-card transition-all duration-200  hover:shadow-lg pt-0">
        {/* Cover image */}
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="h-45 w-full border-b border-border object-cover group-hover:scale-105 transition-all duration-300"
          />
        ) : (
          <div className="flex h-45 items-center justify-center border-b border-border bg-linear-to-br from-muted to-primary/5 font-mono text-[11px] tracking-widest text-muted-foreground">
            cover_image.jpg
          </div>
        )}

        <CardContent>
          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
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
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between border-t border-border px-5 py-3">
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <Calendar size={13} />
              <span>{dayjs(createdAt).format("MMM D, YYYY")}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <Clock4 size={13} />
              <span>{readingTime} min read</span>
            </div>
          </div>
          <Link
            to="/posts/$slug"
            params={{ slug: slug as string }}
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

export default PostCard;
