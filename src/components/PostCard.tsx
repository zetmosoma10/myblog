import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock4 } from "lucide-react";
import dayjs from "dayjs";
import type { ResponsePostType } from "#/types/post.type";

const PostCard = (props: ResponsePostType) => {
  //
  return (
    <Link
      to="/posts/$slug"
      params={{ slug: props.slug! }}
      preload={false}
      className="block focus:outline-0 focus:scale-105"
    >
      <Card className="group justify-between overflow-hidden border-border bg-card transition-all duration-200  hover:shadow-lg pt-0 h-full">
        {/* Cover image */}
        {props.coverImage ? (
          <img
            src={props.coverImage}
            alt={props.title}
            className="h-45 w-full border-b border-border object-cover group-hover:scale-105 transition-all duration-300"
          />
        ) : (
          <div className="flex h-45 items-center justify-center border-b border-border bg-linear-to-br from-muted to-primary/5 font-mono text-[11px] tracking-widest text-muted-foreground">
            cover_image.jpg
          </div>
        )}

        <CardContent>
          {/* Tags */}
          <div className="flex items-center justify-between">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {props.tags.map((tag) => (
                <Badge
                  key={tag._id}
                  variant="outline"
                  className="border-primary/20 bg-primary/10 text-[10px] tracking-wide text-primary"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-card-foreground transition-colors group-hover:text-primary">
            {props.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {props.excerpt}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between border-t border-border px-5 py-3 gap-5 text-xs text-muted-foreground">
          <div className="flex items-center gap-x-1">
            <Calendar size={13} />
            <span>{dayjs(props.createdAt).format("MMM D, YYYY")}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <Clock4 size={13} />
            <span>{props.readingTime} min read</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
