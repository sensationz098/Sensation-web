"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import LoadingShield from "@/components/ui/LoadingShield";

const page = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const response = await axios.post(
        "http://localhost:5000/api/auth/get-profile",
        {
          id: user?.uid,
        },
      );

      if (response.data.status) {
        router.push("/welcome");
      } else {
        router.push("/onobarding/details");
      }
    };
    checkUser();
  }, []);
  return (
    <div>
      <LoadingShield />
    </div>
  );
};

export default page;
