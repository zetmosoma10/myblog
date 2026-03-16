import { Badge } from "#/components/ui/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  MapPin,
} from "lucide-react";
import img from "#/assets/IMG_2622.jpg";
import {
  skills,
  experience,
  projects,
  education,
  certifications,
  contacts,
} from "#/constance";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="max-container">
      <main className="container py-12 md:py-20 max-w-225">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>

        {/* Bio Section */}
        <section className="flex flex-col sm:flex-row gap-8 items-start mb-16">
          <img
            src={img}
            alt="Alex Chen"
            className="w-28 h-28 rounded-2xl object-cover border-2 border-border shrink-0"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">
              Zet Mosoma
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mb-3 text-sm">
              <MapPin className="h-3.5 w-3.5" />
              Johannesburg, South Africa
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-xl">
              Self taught Full-stack web developer, i build scalable, fast and
              responsive web applications that users love. I use cutting edge
              technologies like Tanstack Start, Next.js, Typescript, Express.js
              and many more. If you want collaboration on your project or
              website for your company, feel free to contact me.
            </p>
            <div className="flex items-center gap-3">
              {contacts.map((contact) => (
                <a
                  key={contact.href}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  <contact.icon className="h-5.5 w-5.5" />
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Resume
              </a>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Tech Stack
          </h2>
          <div className="space-y-4">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <span className="text-base font-medium text-muted-foreground w-24 shrink-0 pt-0.5">
                  {category}
                </span>
                <div className="flex  flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-accent text-accent-foreground border-0 font-normal text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-primary" />
            Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div
                key={project.title}
                className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow group"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-36 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="bg-accent text-accent-foreground border-0 text-[10px] font-normal"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}
