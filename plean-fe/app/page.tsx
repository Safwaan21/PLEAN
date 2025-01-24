"use client";

import SearchBar from "@/components/SearchBar";
import { DarkMode } from "@/components/DarkMode";
import LoadingLines from "@/components/LoadingLines";
import SearchResult from "@/components/SearchResult";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";
export type Result = {
  name: string;
  link: string;
  type: string;
  owner: string;
  owner_photo: string;
  description: string;
  modified_date: Date;
};

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Array<Result>>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    if (!query) {
      return;
    }
    setResults([]);
    setLoading(true);

    // fetch results
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/search?q=${query}`);
        if (!res.ok) {
          console.log("Error fetching data: ", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, isAuthenticated]);

  if (!isAuthenticated) {
    return <Button onClick={handleGoogleLoginClick}>Google Login</Button>;
  }
  async function handleGoogleLoginClick() {
    try {
      const response = await fetch("http://localhost:8000/auth/google");
      if (!response.ok) {
        console.log("Error fetching data: ", response.statusText);
      }
      const data = await response.json();
      window.location.href = data["auth_uri"] as string;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <div className="m-5">
      <div className="flex justify-between w-full">
        <SearchBar setQuery={setQuery} />
        <DarkMode />
      </div>
      <Button onClick={logout}>Logout</Button>
      {loading && <LoadingLines />}
      <div className="flex-col mt-[80px]">
        {results.map((result, index) => (
          <SearchResult key={index} result={result} />
        ))}
      </div>
    </div>
  );
}
