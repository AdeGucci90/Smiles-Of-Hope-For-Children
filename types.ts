
import { ReactNode } from 'react';

export interface ProgramPillar {
  title: string;
  description: string;
  points: string[];
  icon: ReactNode;
}

export interface StatItem {
  label: string;
  value: string;
  icon: ReactNode;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: 'Upcoming' | 'Outreach' | 'Health Tip';
  excerpt: string;
  image: string;
  video?: string; // Support for YouTube/Vimeo embed URLs
  content?: string;
  gallery?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
  };
}
