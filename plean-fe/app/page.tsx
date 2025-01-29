"use client";

import SearchBar from "@/components/SearchBar";
import { DarkMode } from "@/components/DarkMode";
import LoadingLines from "@/components/LoadingLines";
import SearchResult from "@/components/SearchResult";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import useSearch from "@/hooks/useSearch";
import Login from "@/components/Login";
import { useRouter, useSearchParams } from "next/navigation";
import PersonalInfo from "@/components/PersonalInfo";

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
  const { isAuthenticated, isLoginloading, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>(searchParams.get("query") || "");

  const { loading, results } = useSearch(query, isAuthenticated);

  useEffect(() => {
    // Update the URL query parameter when `query` changes
    const currentQuery = searchParams.get("query");
    if (query !== currentQuery) {
      router.replace(`/?query=${encodeURIComponent(query)}`);
    }
  }, [query, searchParams, router]);

  if (isLoginloading) {
    return null; // Or a loading component
  }

  if (!isAuthenticated && !isLoginloading) {
    return <Login />;
  }

  return (
    <div className="m-5">
      {query && (
        <div className="flex justify-between w-full">
          <div className="flex items-center h-[54px] pr-10 hover:text-purple-800">
            <a href="/" className="">
              Plean
            </a>
          </div>
          <div className="flex gap-[100px] w-full items-center">
            <SearchBar setQuery={setQuery} initialQuery={query} />
          </div>
          <div className="flex gap-4">
            <DarkMode />
            <PersonalInfo logout={logout} />
          </div>
        </div>
      )}
      {!query && (
        <div className="flex flex-col h-full w-full">
          <div className="flex self-end gap-4">
            <DarkMode />
            <PersonalInfo logout={logout} />
          </div>
          <div className="pt-[20%] flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-5 hover:text-purple-800">
              Plean
            </h1>
            <SearchBar setQuery={setQuery} />
          </div>
        </div>
      )}
      {loading && <LoadingLines />}
      <div className="flex-col mt-[60px] pl-[85px]">
        {results.map((result: Result, index) => (
          <SearchResult key={index} result={result} />
        ))}
      </div>
    </div>
  );
}
