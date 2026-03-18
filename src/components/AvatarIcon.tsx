import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { authClient } from "#/lib/authClient";
import getInitials from "#/utils/getInitials";
import useLogout from "#/hooks/useLogout";

const AvatarIcon = () => {
  const { data: session } = authClient.useSession();
  const { mutateAsync } = useLogout();

  return (
    <div className="flex items-center gap-4 border-border bg-accent p-0.5 rounded-md">
      {session?.session.id && (
        <Link to="/posts">
          <Avatar>
            {session?.user.image ? (
              <AvatarImage
                src={session.user.image}
                alt="@shadcn"
                className="grayscale"
              />
            ) : (
              <AvatarFallback className="text-sm">
                {getInitials(session.user.name)}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>
      )}
      {!session?.session.id && (
        <Button asChild variant="ghost" size="sm">
          <Link to="/login">Login</Link>
        </Button>
      )}
      {session?.session.id && (
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer"
          onClick={async () => await mutateAsync()}
        >
          <LogOut />
        </Button>
      )}
    </div>
  );
};

export default AvatarIcon;
