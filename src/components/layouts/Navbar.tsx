import { Link } from "@tanstack/react-router";
import AvatarIcon from "../AvatarIcon";
import { ThemeToggler } from "../ThemeToggler";
import { LogOut, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { authClient } from "#/lib/authClient";
import useLogout from "#/hooks/useLogout";
import getInitials from "#/utils/getInitials";
import { Button } from "../ui/button";
import { useState } from "react";
import clsx from "clsx";

const links = [
  {
    label: "Posts",
    to: "/posts",
  },
  {
    label: "About",
    to: "/about",
  },
];

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const { mutateAsync } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 z-50 bg-card/96 ">
      <nav className="max-container flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl">
          Dev<span className="text-primary">blog</span>
        </Link>
        <div className="hidden sm:flex sm:items-center sm:gap-6">
          <ul className="flex gap-6 ">
            {links.map((link) => (
              <li
                key={link.to}
                className="text-accent-foreground hover:text-primary  group"
              >
                <Link
                  className="focus:outline-0 focus:underline"
                  activeProps={{
                    className: "font-semibold  text-primary",
                  }}
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden sm:flex sm:items-center sm:gap-2">
          <ThemeToggler />
          <AvatarIcon />
        </div>

        <Button
          variant="ghost"
          size="lg"
          className="sm:hidden cursor-pointer "
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </nav>

      {/* Mobile Nav */}
      <div
        className={clsx(
          "absolute top-0 left-0 bg-card py-6 w-full transition-transform duration-300 ease-in-out shadow-xl border-b",
          "z-40",
          isOpen ? "translate-y-16" : "-translate-y-full",
        )}
      >
        <div className="max-container">
          {/* Close button */}
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              size="lg"
              className="sm:hidden cursor-pointer "
              onClick={() => setIsOpen(false)}
            >
              <X />
            </Button>
          </div>
          <ul className="mt-7">
            <li className="text-accent-foreground  ">
              <Link
                className="w-full block hover:bg-secondary hover:rounded-md p-2"
                activeProps={{
                  className: "bg-secondary rounded-md p-2",
                }}
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            {links.map((link) => (
              <li key={link.to} className="text-accent-foreground">
                <Link
                  className="w-full block hover:bg-secondary hover:rounded-md p-2"
                  activeProps={{
                    className: "bg-secondary rounded-md p-2",
                  }}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Footer */}
          <div className="flex items-center gap-3 mt-5 mb-3">
            {session?.session.id && (
              <Link to="/about" onClick={() => setIsOpen(false)}>
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
            <ThemeToggler />

            <div className="flex-1">
              {!session?.session.id && (
                <Button
                  asChild
                  size="lg"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/login">Login</Link>
                </Button>
              )}
              {session?.session.id && (
                <Button
                  size="lg"
                  variant="destructive"
                  className="cursor-pointer w-full flex-1"
                  onClick={async () => {
                    await mutateAsync();
                    setIsOpen(false);
                  }}
                >
                  <span>Logout</span>
                  <LogOut />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
