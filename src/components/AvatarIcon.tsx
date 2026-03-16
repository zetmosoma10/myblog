import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { authClient } from "#/lib/authClient";
import getInitials from "#/utils/getInitials";

const AvatarIcon = () => {
  const { data: session } = authClient.useSession();

  return (
    <div className="flex items-center gap-4 p-2 rounded-md bg-accent">
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
        <Link
          className="focus:outline-0 focus:underline text-accent-foreground hover:text-primary"
          activeProps={{
            className: "font-semibold  text-primary",
          }}
          to="/login"
        >
          Login
        </Link>
      )}
      {session?.session.id && (
        <Button size="sm" variant="outline" className="cursor-pointer">
          <LogOut />
        </Button>
      )}
    </div>
  );
};

export default AvatarIcon;
