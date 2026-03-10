"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ChevronRight,
  Star,
  Mail,
  User as UserIcon,
  LogOut,
  X,
  TrendingUp,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import getProfileId from "@/lib/user/getProfileId";
import getLoyaltyPoints from "@/lib/user/getLoyaltyPoints";
import { LoyaltyPointsObject } from "@/types/LoyaltyPoints";
import { menuItems } from "@/data/menuItems";

export const StudentProfile = () => {
  const { user, logout } = useAuth();
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const brandOrange = "#DC8916";
  const [loyaltyPoints, setLoyaltyPoints] =
    useState<LoyaltyPointsObject | null>(null);

  useEffect(() => {
    const getDetails = async () => {
      if (!user?.uid) return;
      const userId = await getProfileId(user?.uid);
      const loyalty_points = await getLoyaltyPoints(userId);
      setLoyaltyPoints(loyalty_points);
    };
    getDetails();
  }, [user?.uid]);

  if (!user)
    return (
      <div className="p-20 text-center text-zinc-500 animate-pulse">
        Loading...
      </div>
    );

  const name = user?.displayName || "";
  const avatar_url = user?.photoURL;
  const email = user?.email || "";

  return (
    <main className="min-h-screen text-slate-900 px-4 md:px-8 relative overflow-hidden pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DC8916]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-12 mt-10">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900">
            MY <span style={{ color: brandOrange }}>PROFILE</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Manage your account, track points, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PROFILE CARD */}
          <div className="lg:col-span-4 rounded-[3rem] border border-white bg-white/70 backdrop-blur-2xl p-8 shadow-2xl shadow-slate-200/60 transition-all hover:shadow-slate-300/50">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div
                  className="h-32 w-32 rounded-full border-4 p-1 shadow-inner transition-transform hover:scale-105"
                  style={{ borderColor: brandOrange }}
                >
                  <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 relative">
                    {avatar_url ? (
                      <Image
                        fill
                        src={avatar_url}
                        alt={name || "User Profile"}
                        className="object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;
                        }}
                      />
                    ) : (
                      <UserIcon size={48} className="text-slate-300" />
                    )}
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                {name}
              </h2>
              <div className="flex items-center gap-2 text-slate-400 text-sm mt-1 mb-8">
                <Mail size={14} />
                {email}
              </div>

              {/* Loyalty Card - Interactive Trigger */}
              <button
                onClick={() => setIsPointsModalOpen(true)}
                className="w-full bg-gradient-to-br from-[#DC8916] to-[#bf730d] rounded-[2.5rem] p-6 text-white shadow-lg shadow-[#DC8916]/30 transition-all active:scale-95 hover:brightness-110 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                  <Star size={80} fill="white" />
                </div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                    <Star size={22} fill="white" stroke="white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-80">
                      Total Points
                    </p>
                    <p className="text-3xl font-black tabular-nums">
                      {loyaltyPoints ? loyaltyPoints.total : 0}
                    </p>
                  </div>
                  <div className="ml-auto bg-white/10 p-2 rounded-full">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </button>

              <Button
                variant="ghost"
                onClick={logout}
                className="mt-8 w-full rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} className="mr-2" /> Sign Out
              </Button>
            </div>
          </div>

          {/* MENU ITEMS */}
          <div className="lg:col-span-8 space-y-4">
            {menuItems.map((item, i) => (
              <Link key={i} href={item.link}>
                <div className="cursor-pointer w-full flex items-center justify-between p-6 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#DC8916]/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* LOYALTY POINTS MODAL */}
      {isPointsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsPointsModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-[#DC8916] p-10 text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingUp size={120} />
              </div>
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">
                    Point Wallet
                  </h2>
                  <p className="text-white/80 font-bold mt-1">
                    Total Balance: {loyaltyPoints?.total || 0} pts
                  </p>
                </div>
                <button
                  onClick={() => setIsPointsModalOpen(false)}
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Points History List */}
            <div className="p-8 max-h-[50vh] overflow-y-auto space-y-4 custom-scrollbar">
              {loyaltyPoints?.points && loyaltyPoints.points.length > 0 ? (
                loyaltyPoints.points.map((p, i) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                          p.status === "CREDIT"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {p.status === "CREDIT" ? "+" : "-"}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                          {new Date(p.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                          <Receipt size={12} />
                          <span>
                            REF: {p.receipt_id.slice(-8).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-2xl font-black ${p.status === "CREDIT" ? "text-green-600" : "text-red-600"}`}
                      >
                        {p.points}
                      </p>
                      <p className="text-[10px] font-black text-slate-300 uppercase">
                        Points
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <Star size={30} className="text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-bold italic">
                    No point transactions yet.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setIsPointsModalOpen(false)}
                className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
