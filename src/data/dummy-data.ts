// Dummy data for the Learning Hub application

export const dummyUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/placeholder.svg",
  joinDate: "2024-01-15",
  streak: 12,
  totalPoints: 1250,
};

export const dummyNotes = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    uploadDate: "2024-03-15",
    fileType: "PDF",
    summary: "Comprehensive overview of ML fundamentals, covering supervised and unsupervised learning, neural networks, and practical applications in industry.",
    topics: ["Machine Learning", "AI", "Neural Networks"],
    size: "2.4 MB",
  },
  {
    id: "2", 
    title: "React Hooks Deep Dive",
    uploadDate: "2024-03-12",
    fileType: "PDF",
    summary: "Advanced concepts in React Hooks including useState, useEffect, useContext, and custom hooks with practical examples.",
    topics: ["React", "JavaScript", "Frontend"],
    size: "1.8 MB",
  },
  {
    id: "3",
    title: "Database Design Principles",
    uploadDate: "2024-03-10",
    fileType: "DOCX",
    summary: "Core principles of relational database design, normalization, indexing strategies, and performance optimization techniques.",
    topics: ["Database", "SQL", "Backend"],
    size: "3.1 MB",
  },
];

export const dummyQuizzes = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    questions: 10,
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    topic: "Machine Learning",
    completed: false,
    questions_list: [
      {
        id: "q1",
        question: "What is supervised learning?",
        options: [
          "Learning with labeled training data",
          "Learning without any data",
          "Learning with unlabeled data only",
          "Learning through trial and error"
        ],
        correctAnswer: 0,
      },
      {
        id: "q2", 
        question: "Which algorithm is commonly used for classification?",
        options: [
          "Linear Regression",
          "Decision Trees",
          "K-Means",
          "PCA"
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "2",
    title: "React Hooks Quiz",
    questions: 8,
    difficulty: "Beginner",
    estimatedTime: "10 min", 
    topic: "React",
    completed: true,
    score: 85,
    questions_list: [
      {
        id: "q1",
        question: "What hook is used for managing state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
      },
    ],
  },
];

export const dummyFlashcards = [
  {
    id: "1",
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces, particularly web applications with reusable components.",
    topic: "React",
    difficulty: "Beginner",
  },
  {
    id: "2", 
    question: "Explain useState hook",
    answer: "A React Hook that lets you add state to functional components. It returns an array with the current state value and a setter function.",
    topic: "React",
    difficulty: "Intermediate",
  },
  {
    id: "3",
    question: "What is machine learning?",
    answer: "A subset of AI that enables computers to learn and make decisions from data without being explicitly programmed for every scenario.",
    topic: "Machine Learning", 
    difficulty: "Beginner",
  },
  {
    id: "4",
    question: "Define supervised learning",
    answer: "A machine learning approach where the algorithm learns from labeled training data to make predictions on new, unseen data.",
    topic: "Machine Learning",
    difficulty: "Intermediate",
  },
];

export const dummyGraphData = {
  nodes: [
    { id: "react", label: "React", type: "framework", x: 100, y: 100 },
    { id: "hooks", label: "React Hooks", type: "concept", x: 200, y: 150 },
    { id: "state", label: "State Management", type: "concept", x: 300, y: 100 },
    { id: "ml", label: "Machine Learning", type: "field", x: 150, y: 250 },
    { id: "supervised", label: "Supervised Learning", type: "concept", x: 250, y: 300 },
    { id: "neural", label: "Neural Networks", type: "algorithm", x: 100, y: 350 },
  ],
  edges: [
    { id: "e1", source: "react", target: "hooks", type: "contains" },
    { id: "e2", source: "hooks", target: "state", type: "manages" },
    { id: "e3", source: "ml", target: "supervised", type: "includes" },
    { id: "e4", source: "ml", target: "neural", type: "includes" },
    { id: "e5", source: "supervised", target: "neural", type: "uses" },
  ],
};

export const dummyAchievements = [
  {
    id: "1",
    title: "First Upload",
    description: "Uploaded your first study material",
    icon: "upload",
    earned: true,
    earnedDate: "2024-03-01",
  },
  {
    id: "2",
    title: "Quiz Master", 
    description: "Completed 5 quizzes with 80%+ score",
    icon: "trophy",
    earned: true,
    earnedDate: "2024-03-10",
  },
  {
    id: "3",
    title: "Study Streak",
    description: "Maintained a 7-day study streak",
    icon: "flame",
    earned: true,
    earnedDate: "2024-03-12",
  },
  {
    id: "4",
    title: "Knowledge Graph Explorer",
    description: "Explore the knowledge graph for 30 minutes",
    icon: "network",
    earned: false,
  },
];

export const dummyProgressData = [
  { name: "Mon", study: 45, quiz: 20 },
  { name: "Tue", study: 30, quiz: 35 },
  { name: "Wed", study: 60, quiz: 15 },
  { name: "Thu", study: 40, quiz: 45 },
  { name: "Fri", study: 55, quiz: 25 },
  { name: "Sat", study: 70, quiz: 30 },
  { name: "Sun", study: 35, quiz: 40 },
];