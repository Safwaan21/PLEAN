"use client";

import SearchBar from "../components/SearchBar";
import { DarkMode } from "@/components/DarkMode";
import LoadingLines from "@/components/LoadingLines";
import SearchResult from "@/components/SearchResult";
import { useState, useEffect } from "react";

export type Result = {
  type: string;
  link: string;
  name: string;
  owner: string;
  description: string;
  creation_date: Date;
};

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Array<Result>>([]);
  useEffect(() => {
    if (!query) {
      return;
    }
    setResults([]);
    setLoading(true);

    // fetch results
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/");
        const data = await res.json();
        const newResults = data["search_results"]["results"];
        const newResultsArray = newResults.map(
          (fetchResult: Result) => fetchResult
        );
        setResults(newResultsArray);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className="m-5">
      <div className="flex justify-between w-full">
        <SearchBar setQuery={setQuery} />
        <DarkMode />
      </div>
      {loading && <LoadingLines />}
      <div className="flex-col mt-[80px]">
        {results.map((result, index) => (
          <SearchResult key={index} result={result} />
        ))}
      </div>
    </div>
  );
}
