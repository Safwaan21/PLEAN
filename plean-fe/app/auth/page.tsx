"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Auth() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const user_id = searchParams.get("user_id");
    if (token) {
      // Store token securely
      localStorage.setItem("authToken", token as string);
      localStorage.setItem("user_id", user_id as string);
      window.location.href = "/";
    }
  }, [searchParams]);

  return <div>Authenticating...</div>;
}
