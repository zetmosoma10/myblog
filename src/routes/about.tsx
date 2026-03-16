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
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";
import img from "#/assets/IMG_2622.jpg";
import {
  skills,
  experience,
  projects,
  education,
  certifications,
} from "#/constance";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="max-container">
      <main className="container py-12 md:py-20 max-w-[900px]">
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
              Alex Chen
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mb-3 text-sm">
              <MapPin className="h-3.5 w-3.5" />
              San Francisco, CA
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-xl">
              Fullstack developer with 6+ years of experience building web
              applications. I'm passionate about clean code, developer tooling,
              and creating delightful user experiences. Currently focused on
              React, TypeScript, and cloud-native architectures.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:alex@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
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
                className="flex flex-col sm:flex-row sm:items-start gap-2"
              >
                <span className="text-sm font-medium text-muted-foreground w-24 shrink-0 pt-0.5">
                  {category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-accent text-accent-foreground border-0 font-normal text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-border">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                  <h3 className="font-semibold text-foreground">{exp.role}</h3>
                  <span className="text-muted-foreground text-sm">
                    at{" "}
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {exp.company}
                    </a>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                  <Calendar className="h-3 w-3" />
                  {exp.period}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs font-normal"
                    >
                      {tag}
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

        {/* Education & Certifications */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Education & Certifications
          </h2>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.school}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 mb-2">
                  <Calendar className="h-3 w-3" />
                  {edu.period}
                </p>
                <p className="text-sm text-muted-foreground">
                  {edu.description}
                </p>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-2">
                Certifications
              </h3>
              <ul className="space-y-1">
                {certifications.map((cert) => (
                  <li
                    key={cert}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
