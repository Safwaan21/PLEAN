import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoginloading, setIsLoginloading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // In the future, check that the token is actually valid for allowing search
    // Assumption right now is that API will authenticate users
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/");
    }
    setIsLoginloading(false);
  }, [router]);

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/");
  };

  return { isAuthenticated, isLoginloading, logout };
}
