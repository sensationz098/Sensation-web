"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, BookOpen, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-4 inset-x-0 z-50 mx-auto w-[95%] max-w-7xl">
      <nav className="flex items-center justify-between px-6 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-white/40">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-indigo-500/50 shadow-sm group-hover:scale-110 transition-transform">
            N
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground/90">
            Sensationz<span className="text-primary">Performing Arts</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Enrolled Courses
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <User className="h-4 w-4" />
            My Profile
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="cursor-pointer text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button
              size="sm"
              className="rounded-full px-6 shadow-md hover:shadow-primary/20"
            >
              Get Started
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
