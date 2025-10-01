import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
// ...existing code...
import { useUser } from "../context/UserContext";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { User, Trophy, Settings, BookOpen, Flame, TrendingUp } from "lucide-react";
import { dummyAchievements } from "@/data/dummy-data";

const Profile = () => {
  const { user } = useUser();
  // Ensure user_id is always a valid integer for queries
  const userId = typeof user?.id === "number" ? user.id : null;

  const progressData = [
    { name: "Week 1", study: 20 },
    { name: "Week 2", study: 35 },
    { name: "Week 3", study: 45 },
    { name: "Week 4", study: 60 },
    { name: "Week 5", study: 55 },
    { name: "Week 6", study: 70 },
  ];

  const skillsData = [
    { name: "Machine Learning", value: 75, color: "hsl(var(--primary))" },
    { name: "React", value: 60, color: "hsl(var(--success))" },
    { name: "Database", value: 45, color: "hsl(var(--warning))" },
    { name: "Algorithms", value: 30, color: "hsl(var(--destructive))" },
  ];

  const stats = [
    {
      title: "User ID",
      value: user?.id || "-",
      icon: User,
      color: "text-primary",
    },
    {
      title: "Username",
      value: user?.username || "-",
      icon: User,
      color: "text-success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and track your learning progress.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-xl">{user?.name || "User"}</CardTitle>
                  <CardDescription>{user?.email || "user@example.com"}</CardDescription>
                  <div className="mt-2 text-sm text-muted-foreground">Username: {user?.username || "-"}</div>
                  <div className="mt-2 text-sm text-muted-foreground">User ID: {userId !== null ? userId : "-"}</div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full mt-2"
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/login";
                    }}
                  >
                    Logout
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
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Learning Progress */}
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

              {/* Skill Levels + Study Distribution */}
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
                            ? "border-primary bg-primary/5"
                            : "border-muted bg-muted/20"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              achievement.earned ? "bg-gradient-primary" : "bg-muted"
                            }`}
                          >
                            {achievement.icon === "upload" && <BookOpen className="w-6 h-6 text-white" />}
                            {achievement.icon === "trophy" && <Trophy className="w-6 h-6 text-white" />}
                            {achievement.icon === "flame" && <Flame className="w-6 h-6 text-white" />}
                            {achievement.icon === "network" && <TrendingUp className="w-6 h-6 text-white" />}
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
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
