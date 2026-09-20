// Site-wide details. Business hours are still a placeholder.
export const site = {
  name: 'DS SkillLabs',
  tagline: 'Learn • Build • Grow',
  url: 'https://www.dsskilllabs.com', // confirm your real domain
  email: 'contact@dsskilllabs.org',
  phone: '+91 79788 40790',
  location: 'Sai Samrat Residency, Rd Number 15, Bagath Singh Nagar Phase 2, Kukatpally, Hyderabad, Telangana 500085',
  hours: 'Mon–Sat, 9:00 am – 7:00 pm',
  // Add LinkedIn, YouTube or Facebook here when you have the links.
  social: [{ name: 'Instagram', href: 'https://www.instagram.com/dsskilllabs' }],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Placements', href: '/placements' },
    { label: 'Contact', href: '/contact' },
    { label: 'Candidate Form', href: '/candidate-registration' },
  ],
} as const;
