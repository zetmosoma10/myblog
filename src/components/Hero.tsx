import { Link } from "@tanstack/react-router";
import heroImg from "#/assets/code-1.png";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section
      className="w-full min-h-120 relative flex  items-center justify-center "
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* This Overlay add grafient from bottom to up */}
      <div className="absolute inset-0 bg-black/70 bg-linear-to-t from-black/70 to-primary/5"></div>

      <div className="max-container z-10  text-center md:text-left ">
        <h1 className="font-extrabold text-5xl md:text-6xl tracking-tight text-white">
          Hi, I'm Zet Mosoma
        </h1>
        <p className="text-muted-foreground mt-4 mb-8 text-lg max-w-180">
          Fullstack developer writing about React, TypeScript, and building
          better software. I share practical insights from real-world projects.
        </p>
        <Button asChild size="lg">
          <Link to="/posts">Read the Posts</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
