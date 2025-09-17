import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { dummyQuizzes } from "@/data/dummy-data";
import { Brain, Clock, Trophy, CheckCircle, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Quizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = selectedQuiz ? dummyQuizzes.find(q => q.id === selectedQuiz) : null;

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions_list.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and show results
      let correct = 0;
      quiz?.questions_list.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correct++;
        }
      });
      const finalScore = Math.round((correct / (quiz?.questions_list.length || 1)) * 100);
      setScore(finalScore);
      setShowResults(true);
      
      // Confetti effect simulation with toast
      toast({
        title: `Quiz completed! 🎉`,
        description: `You scored ${finalScore}% (${correct}/${quiz?.questions_list.length} correct)`,
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  if (showResults && quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isAuthenticated />
        <Sidebar />
        
        <div className="ml-64 pt-16">
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <Card className="p-8 bg-gradient-secondary">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
                <div className="text-6xl font-bold text-primary mb-2">{score}%</div>
                <p className="text-muted-foreground mb-6">
                  You answered {selectedAnswers.filter((answer, index) => 
                    answer === quiz.questions_list[index]?.correctAnswer
                  ).length} out of {quiz.questions_list.length} questions correctly
                </p>
                
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => handleStartQuiz(quiz.id)} variant="outline">
                    Retake Quiz
                  </Button>
                  <Button onClick={resetQuiz} className="bg-gradient-primary hover:opacity-90">
                    Back to Quizzes
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuiz && quiz) {
    const currentQ = quiz.questions_list[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions_list.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <Navbar isAuthenticated />
        <Sidebar />
        
        <div className="ml-64 pt-16">
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              {/* Quiz Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">{quiz.title}</h1>
                  <Button variant="ghost" onClick={resetQuiz}>
                    Exit Quiz
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Question {currentQuestion + 1} of {quiz.questions_list.length}</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-xl">{currentQ.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {currentQ.options.map((option, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                            className={`w-full text-left justify-start p-4 h-auto ${
                              selectedAnswers[currentQuestion] === index 
                                ? 'bg-gradient-primary text-white' 
                                : ''
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                          >
                            <span className="mr-3 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                          </Button>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  {currentQuestion === quiz.questions_list.length - 1 ? "Finish" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <Sidebar />
      
      <div className="ml-64 pt-16">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Quizzes</h1>
            <p className="text-muted-foreground">
              Test your knowledge with AI-generated quizzes from your study materials.
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
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          quiz.difficulty === 'Beginner' 
                            ? 'bg-success/20 text-success' 
                            : quiz.difficulty === 'Intermediate'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-destructive/20 text-destructive'
                        }`}>
                          {quiz.difficulty}
                        </span>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          className="w-full bg-gradient-primary hover:opacity-90"
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;