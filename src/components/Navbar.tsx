import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export const Navbar = ({ isAuthenticated = false }: NavbarProps) => {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (token) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/";
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" onClick={handleLogoClick} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Learning Hub</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/notes"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Notes
                </Link>
                <Link
                  to="/quizzes"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Quizzes
                </Link>
                <Link
                  to="/flashcards"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Flashcards
                </Link>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};