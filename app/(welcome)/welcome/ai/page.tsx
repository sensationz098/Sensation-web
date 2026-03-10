"use client";
import { useEffect, useState } from "react";

const page = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchAiResponse = async () => {
      const response = await fetch("/api/ai", {
        method: "POST",
      }).then((res) => res.json());
      console.log("PRINTING AI RESPONSE", response.message);
      setMessage(response.message);
    };
    fetchAiResponse();
  }, []);
  return <div>{message}</div>;
};

export default page;
