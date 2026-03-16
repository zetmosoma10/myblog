import { Github, Linkedin, Mail, Twitter } from "lucide-react";

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
    title: "DevToolkit",
    description:
      "An open-source CLI toolkit for scaffolding modern web projects with best practices baked in.",
    tech: ["TypeScript", "Node.js", "CLI"],
    github: "https://github.com",
    live: "https://example.com",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop",
  },
  {
    title: "CloudDash",
    description:
      "Real-time cloud infrastructure monitoring dashboard with alerting and cost optimization insights.",
    tech: ["React", "Go", "WebSocket"],
    github: "https://github.com",
    live: "https://example.com",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop",
  },
  {
    title: "MarkdownPro",
    description:
      "A beautiful markdown editor with live preview, syntax highlighting, and export to PDF/HTML.",
    tech: ["React", "TypeScript", "MDX"],
    github: "https://github.com",
    live: "https://example.com",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=340&fit=crop",
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
