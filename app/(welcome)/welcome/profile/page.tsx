"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Settings,
  CreditCard,
  Info,
  PhoneCall,
  ChevronRight,
  Star,
  Camera,
  Mail,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const brandOrange = "#DC8916";

  if (!user)
    return <div className="p-20 text-center text-zinc-500">Loading...</div>;

  const name = user?.displayName || "Deepanshu Pokhriyal";
  const avatar_url = user?.photoURL;
  const email = user?.email || "deepanshu@gmail.com";
  const loyalty_points = 2;
  useEffect(() => {
    console.log(avatar_url);
  }, [avatar_url]);
  const menuItems = [
    {
      icon: <Settings size={20} />,
      label: "Edit Profile",
      desc: "Manage your personal details",
      link: "/welcome/edit-profile",
    },
    {
      icon: <CreditCard size={20} />,
      label: "View Transactions",
      desc: "Check your course purchases",
      link: "/welcome/transactions",
    },
    {
      icon: <Info size={20} />,
      label: "About Us",
      desc: "Learn about Sensationz Performing Arts",
      link: "/welcome/about-us",
    },
    {
      icon: <PhoneCall size={20} />,
      label: "Contact Us",
      desc: "Get in touch with our support team",
      link: "/welcome/contact-us",
    },
  ];

  return (
    // Changed bg-black to a very soft zinc/slate gray
    <main className="min-h-screen  text-slate-900  px-4 md:px-8 relative overflow-hidden">
      {/* 1. SOFT MESH GRADIENT (Keeps the 'Artistic' vibe without the darkness) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DC8916]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900">
            MY <span style={{ color: brandOrange }}>PROFILE</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PROFILE CARD (White Glass) */}
          <div className=" shadow-[-20px_20px_20px_rgba(0,0,0,0.1)] lg:col-span-4 rounded-[3rem] border border-white bg-white/70 backdrop-blur-2xl p-8 shadow-xl shadow-slate-200/50">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div
                  className="h-32 w-32 rounded-full border-4 p-1 shadow-inner"
                  style={{ borderColor: brandOrange }}
                >
                  <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                    {avatar_url ? (
                      <Image
                        fill
                        src={avatar_url}
                        alt={name || "User Profile"}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer" // Essential for Firebase/Google avatars
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://api.dicebear.com/7.x/initials/svg?seed=" +
                            name;
                        }}
                      />
                    ) : (
                      <UserIcon size={48} className="text-slate-300" />
                    )}
                  </div>
                </div>
                <button className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full border border-slate-200 shadow-md hover:scale-110 transition-transform">
                  <Camera size={16} style={{ color: brandOrange }} />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-slate-800">{name}</h2>
              <div className="flex items-center gap-2 text-slate-500 text-sm mt-1 mb-8">
                <Mail size={14} />
                {email}
              </div>

              {/* Loyalty Card (Orange Accent) */}
              <div className="w-full bg-gradient-to-br from-[#DC8916] to-[#bf730d] rounded-[2rem] p-6 text-white shadow-lg shadow-[#DC8916]/30">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-2xl">
                    <Star size={20} fill="white" stroke="white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-80">
                      Loyalty Points
                    </p>
                    <p className="text-3xl font-black">{loyalty_points}</p>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={logout}
                className="mt-8 w-full rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-2" /> Sign Out
              </Button>
            </div>
          </div>

          {/* MENU ITEMS (Light Glass) */}
          <div className="lg:col-span-8 space-y-4">
            {menuItems.map((item, i) => (
              <Link href={item.link}>
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-6 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#DC8916]/40 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:text-[#DC8916] group-hover:bg-[#DC8916]/5 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg text-slate-800">
                        {item.label}
                      </h3>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-slate-300 group-hover:text-[#DC8916] group-hover:translate-x-1 transition-all"
                  />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
