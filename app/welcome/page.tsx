"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function page() {
  const { logout } = useAuth();
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
