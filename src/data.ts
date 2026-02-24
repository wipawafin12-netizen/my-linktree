import { Github, Twitter, Instagram, Linkedin, Mail, Globe, Youtube, Coffee } from 'lucide-react';

export const profileData = {
  name: "Alex Creator",
  handle: "@alexcreates",
  bio: "Digital Artist & Frontend Developer 🎨 \nBuilding beautiful web experiences.",
  avatar: "https://picsum.photos/seed/alex/200/200", // Placeholder
  background: "https://picsum.photos/seed/background/1920/1080?blur=8", // Placeholder for background if needed
};

export const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

export const mainLinks = [
  {
    id: "1",
    title: "My Personal Portfolio",
    url: "https://example.com",
    icon: Globe,
    description: "Check out my latest projects and case studies",
    featured: true,
  },
  {
    id: "2",
    title: "Latest YouTube Video",
    url: "https://youtube.com",
    icon: Youtube,
    description: "How to build a Linktree clone in React",
    featured: false,
  },
  {
    id: "3",
    title: "Buy Me a Coffee",
    url: "https://buymeacoffee.com",
    icon: Coffee,
    featured: false,
  },
  {
    id: "4",
    title: "Read my Blog",
    url: "https://medium.com",
    featured: false,
  },
];
