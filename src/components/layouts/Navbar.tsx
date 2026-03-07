import { Link } from "@tanstack/react-router";

const links = [
  {
    label: "Articles",
    to: "/",
  },
  {
    label: "About",
    to: "/",
  },
];

const Navbar = () => {
  return (
    <header className="border-b ">
      <nav className="max-container flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl">
          Dev<span className="text-primary">Blog</span>
        </Link>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li
              key={link.to}
              className="text-accent-foreground hover:text-primary"
            >
              <Link
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
      </nav>
    </header>
  );
};

export default Navbar;
