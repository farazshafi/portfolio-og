export const PROJECTS_DATA = [
    {
        id: "codie",
        title: "Collaborative Code Editor",
        description: "Real-time peer-to-peer coding platform with multi-user synchronization.",
        longDescription: "A high-performance collaborative environment allowing developers to code together in real-time. Built with a focus on low latency and conflict resolution.",
        features: [
            "Real-time cursor tracking and code sync",
            "Conflict-free replicated data types (CRDTs)",
            "Integrated voice and text communication",
            "Multiple theme support with Monaco Editor"
        ],
        tags: ["Next.js", "Socket.io", "GraphQL", "Monaco Editor"],
        image: "/editor.png",
        github: "https://github.com/farazshafi/CODIE",
        liveUrl: "https://codie-five.vercel.app/"
    },
    {
        id: "progad",
        title: "PROGAD E-Commerce",
        description: "Scalable e-commerce system with real-time analytics and face-recognition auth.",
        longDescription: "A robust enterprise-grade e-commerce platform featuring advanced security and real-time inventory management.",
        features: [
            "Face-recognition based secure login",
            "Real-time sales and inventory dashboards",
            "Seamless Razorpay payment integration",
            "Automated PDF invoice generation"
        ],
        tags: ["React", "Express", "Node.js", "Redis"],
        image: "/progad.png",
        github: "https://github.com/farazshafi/PROGAD",
        liveUrl: "https://progad.vercel.app/"
    },
    {
        id: "resume-builder",
        title: "AI Resume Builder",
        description: "Automated resume generator with AI-based content enhancement.",
        longDescription: "Leveraging Large Language Models to help users craft the perfect resume with ATS-optimized structures.",
        features: [
            "Google Gemini AI for content synthesis",
            "Real-time PDF preview and generation",
            "Multiple ATS-friendly templates",
            "Cloud-based storage for easy updates"
        ],
        tags: ["Gemini AI", "Puppeteer", "Cloudinary", "Docker"],
        image: "/resume.png",
        github: "https://github.com/farazshafi/Resume-Builder"
    }
];

export const SKILL_CATEGORIES_DATA = [
    { id: "languages", title: "Languages", skills: ["JavaScript", "TypeScript", "Python", "Go", "Bash"] },
    { id: "frontend", title: "Frontend", skills: ["React", "Next.js", "Three.js", "Framer Motion", "Tailwind CSS"] },
    { id: "backend", title: "Backend", skills: ["Node.js", "Express", "GraphQL", "Go (net/http)", "WebSockets"] },
    { id: "devops", title: "DevOps", skills: ["Docker", "Kubernetes", "Nginx", "Linux/SSH", "CI/CD", "AWS"] }
];

export const PREWARM_LIVE_URLS = [
    "https://codie-five.vercel.app/",
    "https://progad.vercel.app/"
];
