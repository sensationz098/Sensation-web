"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
// Using lucide-react to match your web profile page icons
import {
  Globe,
  Instagram,
  Youtube,
  Linkedin,
  Info,
  ExternalLink,
} from "lucide-react";

// Your brand color
const brandOrange = "#DC8916";

const company = {
  name: "Sensationz Media & Arts",
  description:
    "Sensationz Media and Arts Pvt. Ltd. is a leading online platform dedicated to nurturing creativity through expert-led virtual classes in Dance, Yoga, Fitness, and Music. Since 2007, we've been empowering learners across all 28 Indian states and 18+ countries worldwide with high-quality training, flexible learning options, and performance opportunities — all from the comfort of your home. With live sessions, recorded demos, and certified instructors, Sensationz helps you build confidence, skill, and global recognition.",
  // Assuming you use the same logo asset
  logo: "/logo-new.png",
};

const socials = [
  {
    id: "1",
    name: "Website",
    icon: <Globe size={22} className="text-[#F4991A]" />,
    url: "https://sensationzperformingarts.com/",
  },
  {
    id: "2",
    name: "Website Global",
    icon: <Globe size={22} className="text-[#F4991A]" />,
    url: "https://global.sensationzperformingarts.com/",
  },
  {
    id: "3",
    name: "Instagram",
    icon: <Instagram size={22} className="text-[#E1306C]" />,
    url: "https://www.instagram.com/sensationz_performing_arts/",
  },
  {
    id: "4",
    name: "Instagram Global",
    icon: <Instagram size={22} className="text-[#E1306C]" />,
    url: "https://www.instagram.com/global_sensationz/",
  },
  {
    id: "5",
    name: "YouTube",
    icon: <Youtube size={22} className="text-[#FF0000]" />,
    url: "https://www.youtube.com/@SensationzDanceAndMusic",
  },
  {
    id: "6",
    name: "LinkedIn",
    icon: <Linkedin size={22} className="text-[#0077B5]" />,
    url: "https://www.linkedin.com/company/sensationz-performing-arts/",
  },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DC8916]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-12 pb-6 border-b-2 border-[#DC8916]/20">
          <div className="p-3 bg-white rounded-2xl shadow-sm">
            <Info size={28} style={{ color: brandOrange }} />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            About <span style={{ color: brandOrange }}>Us</span>
          </h1>
        </div>

        {/* Company Info Card */}
        <section className="flex flex-col items-center text-center mb-16 space-y-8">
          {/* Logo Container */}
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-white shadow-xl shadow-slate-200 p-1 border-4 border-[#DC8916]/30 overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Sensationz Logo"
                fill
                className="object-contain" // This ensures the logo isn't stretched
              />
              {/* <div className="font-black text-6xl text-[#DC8916] italic">S</div> */}
            </div>
          </div>

          <div className="space-y-4 px-4">
            <h2 className="text-3xl font-bold text-slate-800">
              {company.name}
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
              {company.description}
            </p>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold px-2 text-slate-700">
            Connect With Us
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socials.map((social) => (
              <Link
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#DC8916]/30 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <span className="font-bold text-slate-700 group-hover:text-[#DC8916] transition-colors">
                    {social.name}
                  </span>
                </div>
                <ExternalLink
                  size={18}
                  className="text-slate-300 group-hover:text-[#DC8916] transition-colors"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom Branding */}
        <div className="mt-20 pt-10 border-t border-slate-200 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-300 font-bold">
            ESTD. 2007 • SENSATIONZ MEDIA AND ARTS PVT. LTD.
          </p>
        </div>
      </div>
    </main>
  );
}
