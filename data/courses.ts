// Edit program details here. Durations, levels, fees and curriculum are placeholders.
export type Course = {
  slug: string; title: string; icon: string; short: string;
  level: 1 | 2 | 3; levelName: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; fee: string; lede: string; overview: string;
  who: string[]; prerequisites: string[];
  modules: { title: string; topics: string[] }[];
  tools: string[]; projects: { title: string; description: string }[];
  outcomes: string[]; careers: string[]; faqs: { q: string; a: string }[];
};

export const courses: Course[] = [
  {
    "slug": "data-analytics",
    "title": "Data Analytics",
    "icon": "bars",
    "short": "Learn Excel, SQL, Power BI, Python and analytics techniques to turn data into business insights.",
    "level": 1,
    "levelName": "Beginner",
    "duration": "4 months",
    "fee": "₹50,000",
    "lede": "Go from spreadsheets to storytelling with data. Learn to clean data, query databases, build dashboards and explain what the numbers mean to a business.",
    "overview": "This program is built for people who want to work with data but are starting from the basics. You learn the tools analysts use every day (Excel, SQL, Power BI and Python) and practise them on realistic business datasets. By the end you can take a vague business question, find the answer in the data and present it clearly.",
    "who": [
      "Fresh graduates starting a data career",
      "Working professionals moving into analytics",
      "Operations, finance and marketing staff who work with reports"
    ],
    "prerequisites": [
      "Basic computer skills",
      "Comfort with everyday math",
      "No coding experience needed"
    ],
    "modules": [
      {
        "title": "Excel for analysis",
        "topics": [
          "Formulas and lookups",
          "Pivot tables",
          "Data cleaning",
          "Charts"
        ]
      },
      {
        "title": "SQL for analysts",
        "topics": [
          "SELECT and filtering",
          "Joins",
          "Aggregations",
          "Window functions"
        ]
      },
      {
        "title": "Dashboards with Power BI",
        "topics": [
          "Data modeling",
          "DAX basics",
          "Interactive reports",
          "Tableau overview"
        ]
      },
      {
        "title": "Python for analytics",
        "topics": [
          "Python basics",
          "Pandas",
          "NumPy",
          "Exploratory analysis"
        ]
      },
      {
        "title": "Statistics and business metrics",
        "topics": [
          "Descriptive statistics",
          "Probability basics",
          "A/B testing",
          "KPIs"
        ]
      },
      {
        "title": "Capstone and portfolio",
        "topics": [
          "Framing a business problem",
          "End-to-end analysis",
          "Presenting insights",
          "Mentor review"
        ]
      }
    ],
    "tools": [
      "Excel",
      "SQL",
      "Power BI",
      "Tableau",
      "Python",
      "Pandas",
      "NumPy"
    ],
    "projects": [
      {
        "title": "Sales analytics dashboard",
        "description": "Model sales data and build an interactive dashboard for revenue, regions and trends."
      },
      {
        "title": "Customer segmentation analysis",
        "description": "Group customers by behaviour and recommend actions for each segment."
      },
      {
        "title": "Capstone business case",
        "description": "Answer a real business question end to end and present your findings."
      }
    ],
    "outcomes": [
      "Clean and analyze data with Excel, SQL and Python",
      "Build dashboards that answer business questions",
      "Explain insights to non-technical audiences",
      "Present a portfolio of finished projects"
    ],
    "careers": [
      "Data Analyst",
      "Business Analyst",
      "BI Analyst",
      "Reporting Analyst",
      "Operations Analyst"
    ],
    "faqs": [
      {
        "q": "Do I need to know coding before I start?",
        "a": "No. You begin with Excel and SQL, and Python is introduced step by step."
      },
      {
        "q": "Which tool should I learn first, Power BI or Tableau?",
        "a": "You build your main dashboards in Power BI and get a Tableau overview, so you can work with either."
      }
    ]
  },
  {
    "slug": "data-science",
    "title": "Data Science",
    "icon": "flask",
    "short": "Build strong foundations in Python, statistics, machine learning and real-world data science.",
    "level": 2,
    "levelName": "Intermediate",
    "duration": "6 months",
    "fee": "₹50,000",
    "lede": "Build strong foundations in Python, statistics and machine learning, then apply them to real data science problems.",
    "overview": "This program takes you from data wrangling to building and evaluating machine learning models. You learn the statistics behind the methods, so you understand why a model works, and you finish by packaging a project you can show to employers.",
    "who": [
      "Analysts who want to move into machine learning",
      "Engineering, math and statistics graduates",
      "Developers curious about data science"
    ],
    "prerequisites": [
      "Basic Python, or willingness to complete the pre-work",
      "School-level math",
      "Familiarity with Excel or SQL helps"
    ],
    "modules": [
      {
        "title": "Python for data science",
        "topics": [
          "Python essentials",
          "NumPy",
          "Pandas",
          "Jupyter notebooks"
        ]
      },
      {
        "title": "Statistics and probability",
        "topics": [
          "Distributions",
          "Hypothesis testing",
          "Correlation",
          "Sampling"
        ]
      },
      {
        "title": "Data wrangling and EDA",
        "topics": [
          "Cleaning messy data",
          "Visual exploration",
          "Feature creation",
          "SQL for data pulls"
        ]
      },
      {
        "title": "Machine learning",
        "topics": [
          "Regression",
          "Classification",
          "Decision trees",
          "Clustering",
          "Model evaluation"
        ]
      },
      {
        "title": "Advanced modeling",
        "topics": [
          "Ensembles",
          "Hyperparameter tuning",
          "Pipelines",
          "Imbalanced data"
        ]
      },
      {
        "title": "Deployment and capstone",
        "topics": [
          "Model packaging",
          "Git and GitHub",
          "Storytelling with results",
          "Mentor review"
        ]
      }
    ],
    "tools": [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "SQL",
      "Git",
      "GitHub"
    ],
    "projects": [
      {
        "title": "Customer churn prediction",
        "description": "Predict which customers are likely to leave and explain what drives it."
      },
      {
        "title": "Recommendation system",
        "description": "Suggest products from behaviour and similarity, then measure quality."
      },
      {
        "title": "Capstone data science project",
        "description": "Choose a problem, build the model and present the results."
      }
    ],
    "outcomes": [
      "Prepare and explore real datasets confidently",
      "Build and evaluate machine learning models",
      "Explain model results in plain language",
      "Ship a portfolio of end-to-end projects"
    ],
    "careers": [
      "Junior Data Scientist",
      "Machine Learning Analyst",
      "Data Analyst",
      "Research Associate"
    ],
    "faqs": [
      {
        "q": "How much math do I need?",
        "a": "School-level math is enough to start. We teach the statistics you need along the way."
      },
      {
        "q": "Is this program suitable if I only know Excel?",
        "a": "Yes, if you complete the Python pre-work first. We share it after you enroll."
      }
    ]
  },
  {
    "slug": "data-engineering",
    "title": "Data Engineering",
    "icon": "db",
    "short": "Learn Python, SQL, databases, ETL, cloud platforms and modern data engineering workflows.",
    "level": 2,
    "levelName": "Intermediate",
    "duration": "6 months",
    "fee": "₹50,000",
    "lede": "Learn Python, SQL, databases, ETL, cloud platforms and the modern workflows that move data from source to insight.",
    "overview": "Data engineers build the systems that make data reliable and available. This program covers databases, ETL pipelines, distributed processing with PySpark, orchestration with Airflow and cloud basics, and it ends with a pipeline you build from scratch.",
    "who": [
      "Developers or analysts moving into data engineering",
      "Graduates with a programming background",
      "Database and BI professionals who want to build pipelines"
    ],
    "prerequisites": [
      "Basic programming in any language",
      "Comfort with the command line",
      "Some SQL helps but is taught"
    ],
    "modules": [
      {
        "title": "Python and SQL foundations",
        "topics": [
          "Python for data tasks",
          "Advanced SQL",
          "Query performance",
          "Working with files and APIs"
        ]
      },
      {
        "title": "Databases and data modeling",
        "topics": [
          "PostgreSQL",
          "Normalization",
          "Star schema",
          "MongoDB overview"
        ]
      },
      {
        "title": "ETL fundamentals",
        "topics": [
          "Extract, transform, load",
          "Data quality checks",
          "Incremental loads",
          "Error handling"
        ]
      },
      {
        "title": "Distributed processing with PySpark",
        "topics": [
          "Spark concepts",
          "DataFrames",
          "Transformations",
          "Performance basics"
        ]
      },
      {
        "title": "Orchestration and cloud",
        "topics": [
          "Apache Airflow",
          "AWS storage and compute",
          "Docker basics",
          "Scheduling and monitoring"
        ]
      },
      {
        "title": "Capstone pipeline",
        "topics": [
          "Design a pipeline",
          "Build and schedule it",
          "Document the design",
          "Mentor review"
        ]
      }
    ],
    "tools": [
      "Python",
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "PySpark",
      "Apache Airflow",
      "AWS",
      "Docker",
      "Git"
    ],
    "projects": [
      {
        "title": "End-to-end data pipeline",
        "description": "Ingest, transform and load data on a schedule into an analytics-ready store."
      },
      {
        "title": "Data warehouse design",
        "description": "Model a star schema and load it from multiple sources."
      },
      {
        "title": "Capstone cloud pipeline",
        "description": "Build a monitored pipeline on cloud services and document it."
      }
    ],
    "outcomes": [
      "Design reliable ETL pipelines",
      "Model data for analytics",
      "Process large datasets with PySpark",
      "Schedule and monitor workflows with Airflow"
    ],
    "careers": [
      "Junior Data Engineer",
      "ETL Developer",
      "Analytics Engineer",
      "Database Developer",
      "Cloud Data Associate"
    ],
    "faqs": [
      {
        "q": "Do I need cloud experience?",
        "a": "No. We introduce the AWS services you need and use them in the projects."
      },
      {
        "q": "How is this different from Data Science?",
        "a": "Data science focuses on modeling. Data engineering focuses on building the pipelines and systems that supply the data."
      }
    ]
  },
  {
    "slug": "full-stack-development",
    "title": "Full Stack Development",
    "icon": "code",
    "short": "Build production-ready web applications using modern frontend, backend and database technologies.",
    "level": 1,
    "levelName": "Beginner",
    "duration": "90 days",
    "fee": "₹50,000",
    "lede": "Build production-ready web applications with modern frontend, backend and database technologies.",
    "overview": "You start with how the web works and finish by deploying a complete application. Along the way you learn HTML, CSS, JavaScript, React, Node.js and databases, and you practise the Git workflow that development teams use every day.",
    "who": [
      "Beginners who want to become web developers",
      "Graduates looking for a practical software skill set",
      "Professionals switching into development"
    ],
    "prerequisites": [
      "Basic computer skills",
      "Logical thinking",
      "No programming experience needed"
    ],
    "modules": [
      {
        "title": "Web foundations",
        "topics": [
          "HTML",
          "CSS",
          "Responsive layout",
          "Git and GitHub"
        ]
      },
      {
        "title": "JavaScript",
        "topics": [
          "ES6 features",
          "DOM",
          "Async and fetch",
          "Debugging"
        ]
      },
      {
        "title": "Frontend with React",
        "topics": [
          "Components",
          "Hooks and state",
          "Routing",
          "Forms"
        ]
      },
      {
        "title": "Backend with Node.js",
        "topics": [
          "Express",
          "REST APIs",
          "Authentication",
          "Validation"
        ]
      },
      {
        "title": "Databases",
        "topics": [
          "MongoDB",
          "PostgreSQL",
          "Schema design",
          "Queries from code"
        ]
      },
      {
        "title": "Deployment and capstone",
        "topics": [
          "Testing basics",
          "Deploying an app",
          "Environment configuration",
          "Mentor review"
        ]
      }
    ],
    "tools": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "GitHub"
    ],
    "projects": [
      {
        "title": "E-commerce application",
        "description": "Products, cart, user accounts and orders backed by a database."
      },
      {
        "title": "Real-time dashboard",
        "description": "A live-updating interface fed by an API you build."
      },
      {
        "title": "Capstone web app",
        "description": "Plan, build and deploy an application of your own."
      }
    ],
    "outcomes": [
      "Build responsive, accessible interfaces",
      "Create and secure REST APIs",
      "Design and query databases",
      "Deploy and maintain a full stack app"
    ],
    "careers": [
      "Junior Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "React Developer",
      "Web Developer"
    ],
    "faqs": [
      {
        "q": "Is this suitable if I have never coded?",
        "a": "Yes. The program starts from zero and builds up gradually."
      },
      {
        "q": "Will I build a portfolio?",
        "a": "Yes. You finish with several deployed projects you can link on your resume."
      }
    ]
  },
  {
    "slug": "ai-machine-learning",
    "title": "AI & Machine Learning",
    "icon": "ai",
    "short": "Learn machine learning, deep learning and practical AI development.",
    "level": 3,
    "levelName": "Advanced",
    "duration": "5 months",
    "fee": "₹50,000",
    "lede": "Learn machine learning, deep learning and practical AI development, from model training to deployment.",
    "overview": "This advanced program is for learners who already program in Python and know the basics of machine learning. You go deeper into neural networks and language models, then learn how to ship models as usable services.",
    "who": [
      "Data scientists and developers who want to specialise in AI",
      "Engineers building AI features into products",
      "Learners who completed a data science foundation"
    ],
    "prerequisites": [
      "Comfortable with Python",
      "Basic statistics and linear algebra",
      "Prior exposure to machine learning"
    ],
    "modules": [
      {
        "title": "Machine learning foundations",
        "topics": [
          "Model evaluation",
          "Feature engineering",
          "Regularization",
          "Experiment design"
        ]
      },
      {
        "title": "Deep learning",
        "topics": [
          "Neural networks",
          "Training and tuning",
          "Convolutional networks",
          "Transfer learning"
        ]
      },
      {
        "title": "Natural language processing",
        "topics": [
          "Text preprocessing",
          "Embeddings",
          "Transformers",
          "Building with language models"
        ]
      },
      {
        "title": "Recommenders and time series",
        "topics": [
          "Collaborative filtering",
          "Ranking basics",
          "Forecasting",
          "Evaluation metrics"
        ]
      },
      {
        "title": "MLOps and deployment",
        "topics": [
          "Experiment tracking",
          "Serving models as APIs",
          "Docker",
          "Monitoring"
        ]
      },
      {
        "title": "Capstone AI application",
        "topics": [
          "Scope a use case",
          "Build and evaluate",
          "Deploy a demo",
          "Mentor review"
        ]
      }
    ],
    "tools": [
      "Python",
      "NumPy",
      "Scikit-learn",
      "Docker",
      "Git",
      "GitHub"
    ],
    "projects": [
      {
        "title": "Recommendation system",
        "description": "Personalised suggestions with offline evaluation."
      },
      {
        "title": "Text classification service",
        "description": "Train a language model-based classifier and serve it behind an API."
      },
      {
        "title": "Capstone AI application",
        "description": "Build, deploy and demonstrate an AI feature end to end."
      }
    ],
    "outcomes": [
      "Train and tune deep learning models",
      "Build language-based applications",
      "Deploy models behind APIs",
      "Evaluate models responsibly"
    ],
    "careers": [
      "Junior Machine Learning Engineer",
      "AI Developer",
      "Data Scientist",
      "NLP Engineer"
    ],
    "faqs": [
      {
        "q": "Can I join without machine learning experience?",
        "a": "We recommend completing our Data Science program or an equivalent first."
      },
      {
        "q": "Do I need a GPU?",
        "a": "No. Training exercises run on cloud notebooks we set up with you."
      }
    ]
  },
  {
    "slug": "cloud-devops",
    "title": "Cloud & DevOps",
    "icon": "cloud",
    "short": "Master cloud infrastructure, deployment, CI/CD, containers and DevOps practices.",
    "level": 2,
    "levelName": "Intermediate",
    "duration": "3 months",
    "fee": "₹50,000",
    "lede": "Master cloud infrastructure, deployment, CI/CD, containers and DevOps practices.",
    "overview": "This program shows how software gets built, tested, deployed and monitored. You work on Linux, containers and cloud services, then automate the whole flow with CI/CD and infrastructure as code.",
    "who": [
      "Developers who want to own deployment",
      "System and support engineers moving to cloud",
      "Graduates targeting DevOps roles"
    ],
    "prerequisites": [
      "Basic command line comfort",
      "Some scripting or programming exposure",
      "Understanding of how web apps work helps"
    ],
    "modules": [
      {
        "title": "Linux and networking basics",
        "topics": [
          "Shell commands",
          "Permissions",
          "Networking essentials",
          "Scripting"
        ]
      },
      {
        "title": "Git and CI/CD",
        "topics": [
          "Branching workflows",
          "Build pipelines",
          "Automated tests",
          "Release strategies"
        ]
      },
      {
        "title": "Containers with Docker",
        "topics": [
          "Images and containers",
          "Docker Compose",
          "Registries",
          "Container networking"
        ]
      },
      {
        "title": "Cloud on AWS and Azure",
        "topics": [
          "Compute and storage",
          "IAM and security",
          "Networking",
          "Cost basics"
        ]
      },
      {
        "title": "Infrastructure as code and monitoring",
        "topics": [
          "Infrastructure as code",
          "Logging",
          "Metrics and alerts",
          "Troubleshooting"
        ]
      },
      {
        "title": "Capstone deployment",
        "topics": [
          "Deploy an app to the cloud",
          "Automate with CI/CD",
          "Document the setup",
          "Mentor review"
        ]
      }
    ],
    "tools": [
      "AWS",
      "Azure",
      "Docker",
      "Git",
      "GitHub"
    ],
    "projects": [
      {
        "title": "Deploy a full stack app",
        "description": "Host an application on cloud infrastructure with a clean release process."
      },
      {
        "title": "CI/CD pipeline",
        "description": "Automate build, test and deploy on every commit."
      },
      {
        "title": "Capstone cloud setup",
        "description": "Design, deploy and monitor a small production-style environment."
      }
    ],
    "outcomes": [
      "Deploy applications on AWS and Azure",
      "Automate builds and releases",
      "Run and manage containers",
      "Monitor and troubleshoot systems"
    ],
    "careers": [
      "Junior DevOps Engineer",
      "Cloud Engineer",
      "Build and Release Engineer",
      "Cloud Support Engineer"
    ],
    "faqs": [
      {
        "q": "Do I need to know programming?",
        "a": "Basic scripting helps, and we cover what you need for automation."
      },
      {
        "q": "Which cloud do we use?",
        "a": "We work with AWS and Azure so you can apply the skills on either."
      }
    ]
  }
] as Course[];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
