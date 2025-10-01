import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Brain,
  Zap,
  Network,
  User,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

import React from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Notes",
    href: "/notes", 
    icon: FileText,
  },
  {
    name: "Quizzes",
    href: "/quizzes",
    icon: Brain,
  },
  {
    name: "Flashcards",
    href: "/flashcards",
    icon: Zap,
  },
  {
    name: "Knowledge Graph",
    href: "/graph",
    icon: Network,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

import { Outlet } from "react-router-dom";
export const AuthLayout = () => (
  <div className="min-h-screen flex">
    <Sidebar />
    <div className="flex-1 ml-64">
      <Outlet />
    </div>
  </div>
);

export const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
  className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border overflow-y-auto"
    >
      <div className="p-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2 mb-8 focus:outline-none">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">Learning Hub</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-primary text-white shadow-lg"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-secondary rounded-xl">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Study Progress
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">This Week</span>
              <span className="font-medium">12h 30m</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: '75%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};