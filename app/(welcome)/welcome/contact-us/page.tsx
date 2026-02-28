"use client";

import React from "react";
import Image from "next/image";
import {
  PhoneCall,
  MessageSquare,
  Mail,
  Headphones,
  User,
  ExternalLink,
} from "lucide-react";

// Your brand color
const brandOrange = "#DC8916";

const contacts = [
  {
    id: "1",
    name: "Ruchi Phawa",
    designation: "General Manager",
    phone: "+918800348485",
    whatsapp: "918800348485",
  },
  {
    id: "2",
    name: "Rachna Sharma",
    designation: "Receptionist",
    phone: "+918826057446",
    whatsapp: "918826057446",
  },
  {
    id: "3",
    name: "Sudhesh",
    designation: "Receptionist",
    phone: "+918810582411",
    whatsapp: "918810582411",
  },
];

export default function HelpSupportPage() {
  const emailUrl =
    "mailto:support@sensationzperformingarts.com?subject=Help and Support&body=Hello, I need assistance with...";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative Mesh Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DC8916]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-12 pb-6 border-b-2 border-[#DC8916]/20">
          <div className="p-3 bg-white rounded-2xl shadow-sm">
            <Headphones size={28} style={{ color: brandOrange }} />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
            Help & <span style={{ color: brandOrange }}>Support</span>
          </h1>
        </div>

        {/* Intro Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative w-32 h-32 rounded-full bg-white shadow-xl shadow-slate-200 p-1 border-4 border-[#DC8916]/30 overflow-hidden flex items-center justify-center mb-6">
            {/* If you have the logo file, use Next.js Image component */}
            <span className="font-black text-6xl text-[#DC8916] italic">S</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            Need Help? Contact Us
          </h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            We're here to help! Reach out to our support team for quick
            assistance regarding your courses or account.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {contact.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                    {contact.designation}
                  </p>
                </div>
                <div className="p-2 bg-slate-50 rounded-full">
                  <User size={20} className="text-slate-300" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Call Link */}
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm transition-transform active:scale-95 shadow-lg shadow-[#DC8916]/20"
                  style={{ backgroundColor: brandOrange }}
                >
                  <PhoneCall size={16} />
                  Call Now
                </a>

                {/* WhatsApp Link */}
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hello, I need support regarding a course.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366] text-white font-bold text-sm transition-transform active:scale-95 shadow-lg shadow-green-500/20"
                >
                  <MessageSquare size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          ))}

          {/* Email Support Banner */}
          <a
            href={emailUrl}
            className="md:col-span-2 group flex items-center justify-center gap-4 p-6 rounded-[2.5rem] border-2 border-dashed border-[#DC8916]/30 bg-[#DC8916]/5 hover:bg-[#DC8916]/10 transition-all active:scale-[0.99]"
          >
            <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
              <Mail size={24} style={{ color: brandOrange }} />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-slate-800">
                Email Support
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                Click here to send us a detailed message
              </p>
            </div>
          </a>
        </div>

        {/* Support Hours */}
        <div className="text-center pt-8 border-t border-slate-200">
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-300 font-bold">
            Support Available: 10:00 AM - 7:00 PM IST
          </p>
        </div>
      </div>
    </main>
  );
}
