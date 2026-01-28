
import React from 'react';
import { ProgramPillar, StatItem, NavLink, BlogPost, TeamMember, Testimonial } from './types';

export const LEAD_EMAIL = "info@smilesofhopeforchildren.org";

// Prevention & Early Childhood - Tooth icon
const IconTooth = () => (
  <svg className="w-12 h-12 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

// Caregiver & Community Education - Open Book icon
const IconEducation = () => (
  <svg className="w-12 h-12 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

// Outreach & Access - Ambulance/Van icon
const IconVan = () => (
  <svg className="w-12 h-12 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 8h4" />
  </svg>
);

// Capacity Building - Tools/Briefcase icon
const IconTraining = () => (
  <svg className="w-12 h-12 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconHappy = () => (
  <svg className="w-12 h-12 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconHealthWorker = () => (
  <svg className="w-12 h-12 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconWorld = () => (
  <svg className="w-12 h-12 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.945M8 3.935A9 9 0 1016.065 19.065" />
  </svg>
);

const IconSparkles = () => (
  <svg className="w-12 h-12 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
  </svg>
);

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Missions', href: '#missions' },
  { label: 'Contact', href: '#contact' },
];

export const PROGRAM_PILLARS: ProgramPillar[] = [
  {
    title: 'Prevention & Early Childhood',
    description: 'Promoting age-appropriate oral hygiene practices from infancy.',
    icon: <IconTooth />,
    points: [
      'Promote age-appropriate oral hygiene practices from infancy',
      'Support fluoride toothpaste use and caries prevention',
      'Encourage early dental visits and timely referrals'
    ]
  },
  {
    title: 'Caregiver & Community Education',
    description: 'Delivering culturally appropriate oral health education.',
    icon: <IconEducation />,
    points: [
      'Partner with schools, churches, and community leaders',
      'Address myths and misconceptions around child oral health',
      'Empower parents with accurate dental knowledge'
    ]
  },
  {
    title: 'Outreach & Access',
    description: 'Basic oral health screenings and referrals in underserved areas.',
    icon: <IconVan />,
    points: [
      'Support mobile or outreach dental services',
      'Provide basic oral health screenings',
      'Collaborate with local healthcare providers and NGOs'
    ]
  },
  {
    title: 'Capacity Building',
    description: 'Training non-dental primary care providers and health workers.',
    icon: <IconTraining />,
    points: [
      'Train community health workers to recognize oral disease',
      'Advocate for oral health in primary child healthcare',
      'Support sustainable, community-led initiatives'
    ]
  }
];

export const STATS: StatItem[] = [
  { label: 'Children Reached', value: '5,000+', icon: <IconHappy /> },
  { label: 'Health Workers Trained', value: '250+', icon: <IconHealthWorker /> },
  { label: 'Communities Served', value: '45', icon: <IconWorld /> },
  { label: 'Smiles Saved', value: '12,000+', icon: <IconSparkles /> }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "My son used to be terrified of the dentist. After the foundation's outreach, he's actually excited to brush every morning!",
    author: "Mrs. Adeola",
    location: "Festac Community"
  },
  {
    quote: "The knowledge shared during the education session helped us realize that dental health starts from infancy. It was eye-opening.",
    author: "Samuel Balogun",
    location: "Community Leader"
  },
  {
    quote: "Providing my children with oral kits from the foundation has saved them from the constant toothaches they used to suffer from.",
    author: "Blessing N.",
    location: "Rural Outreach Participant"
  },
  {
    quote: "We are grateful for Prof. Olatosi's vision. Seeing our students learn about oral hygiene in such a fun way is truly heartwarming.",
    author: "School Principal",
    location: "Lagos Primary School"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Adebayo Ogunlesi",
    role: "Clinical Director",
    bio: "Specialist in pediatric dentistry with over 15 years of experience in community health.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
    socials: { linkedin: "#" }
  },
  {
    name: "Sarah Enahoro",
    role: "Community Outreach Lead",
    bio: "Passionate about bridging the gap between healthcare services and rural communities.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
    socials: { twitter: "https://x.com/OfHope30433", linkedin: "#" }
  },
  {
    name: "Dr. Chioma Uzoma",
    role: "Education Coordinator",
    bio: "Focused on developing culturally relevant oral health curricula for schools.",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop",
    socials: { linkedin: "#" }
  },
  {
    name: "Samuel Balogun",
    role: "Program Manager",
    bio: "Expert in logistics and sustainable development with a heart for child welfare.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop",
    socials: { twitter: "https://x.com/OfHope30433" }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Dental Screening And Oral Health Promotion',
    date: '2026-02-07',
    category: 'Upcoming',
    excerpt: 'Join us for our upcoming comprehensive dental screening and educational session aimed at promoting oral hygiene among children in Lagos.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    content: `Our upcoming mission on February 7th, 2026, represents a significant milestone in our journey to improve pediatric oral health across Nigeria. We will be deploying a team of specialized pediatric dentists and community health workers to provide free comprehensive screenings for over 300 children in the local community.

The program includes:
- Professional dental check-ups for all participating children.
- Application of fluoride varnish to help prevent tooth decay.
- Interactive workshops for parents on effective home care routines.
- Distribution of oral hygiene kits containing fluoride toothpaste and age-appropriate brushes.

We believe that early intervention is the key to preventing long-term dental issues. By engaging with both children and their primary caregivers, we create a sustainable environment for healthy smiles to flourish.`,
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    title: '5 Tips for Preventing Early Childhood Caries',
    date: '2024-10-15',
    category: 'Health Tip',
    excerpt: 'Simple daily habits for parents to ensure their children grow up with strong, healthy teeth and confident smiles.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    content: `Oral health is a vital component of a child's overall wellbeing. Early childhood caries (ECC) can lead to pain, infection, and potential development issues if left untreated. Here are five essential tips every parent should know:

1. **Start Early**: Begin cleaning your baby's mouth even before the first tooth appears by wiping the gums with a clean, damp cloth.
2. **Brush Twice Daily**: Once teeth emerge, use a small, soft-bristled toothbrush and a smear of fluoride toothpaste twice a day.
3. **Smart Snacking**: Limit sugary drinks and sticky sweets. Encourage water and healthy snacks like fruits and vegetables.
4. **Regular Check-ups**: The first dental visit should happen by the child's first birthday or when the first tooth appears.
5. **Nightly Routine**: Never put a child to bed with a bottle containing anything other than water to prevent "bottle rot."

By following these simple steps, you can set your child on the path to a lifetime of healthy smiles.`,
    gallery: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    title: 'New Partnership with Local Community Health Workers',
    date: '2024-10-20',
    category: 'Upcoming',
    excerpt: 'We are expanding our reach by training 50 new community health workers to recognize early signs of oral disease.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
    content: `Smiles of Hope for Children Foundation is proud to announce a new partnership initiative focused on capacity building within the primary healthcare sector. We have successfully launched a training program for 50 community health workers in underserved regions.

These frontline workers are being trained to:
- Identify early signs of dental caries and gum disease in children.
- Deliver basic oral health education to families during home visits.
- Provide appropriate referrals to dental professionals for complex cases.
- Monitor the use of fluoride toothpaste within their assigned communities.

This partnership is a cornerstone of our Theory of Change. By empowering local health workers who already have the trust of their communities, we can significantly scale our impact and ensure that oral health is integrated into general child healthcare services.`,
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559027615-cd9d732ffadd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop'
    ]
  }
];
