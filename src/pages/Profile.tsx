import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { dummyUser, dummyAchievements } from "@/data/dummy-data";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { 
  User, 
  Mail, 
  Calendar,
  Trophy,
  Flame,
  Target,
  BookOpen,
  Brain,
  Zap,
  TrendingUp,
  Settings
} from "lucide-react";

const Profile = () => {
  const progressData = [
    { name: 'Week 1', study: 20 },
    { name: 'Week 2', study: 35 },
    { name: 'Week 3', study: 45 },
    { name: 'Week 4', study: 60 },
    { name: 'Week 5', study: 55 },
    { name: 'Week 6', study: 70 },
  ];

  const skillsData = [
    { name: 'Machine Learning', value: 75, color: 'hsl(var(--primary))' },
    { name: 'React', value: 60, color: 'hsl(var(--success))' },
    { name: 'Database', value: 45, color: 'hsl(var(--warning))' },
    { name: 'Algorithms', value: 30, color: 'hsl(var(--destructive))' },
  ];

  const stats = [
    {
      title: "Total Points",
      value: dummyUser.totalPoints.toString(),
      icon: Trophy,
      color: "text-warning",
    },
    {
      title: "Current Streak",
      value: `${dummyUser.streak} days`,
      icon: Flame,
      color: "text-destructive",
    },
    {
      title: "Notes Uploaded",
      value: "12",
      icon: BookOpen,
      color: "text-primary",
    },
    {
      title: "Quizzes Completed",
      value: "8",
      icon: Brain,
      color: "text-success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <Sidebar />
      
      <div className="ml-64 pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and track your learning progress.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* User Card */}
              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-xl">{dummyUser.name}</CardTitle>
                  <CardDescription>{dummyUser.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Joined
                    </span>
                    <span>{dummyUser.joinDate}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                          <stat.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{stat.title}</span>
                      </div>
                      <span className="font-bold">{stat.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your study activity over the past 6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Area
                        type="monotone"
                        dataKey="study"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Skills Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Levels</CardTitle>
                    <CardDescription>Your proficiency in different topics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skillsData.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="text-muted-foreground">{skill.value}%</span>
                        </div>
                        <Progress value={skill.value} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Study Distribution</CardTitle>
                    <CardDescription>Time spent on different topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={skillsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {skillsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      {skillsData.map((skill, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: skill.color }}
                          />
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Badges and milestones you've unlocked</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dummyAchievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          achievement.earned
                            ? 'border-primary bg-primary/5'
                            : 'border-muted bg-muted/20'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            achievement.earned
                              ? 'bg-gradient-primary'
                              : 'bg-muted'
                          }`}>
                            {achievement.icon === 'upload' && <BookOpen className="w-6 h-6 text-white" />}
                            {achievement.icon === 'trophy' && <Trophy className="w-6 h-6 text-white" />}
                            {achievement.icon === 'flame' && <Flame className="w-6 h-6 text-white" />}
                            {achievement.icon === 'network' && <TrendingUp className="w-6 h-6 text-white" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            {achievement.earned && (
                              <Badge variant="secondary" className="mt-1">
                                Earned {achievement.earnedDate}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={dummyUser.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={dummyUser.email} />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-gradient-primary hover:opacity-90">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;