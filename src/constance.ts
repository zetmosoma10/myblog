import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import apartlyImg from "#/assets/apartly-io.png";
import kanbanImg from "#/assets/kanban-io.png";
import movieImg from "#/assets/movie-io.png";
import gameImg from "#/assets/gamehub-io.png";
import audiophileImg from "#/assets/audiophile-io.png";
import payapiImg from "#/assets/paypai-io.png";

export const skills = {
  Languages: ["TypeScript", "JavaScript"],
  Frontend: [
    "React",
    "Tanstack Start",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "HTML/CSS",
    "Zustand",
    "Shadcn",
  ],
  Backend: ["Node.js", "Express", "MongoDB", "Mongoose", "REST API"],
  Tools: ["Git", "VS Code", "Figma", "Postman"],
};

export const experience = [
  {
    role: "Senior Frontend Engineer",
    company: "TechCorp",
    companyUrl: "https://example.com",
    period: "2024 – Present",
    description:
      "Leading frontend architecture for the core product. Migrated legacy codebase to React + TypeScript, improving developer velocity by 40%.",
    tags: ["React", "TypeScript", "GraphQL"],
  },
  {
    role: "Fullstack Developer",
    company: "StartupXYZ",
    companyUrl: "https://example.com",
    period: "2022 – 2024",
    description:
      "Built and shipped multiple customer-facing features. Designed REST APIs and implemented real-time data pipelines.",
    tags: ["Node.js", "React", "PostgreSQL"],
  },
  {
    role: "Junior Developer",
    company: "WebAgency",
    companyUrl: "https://example.com",
    period: "2020 – 2022",
    description:
      "Developed responsive websites and web applications for clients across various industries. Collaborated with designers to implement pixel-perfect UIs.",
    tags: ["JavaScript", "CSS", "WordPress"],
  },
];

export const projects = [
  {
    title: "Apartly",
    description:
      "An Apartment application were landlord add their properties and tenant can view them.",
    tech: ["TypeScript", "React", "Express.js", "MongoDB"],
    github: "https://github.com/zetmosoma10/apartly-client",
    live: "https://apartly.netlify.app/",
    image: apartlyImg,
  },
  {
    title: "Kanban",
    description:
      "A Task management app that allows user to manage tasks, boards and columns.",
    tech: ["React", "Typescript", "Express", "MongoDB"],
    github: "https://github.com/zetmosoma10/kanbantask-client",
    live: "https://kanbantask-client.netlify.app/",
    image: kanbanImg,
  },
  {
    title: "Movie Explore",
    description:
      "A beautiful Movie Explore were user can view movie rating and movie trailers.",
    tech: ["React", "TMDB API", "Typescript"],
    github: "https://github.com/zetmosoma10/promovies",
    live: "https://promovies.netlify.app/",
    image: movieImg,
  },
  {
    title: "Gamehub",
    description:
      "A beautiful Game explore were user can search for game and view their trailer.",
    tech: ["React", "Rawg API", "Typescript"],
    github: "https://github.com/zetmosoma10/games-hub",
    live: "https://games-pro.netlify.app/",
    image: gameImg,
  },
  {
    title: "Audiophile",
    description:
      "An E-commerce website were user can browser headphones, earphone and can add items to cart and place orders .",
    tech: ["React", "Javascript", "Express", "MongoDB"],
    github: "https://github.com/zetmosoma10/audiophile-client",
    live: "https://audiophile-client.netlify.app/",
    image: audiophileImg,
  },
  {
    title: "Payapi",
    description: "A static website that showcase payment apis.",
    tech: ["React", "Javascript"],
    github: "https://github.com/zetmosoma10/payapi",
    live: "https://payapi-client.netlify.app/",
    image: payapiImg,
  },
];

export const education = [
  {
    degree: "B.S. Computer Science",
    school: "University of Technology",
    period: "2016 – 2020",
    description:
      "Focused on software engineering and distributed systems. Graduated with honors.",
  },
];

export const certifications = [
  "AWS Solutions Architect – Associate",
  "Google Professional Cloud Developer",
];

export const contacts = [
  {
    href: "https://github.com/zetmosoma10",
    icon: Github,
  },
  {
    href: "https://x.com/zetmosoma10",
    icon: Twitter,
  },
  {
    href: "https://www.linkedin.com/in/zetmosoma/",
    icon: Linkedin,
  },
  {
    href: "mailto:zet10mokone@gmail.com",
    icon: Mail,
  },
];
