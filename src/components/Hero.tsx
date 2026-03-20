import { Link } from "@tanstack/react-router";
import heroImg from "#/assets/code-1.png";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

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
          Insights for modern <br></br>{" "}
          <span className="bg-primary bg-clip-text text-transparent bg-linear-to-r from-primary to-blue-500">
            Developers
          </span>
        </h1>
        <p className="text-muted-foreground mt-4 mb-8 text-lg max-w-180">
          Explore the latest in web development, software architecture, and
          coding best practices. Written by{" "}
          <span className="font-medium text-primary">Zet Mosoma</span>, for
          developers.
        </p>
        <Button asChild size="lg" className="py-6 px-4 text-base">
          <Link to="/posts">
            Read the Posts <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
