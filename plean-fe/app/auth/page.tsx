"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Auth() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // Store token securely
      localStorage.setItem("authToken", token as string);
      window.location.href = "/";
    }
  }, [searchParams]);

  return <div>Authenticating...</div>;
}
