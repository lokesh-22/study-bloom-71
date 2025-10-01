import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
// Update the import path if AuthLayout is located elsewhere, for example:
import { AuthLayout } from "@/components/Sidebar";

// Dummy data (replace with your API data)
const dummyQuizzes = [
  {
    id: "1",
    title: "React Basics",
    questions: 5,
    estimatedTime: "10 min",
    difficulty: "Beginner",
    completed: false,
    score: 0,
    questions_list: [
      {
        question: "What is React?",
        options: ["Library", "Framework", "Language", "Compiler"],
        correctAnswer: 0,
      },
      {
        question: "Which hook manages state?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
      },
    ],
  },
];

const Quizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = selectedQuiz
    ? dummyQuizzes.find((q) => q.id === selectedQuiz)
    : null;

  const handleStartQuiz = (id: string) => {
    setSelectedQuiz(id);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (!quiz) return;
    if (currentQuestion < quiz.questions_list.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      let newScore = 0;
      quiz.questions_list.forEach((q, i) => {
        if (selectedAnswers[i] === q.correctAnswer) newScore++;
      });
      setScore(newScore);
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  if (quiz && !showResults) {
    const progress = ((currentQuestion + 1) / quiz.questions_list.length) * 100;

    return (
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
          <p className="text-sm mb-2">
            Question {currentQuestion + 1} / {quiz.questions_list.length}
          </p>

          <Card className="mb-6">
            <CardContent>
              <p className="text-lg font-medium mb-4">
                {quiz.questions_list[currentQuestion].question}
              </p>
              <div className="space-y-2">
                {quiz.questions_list[currentQuestion].options.map(
                  (option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={
                          selectedAnswers[currentQuestion] === index
                            ? "default"
                            : "outline"
                        }
                        className={`w-full text-left justify-start p-4 h-auto ${
                          selectedAnswers[currentQuestion] === index
                            ? "bg-gradient-primary text-white"
                            : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <span className="mr-3 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </Button>
                    </motion.div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-gradient-primary hover:opacity-90"
            >
              {currentQuestion === quiz.questions_list.length - 1
                ? "Finish"
                : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (quiz && showResults) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <p className="text-lg mb-2">
          You scored {score} / {quiz.questions_list.length}
        </p>
        <Button onClick={() => setSelectedQuiz(null)}>Back to Quizzes</Button>
      </div>
    );
  }

  return (
  <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Quizzes</h1>
        <p className="text-muted-foreground">
          Test your knowledge with AI-generated quizzes from your study
          materials.
        </p>
      </div>

      {/* Quizzes Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {dummyQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  {quiz.completed && (
                    <div className="flex items-center text-success">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">{quiz.score}%</span>
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <CardDescription>
                  {quiz.questions} questions • {quiz.estimatedTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {quiz.estimatedTime}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        quiz.difficulty === "Beginner"
                          ? "bg-success/20 text-success"
                          : quiz.difficulty === "Intermediate"
                          ? "bg-warning/20 text-warning"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                  </div>
                  <div>
                    <Button
                      className="w-full bg-gradient-primary hover:opacity-90"
                      onClick={() => handleStartQuiz(quiz.id)}
                    >
                      {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Quizzes;
