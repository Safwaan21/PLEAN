"use client";

import SearchBar from "@/components/SearchBar";
import { DarkMode } from "@/components/DarkMode";
import LoadingLines from "@/components/LoadingLines";
import SearchResult from "@/components/SearchResult";
import useAuth from "@/hooks/useAuth";
import { Key, useState } from "react";
import useSearch from "@/hooks/useSearch";
import Login from "@/components/Login";

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
  const { isAuthenticated, isLoginloading } = useAuth();
  const [query, setQuery] = useState<string>("");
  const { loading, results } = useSearch(query, isAuthenticated);

  if (!isAuthenticated && !isLoginloading) {
    return <Login />;
  }

  return (
    <div className="m-5">
      <div className="flex justify-between w-full">
        <SearchBar setQuery={setQuery} />
        <DarkMode />
      </div>
      {loading && <LoadingLines />}
      <div className="flex-col mt-[60px]">
        {results.map((result: Result, index: Key | null | undefined) => (
          <SearchResult key={index} result={result} />
        ))}
      </div>
    </div>
  );
}
