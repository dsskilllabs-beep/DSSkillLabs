// Homepage content. Replace placeholders with real numbers, projects and testimonials.
export const stats: { n?: number; suffix?: string; text?: string; label: string }[] = [
  {
    "n": 500,
    "suffix": "+",
    "label": "Students trained"
  },
  {
    "n": 20,
    "suffix": "+",
    "label": "Real-world projects"
  },
  {
    "n": 10,
    "suffix": "+",
    "label": "Industry skills"
  },
  {
    "text": "24/7",
    "label": "Learning support"
  }
];

export const why: { icon: string; title: string; text: string }[] = [
  {
    "icon": "book",
    "title": "Industry-relevant curriculum",
    "text": "Topics and tools chosen from what data and engineering teams actually use."
  },
  {
    "icon": "term",
    "title": "Hands-on projects",
    "text": "Every module ends with something you build, not just something you watch."
  },
  {
    "icon": "users",
    "title": "Mentor support",
    "text": "Get answers and code reviews from people who work with these tools."
  },
  {
    "icon": "chat",
    "title": "Interview preparation",
    "text": "Practise technical questions and mock interviews before the real ones."
  },
  {
    "icon": "compass",
    "title": "Career guidance",
    "text": "Choose a direction, shape your profile and plan your next move."
  },
  {
    "icon": "layers",
    "title": "Practical learning",
    "text": "Concepts are taught through real datasets, real tools and real workflows."
  }
];

export const journey: { t: string; d: string }[] = [
  {
    "t": "Learn",
    "d": "Structured lessons on core concepts."
  },
  {
    "t": "Practice",
    "d": "Exercises on real datasets."
  },
  {
    "t": "Build",
    "d": "Portfolio projects end to end."
  },
  {
    "t": "Get mentored",
    "d": "Reviews and guidance on your work."
  },
  {
    "t": "Prepare for interviews",
    "d": "Mock rounds and question practice."
  },
  {
    "t": "Build your career",
    "d": "Apply with a profile you can defend."
  }
];

export const projects: { art: string; title: string; desc: string; stack: string[]; build: string[] }[] = [
  {
    "art": "bars",
    "title": "Sales analytics dashboard",
    "desc": "Turn raw sales data into an interactive dashboard that tracks revenue, regions and trends.",
    "stack": [
      "SQL",
      "Power BI",
      "Excel"
    ],
    "build": [
      "Clean and model sales data",
      "Design KPIs and drill-downs"
    ]
  },
  {
    "art": "churn",
    "title": "Customer churn prediction",
    "desc": "Predict which customers are likely to leave and explain the drivers behind it.",
    "stack": [
      "Python",
      "Pandas",
      "Scikit-learn"
    ],
    "build": [
      "Feature engineering on customer data",
      "Train and evaluate a classifier"
    ]
  },
  {
    "art": "pipe",
    "title": "End-to-end data pipeline",
    "desc": "Ingest, transform and load data on a schedule into a warehouse ready for analysis.",
    "stack": [
      "PySpark",
      "Airflow",
      "AWS"
    ],
    "build": [
      "Build a scheduled ETL workflow",
      "Add checks and monitoring"
    ]
  },
  {
    "art": "shop",
    "title": "E-commerce full stack app",
    "desc": "Ship a complete store with product pages, cart, user accounts and a database.",
    "stack": [
      "React",
      "Node.js",
      "MongoDB"
    ],
    "build": [
      "REST API and authentication",
      "Responsive React frontend"
    ]
  },
  {
    "art": "rec",
    "title": "Recommendation system",
    "desc": "Suggest products or content to users based on behaviour and similarity.",
    "stack": [
      "Python",
      "NumPy",
      "Scikit-learn"
    ],
    "build": [
      "Collaborative filtering model",
      "Evaluate recommendation quality"
    ]
  },
  {
    "art": "live",
    "title": "Real-time data dashboard",
    "desc": "Stream events into a live dashboard that updates as new data arrives.",
    "stack": [
      "PostgreSQL",
      "JavaScript",
      "Docker"
    ],
    "build": [
      "Stream and store live events",
      "Live charts in the browser"
    ]
  }
];

export const tech: { group: string; items: string[] }[] = [
  {
    "group": "Analytics",
    "items": [
      "Excel",
      "SQL",
      "Power BI",
      "Tableau"
    ]
  },
  {
    "group": "Data science",
    "items": [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn"
    ]
  },
  {
    "group": "Data engineering",
    "items": [
      "PySpark",
      "Apache Airflow",
      "PostgreSQL",
      "MongoDB"
    ]
  },
  {
    "group": "Web development",
    "items": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js"
    ]
  },
  {
    "group": "Cloud and tools",
    "items": [
      "AWS",
      "Azure",
      "Docker",
      "Git",
      "GitHub"
    ]
  }
];

export const career: string[] = [
  "Resume building",
  "LinkedIn optimization",
  "Mock interviews",
  "Technical interview preparation",
  "Portfolio development",
  "Project guidance",
  "Career mentoring"
];

// SAMPLE testimonials. Replace with real student feedback before launch.
export const testimonials: { name: string; course: string; rating: number; text: string }[] = [
  {
    "name": "Student Name",
    "course": "Data Analytics",
    "rating": 5,
    "text": "Sample testimonial. Replace this with a real student’s words about the program and what they built."
  },
  {
    "name": "Student Name",
    "course": "Data Science",
    "rating": 5,
    "text": "Sample testimonial. Replace this with a real student’s words about the program and what they built."
  },
  {
    "name": "Student Name",
    "course": "Full Stack Development",
    "rating": 5,
    "text": "Sample testimonial. Replace this with a real student’s words about the program and what they built."
  }
];

// Confirm the answers match how you actually run programs.
export const faq: { q: string; a: string }[] = [
  {
    "q": "Who can join DS SkillLabs?",
    "a": "Students, fresh graduates and working professionals who want practical skills in data or software development."
  },
  {
    "q": "Do I need prior programming experience?",
    "a": "Not for our beginner programs. We start from the basics. Intermediate and advanced programs list their prerequisites on each program page."
  },
  {
    "q": "Are the courses beginner friendly?",
    "a": "Yes. Each program is marked Beginner, Intermediate or Advanced, so you can start where you fit."
  },
  {
    "q": "Will I work on real-world projects?",
    "a": "Yes. Every program includes projects built on real datasets and real tools, and they become part of your portfolio."
  },
  {
    "q": "Do you provide interview preparation?",
    "a": "Yes. We run mock interviews, technical question practice, resume reviews and LinkedIn guidance."
  },
  {
    "q": "Are classes online or offline?",
    "a": "Tell us which mode you prefer in your enquiry and we will share the available batches. (confirm your delivery modes)"
  },
  {
    "q": "How do I enroll?",
    "a": "Send an enquiry using the form on this page or call us. Our team will help you choose a program and batch, then guide you through registration."
  },
  {
    "q": "How can I contact DS SkillLabs?",
    "a": "Use the phone number, email or address in the contact section, or submit the enquiry form."
  }
];
