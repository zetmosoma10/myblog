import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <header className="border-b ">
      <nav className="max-container flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl">
          Dev<span className="text-primary">Blog</span>
        </Link>
        <ul>
          <li className="text-accent-foreground hover:text-primary">
            <Link to="/">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
