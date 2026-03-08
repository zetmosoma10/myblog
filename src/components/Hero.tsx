import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

const Hero = () => {
  return (
    <section className="hero-img py-20">
      <div className="text-center md:text-left ">
        <h1 className="font-extrabold text-5xl md:text-6xl tracking-tight text-foreground">
          Hi, I'm Zet Mosoma
        </h1>
        <p className="text-muted-foreground mt-4 mb-8 text-lg max-w-180">
          Fullstack developer writing about React, TypeScript, and building
          better software. I share practical insights from real-world projects.
        </p>
        <Link to="/articles">
          <Button
            variant="default"
            size="lg"
            className="py-6 px-5 cursor-pointer hover:bg-primary/90 transition-colors"
          >
            Read the Articles
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
