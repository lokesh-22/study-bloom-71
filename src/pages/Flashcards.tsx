import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { dummyFlashcards } from "@/data/dummy-data";
import { Zap, RotateCcw, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(dummyFlashcards);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % shuffledCards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentCard((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length);
    setIsFlipped(false);
  };

  const handleShuffle = () => {
    const shuffled = [...dummyFlashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCard(0);
    setIsFlipped(false);
    toast({
      title: "Cards shuffled!",
      description: "Flashcards have been randomized for better learning.",
    });
  };

  const startStudySession = () => {
    setStudyMode(true);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const endStudySession = () => {
    setStudyMode(false);
    toast({
      title: "Study session complete!",
      description: "Great job reviewing your flashcards. Keep up the good work!",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success/20 text-success';
      case 'Intermediate':
        return 'bg-warning/20 text-warning';
      case 'Advanced':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const currentFlashcard = shuffledCards[currentCard];

  if (studyMode) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isAuthenticated />
        <Sidebar />
        
        <div className="ml-64 pt-16">
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              {/* Study Mode Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold">Study Session</h1>
                  <p className="text-muted-foreground">
                    Card {currentCard + 1} of {shuffledCards.length}
                  </p>
                </div>
                <Button variant="outline" onClick={endStudySession}>
                  End Session
                </Button>
              </div>

              {/* Flashcard */}
              <motion.div 
                className="relative h-96 mb-8 perspective-1000"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentCard}-${isFlipped}`}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                    onClick={handleFlip}
                  >
                    <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-secondary">
                      <CardContent className="h-full flex flex-col justify-center items-center p-8 text-center">
                        <div className="mb-4">
                          <Badge className={getDifficultyColor(currentFlashcard.difficulty)}>
                            {currentFlashcard.difficulty}
                          </Badge>
                          <Badge variant="outline" className="ml-2">
                            {currentFlashcard.topic}
                          </Badge>
                        </div>
                        
                        <div className="flex-1 flex items-center justify-center">
                          <div className="space-y-4">
                            <h2 className="text-sm text-muted-foreground uppercase tracking-wide">
                              {isFlipped ? 'Answer' : 'Question'}
                            </h2>
                            <p className="text-xl font-medium leading-relaxed max-w-2xl">
                              {isFlipped ? currentFlashcard.answer : currentFlashcard.question}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          Click to {isFlipped ? 'see question' : 'reveal answer'}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentCard === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  onClick={handleFlip}
                  className="px-6"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Flip Card
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={currentCard === shuffledCards.length - 1}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Flashcards</h1>
            <p className="text-muted-foreground">
              Review key concepts with interactive flashcards generated from your notes.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              onClick={startStudySession}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Study Session
            </Button>
            <Button variant="outline" onClick={handleShuffle}>
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle Cards
            </Button>
          </div>

          {/* Flashcards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {shuffledCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => {
                  setCurrentCard(index);
                  startStudySession();
                }}
              >
                <Card className="h-64 cursor-pointer hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="h-full p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={getDifficultyColor(card.difficulty)}>
                        {card.difficulty}
                      </Badge>
                      <Badge variant="outline">{card.topic}</Badge>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center text-center">
                      <p className="text-sm font-medium line-clamp-4 group-hover:text-primary transition-colors">
                        {card.question}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-center pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-muted-foreground">Click to study</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {shuffledCards.length}
                </h3>
                <p className="text-muted-foreground">Total Cards</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-success mb-2">
                  {shuffledCards.filter(card => card.difficulty === 'Beginner').length}
                </h3>
                <p className="text-muted-foreground">Beginner Level</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-warning mb-2">
                  {shuffledCards.filter(card => card.difficulty === 'Intermediate').length}
                </h3>
                <p className="text-muted-foreground">Intermediate Level</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;