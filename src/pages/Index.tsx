import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Brain, 
  Zap, 
  Network, 
  Target, 
  Trophy,
  ArrowRight,
  Upload,
  MessageSquare,
  Users
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: "Notes Upload",
      description: "Upload PDFs, documents, and images. AI automatically extracts key concepts and generates summaries.",
      color: "text-primary",
    },
    {
      icon: Brain,
      title: "Quiz Generator", 
      description: "AI creates personalized quizzes from your study materials with adaptive difficulty levels.",
      color: "text-success",
    },
    {
      icon: Network,
      title: "Knowledge Graph",
      description: "Visualize connections between concepts and discover new learning pathways.",
      color: "text-warning",
    },
    {
      icon: Target,
      title: "Personalized Learning Path",
      description: "Get customized study recommendations based on your progress and learning style.",
      color: "text-destructive",
    },
    {
      icon: Zap,
      title: "Smart Flashcards",
      description: "Interactive flashcards with spaced repetition algorithms for optimal retention.",
      color: "text-primary",
    },
    {
      icon: Trophy,
      title: "Gamification",
      description: "Earn points, maintain streaks, and unlock achievements as you learn.",
      color: "text-success",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      content: "Learning Hub transformed how I study. The AI-generated quizzes helped me ace my machine learning course!",
      avatar: "/placeholder.svg"
    },
    {
      name: "Mike Rodriguez", 
      role: "Medical Student",
      content: "The knowledge graph feature is incredible. It shows connections I never would have made on my own.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Emily Johnson",
      role: "Data Science Bootcamp",
      content: "The personalized learning paths keep me motivated and on track. Best study tool I've ever used!",
      avatar: "/placeholder.svg"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 hero-gradient">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="float">
              <div className="w-20 h-20 mx-auto mb-8 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your AI-powered
              <br />
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                study companion
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your learning with AI that understands your materials, creates personalized quizzes, 
              and builds knowledge graphs to accelerate your academic success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold animate-bounce-gentle"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Everything you need to excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive tools for modern learners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 gradient-border">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 ${feature.color}`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              How Learning Hub works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to supercharge your learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Your Materials",
                description: "Upload PDFs, notes, presentations, or any study materials. Our AI processes them instantly.",
                icon: Upload,
              },
              {
                step: "02", 
                title: "AI Analysis & Generation",
                description: "Advanced AI extracts key concepts, generates quizzes, and creates knowledge connections.",
                icon: Brain,
              },
              {
                step: "03",
                title: "Personalized Learning",
                description: "Get customized study paths, track progress, and achieve your learning goals faster.",
                icon: Target,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Loved by students worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners who have transformed their study habits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-secondary">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to transform your learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of students who are already achieving better results with AI-powered studying
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 px-8 py-4 text-lg font-semibold pulse-glow"
              >
                Start Learning Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Learning Hub</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Your AI-powered study companion for academic success
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 Learning Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
