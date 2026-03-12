import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="font-mono text-primary text-sm tracking-widest">// 404</p>
      <h1 className="font-mono text-3xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="text-muted-foreground text-sm font-mono">
        This page doesn't exist or has been unpublished.
      </p>
      <Link
        to="/"
        className="font-mono text-sm text-primary hover:underline underline-offset-4"
      >
        ← back to home
      </Link>
    </section>
  );
};

export default NotFound;
