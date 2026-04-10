import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card className="pt-0">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video h-full" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-2 w-3/4 mt-2" />
        <Skeleton className="h-2 w-3/4 mt-1" />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
