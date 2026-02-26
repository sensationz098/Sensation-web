"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, BookOpen, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, logout } = useAuth();
  const brandOrange = "#DC8916";

  return (
    <header className="fixed top-4 inset-x-0 z-50 mx-auto w-[95%] max-w-7xl">
      <nav className="flex items-center justify-between px-3 md:px-6 py-2 md:py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-white/40">
        {/* Brand Identity - Scaled down for mobile */}
        <Link
          href="/"
          className="flex items-center gap-1.5 md:gap-2 group shrink-0"
        >
          <div
            className="h-7 w-7 md:h-8 md:w-8 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-110 transition-transform text-sm md:text-base"
            style={{
              backgroundColor: brandOrange,
              boxShadow: `0 4px 14px 0 ${brandOrange}40`,
            }}
          >
            S
          </div>
          {/* Hide "Performing Arts" on very small screens to save space */}
          <span className="font-bold text-base md:text-xl tracking-tight text-foreground/90">
            Sensationz<span className="hidden xs:inline"></span>
            <span className="hidden sm:inline" style={{ color: brandOrange }}>
              {" "}
              Performing Arts
            </span>
          </span>
        </Link>

        {/* Navigation Links - Now visible on mobile with smaller gaps */}
        <div className="flex items-center gap-3 md:gap-8">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs md:text-sm font-medium text-foreground/70 hover:text-[#DC8916] transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-1 text-xs md:text-sm font-medium text-foreground/70 hover:text-[#DC8916] transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <Link
            href="/welcome/profile"
            className="flex items-center gap-1 text-xs md:text-sm font-medium text-foreground/70 hover:text-[#DC8916] transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="h-8 px-2 md:px-3 text-xs md:text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-3.5 w-3.5 md:mr-2" />
              <span className="hidden xs:inline">Logout</span>
            </Button>
          ) : (
            <Button
              size="sm"
              className="h-8 rounded-full px-3 md:px-6 text-white text-xs md:text-sm shadow-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: brandOrange }}
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
