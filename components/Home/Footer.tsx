"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 mb-20">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/20 bg-white/5 backdrop-blur-lg shadow-xl px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-primary flex items-center justify-center text-white font-bold text-xs">
                N
              </div>
              <span className="font-bold text-lg tracking-tight">
                Sensationz<span className="text-primary"> Performing Arts</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering your digital journey through expert-led courses and
              premium web design services.
            </p>
            <div className="flex gap-4 pt-2">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Explore</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-primary transition-colors"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  Web Design
                </Link>
              </li>
              <li>
                <Link
                  href="/graphic-design"
                  className="hover:text-primary transition-colors"
                >
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Resource Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/help"
                  className="hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold mb-6 text-foreground">Get in Touch</h4>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mt-0.5 text-primary" />
              <span>support@sensationzperformingarts.com</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 text-primary" />
              <span>Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            © {currentYear} Sensationz Performing Arts. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span>Built with Next.js</span>
            <span>Secured by Firebase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
