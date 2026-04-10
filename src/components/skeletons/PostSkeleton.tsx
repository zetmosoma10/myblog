import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <section className="max-container min-h-screen">
      <article className="py-12 md:py-20">
        <div className="grow prose dark:prose-invert max-w-none">
          <header className="flex flex-col gap-5 md:flex-row md:justify-between md:gap-15">
            <div>
              {/* Title */}
              <Skeleton className="h-4 w-1/2" />

              {/* Meta */}
              <div className="flex items-center gap-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-x-1">
                  <Skeleton className="w-7.5 h-2" />
                </div>
                <div className="flex items-center gap-x-1">
                  <Skeleton className="w-7.5 h-2" />
                </div>
              </div>
            </div>
          </header>

          {/* Cover image */}
          <Skeleton className="aspect-video h-100" />

          <div className="space-y-2">
            <Skeleton className="h-2 w-3/5" />
            <Skeleton className="h-2 w-3/4" />
            <Skeleton className="h-2 w-3/4" />
          </div>
        </div>
      </article>
    </section>
  );
};

export default PostSkeleton;
