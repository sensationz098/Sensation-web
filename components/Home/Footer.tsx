"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const brandOrange = "#DC8916";

  return (
    <footer className="w-full mt-20">
      {/* Container with Glassmorphism */}
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/20 bg-white/5 backdrop-blur-lg shadow-xl px-8 py-12">
        {/* Grid adjusted to 3 columns since Explore is removed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
                style={{ backgroundColor: brandOrange }}
              >
                S
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                Sensationz
                <span style={{ color: brandOrange }}> Performing Arts</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Empowering your artistic journey through world-class performing
              arts training and digital creative excellence.
            </p>
            <div className="flex gap-4 pt-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-[#DC8916] cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-[#DC8916] cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-[#DC8916] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Support Section */}
          <div className="md:pl-12">
            <h4 className="font-semibold mb-6 text-foreground tracking-wide">
              Support
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/help"
                  className="hover:text-[#DC8916] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#DC8916] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#DC8916] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#DC8916] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-6">
            <h4 className="font-semibold mb-2 text-foreground tracking-wide">
              Get in Touch
            </h4>
            <div className="flex items-start gap-3 text-sm text-muted-foreground group">
              <div className=" rounded-full bg-white/5 group-hover:bg-[#DC8916]/10 transition-colors">
                <Mail className="h-4 w-4 text-[#DC8916]" />
              </div>
              <span className="">support@sensationzperformingarts.com</span>
            </div>
            <div className="flex items-start  text-sm text-muted-foreground group">
              <div className="pr-2 rounded-full bg-white/5 group-hover:bg-[#DC8916]/10 transition-colors">
                <MapPin className="h-4 w-4 text-[#DC8916]" />
              </div>
              <span className="">Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            © {currentYear} Sensationz Performing Arts. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <span className="hover:text-foreground transition-colors cursor-default">
              Built with ❤️
            </span>
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <span className="hover:text-foreground transition-colors cursor-default">
              Secured by Firebase
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
