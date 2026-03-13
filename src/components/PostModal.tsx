import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import useDeletePost from "#/hooks/useDeletePost";
import { Spinner } from "./ui/spinner";
import type { PostType } from "#/types/post.type";

const PostModal = ({ post }: { post?: PostType }) => {
  const { mutateAsync, isPending } = useDeletePost();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="destructive"
          size="lg"
          className="cursor-pointer md:w-30"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-xl">Delete post?</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            This will permanently delete this post article : "
            <span className="font-medium text-destructive">{post?.slug}</span>".
            This operation cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="cursor-pointer"
            disabled={isPending}
            onClick={async () => await mutateAsync(post?._id)}
          >
            {isPending ? <Spinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostModal;
