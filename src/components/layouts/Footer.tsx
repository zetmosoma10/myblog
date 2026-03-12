import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-8 mt-10">
      <div className="max-container flex flex-col md:flex-row items-center gap-5">
        <Link to="/" className="font-bold text-2xl">
          Dev<span className="text-primary">blog</span>
        </Link>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DevBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
