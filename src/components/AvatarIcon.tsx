import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const AvatarIcon = () => {
  return (
    <div className="flex items-center gap-4 p-2 rounded-md bg-accent">
      <Link to="/posts">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <Link
        className="focus:outline-0 focus:underline text-accent-foreground hover:text-primary"
        activeProps={{
          className: "font-semibold  text-primary",
        }}
        to="/login"
      >
        Login
      </Link>
      <Button size="sm" variant="outline" className="cursor-pointer">
        <LogOut />
      </Button>
    </div>
  );
};

export default AvatarIcon;
