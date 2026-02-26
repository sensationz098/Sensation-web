"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import LoadingShield from "@/components/ui/LoadingShield";
import { getProfile } from "./actions/getProfile";

const page = () => {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    const checkUser = async () => {
      if (user?.uid) {
        await getProfile(user.uid, router);
      }
    };
    checkUser();
  }, [user]);
  return (
    <div>
      <LoadingShield />
    </div>
  );
};

export default page;
