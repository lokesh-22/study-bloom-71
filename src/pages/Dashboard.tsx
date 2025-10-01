import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
// ...existing code...
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { dummyNotes, dummyProgressData } from "@/data/dummy-data";
import { useUser } from "../context/UserContext";
import { BookOpen, Brain, Zap, TrendingUp, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const stats = [
    {
      title: "Study Hours",
      value: "24.5h",
      change: "+12%",
      icon: Clock,
      color: "text-primary",
    },
    {
      title: "Notes Uploaded",
      value: dummyNotes.length.toString(),
      change: "+2 this week",
      icon: BookOpen,
      color: "text-success",
    },
    {
      title: "Quizzes Completed",
      value: "8",
      change: "-1 this week",
      icon: Brain,
      color: "text-warning",
    },
    // Remove streak stat since 'streak' is not available in user context
  ];

  return (
    <div className="min-h-screen bg-background">
      <div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.name || user?.username || "User"}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to continue your learning journey? Here's your progress overview.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className={`text-sm ${stat.color}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Progress Chart */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>Your study and quiz activity this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dummyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar 
                        dataKey="study" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="quiz" 
                        fill="hsl(var(--accent))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Path Progress */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Learning Path Progress</CardTitle>
                  <CardDescription>Your progress across different topics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Machine Learning</span>
                      <span className="text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>React Development</span>
                      <span className="text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Database Design</span>
                      <span className="text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Data Structures</span>
                      <span className="text-muted-foreground">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Notes */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Notes</CardTitle>
                    <CardDescription>Your recently uploaded study materials</CardDescription>
                  </div>
                  <Link to="/notes">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dummyNotes.slice(0, 3).map((note, index) => (
                    <div key={note.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{note.title}</h4>
                        <p className="text-xs text-muted-foreground">{note.uploadDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Continue your learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/notes" className="block">
                    <Button className="w-full justify-start bg-gradient-primary hover:opacity-90">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Upload New Notes
                    </Button>
                  </Link>
                  <Link to="/quizzes" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Brain className="w-4 h-4 mr-2" />
                      Take a Quiz
                    </Button>
                  </Link>
                  <Link to="/flashcards" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="w-4 h-4 mr-2" />
                      Review Flashcards
                    </Button>
                  </Link>
                  <Link to="/graph" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Explore Knowledge Graph
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;