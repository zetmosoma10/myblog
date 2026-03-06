import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          Dev<span className="text-primary">Blog</span>
        </Link>
        <ul>
          <li>
            <Link to="/">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
