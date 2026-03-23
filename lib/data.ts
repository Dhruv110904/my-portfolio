import {
  Code2,
  Database,
  Layout,
  Terminal,
  Wrench,
  GraduationCap,
  Award,
  Trophy,
} from "lucide-react";

export const personalData = {
  name: "Dhruv Jain",
  tagline: "Full-Stack Developer | Building scalable web apps with modern tech",
  bio: "I'm Dhruv Jain, a Computer Science student at Lovely Professional University (CGPA: 8.33) with a passion for building real-world web applications. I love turning complex problems into clean, efficient solutions — from real-time chat apps to intelligent file detection systems. Currently exploring full-stack development with a focus on performance and user experience.",
  contact: {
    email: "dhruvplaced@gmail.com",
    linkedin: "https://linkedin.com/in/dhruvjain1109",
    github: "https://github.com/Dhruv110904",
    mobile: "+91 8700123972",
  },
};

export const skillsData = [
  {
    category: "Languages",
    items: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java"],
    icon: Code2,
  },
  {
    category: "Frameworks & Libraries",
    items: ["React.js", "Node.js", "Express.js", "Spring Boot", "Tailwind CSS"],
    icon: Layout,
  },
  {
    category: "Databases",
    items: ["MySQL", "MongoDB", "Firebase"],
    icon: Database,
  },
  {
    category: "Tools & Technologies",
    items: ["Git", "GitHub", "Docker", "Kubernetes", "Postman", "Selenium", "Linux"],
    icon: Wrench,
  },
];

export const projectsData = [
  {
    title: "UniConnect \u2014 Learning Management System",
    description:
      "A centralized platform for university students to collaborate via study groups, resource sharing, and event coordination. Boosted student engagement by 35% and improved page load time by 50% through pagination and optimized queries.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubUrl: "https://github.com/Dhruv110904/uniconnect",
    liveUrl: "",
  },
  {
    title: "FileTracer \u2014 Fake File Detection System",
    description:
      "Intelligent file verification platform using hashing-based authenticity checks to detect tampered and duplicate files. Reduced comparison time by 55% with optimized memory usage.",
    techStack: ["React.js", "C++", "JavaScript", "MongoDB"],
    githubUrl: "https://github.com/Dhruv110904/FileTracer",
    liveUrl: "",
  },
  {
    title: "Synaptik \u2014 Real-Time Chat Application",
    description:
      "Real-time one-to-one and group chat app with WebSocket-based instant messaging, JWT authentication, and protected routes. Built with Socket.io for bidirectional communication with minimal latency.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com/Dhruv110904/Synaptik",
    liveUrl: "https://synaptik-frontend.onrender.com/",
  },
  {
    title: "TextUtils \u2014 Text Utility Application",
    description:
      "A real time text utility application with various text manipulation features like case conversion, text cleaning, and analysis with real-time preview and instant results.",
    techStack: ["React.js", "Bootstrap"],
    githubUrl: "https://github.com/Dhruv110904/TextUtils",
    liveUrl: "",
  },
];

export const experienceData = [
  {
    title: "DSA Training Intern",
    company: "Lovely Professional University",
    date: "Jun 2025 \u2013 Jul 2025",
    description:
      "Applied Data Structures & Algorithms to build efficient backend logic, optimized execution time for better responsiveness, and used Git/GitHub for version control and collaboration.",
    icon: Code2,
  },
];

export const certificationsData = [
  {
    title: "Data Structures and Algorithms",
    issuer: "LPU",
    date: "Aug 2025",
    icon: GraduationCap,
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    date: "May 2025",
    icon: Award,
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Coursera",
    date: "Sep 2024",
    icon: Award,
  },
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "Coursera",
    date: "Sep 2024",
    icon: Award,
  },
];

export const achievementsData = [
  {
    title: "Top-5 Rank",
    description: "Achieved top-5 rank at a competitive hackathon (Feb 2024)",
    icon: Trophy,
    category: "Hackathon",
  },
  {
    title: "DSA Programming",
    description: "Active contributor on coding platforms like Codeforces and LeetCode.",
    link: "https://leetcode.com/u/dhruvjain_11/",
    icon: Terminal,
    category: "CP",
  },
  {
    title: "Certificate of Volunteering",
    description: "Community Service at NGO (Jun 2024)",
    icon: Award,
    category: "Open Source / Community",
  },
];
