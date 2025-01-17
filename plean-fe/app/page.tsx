"use client";

import SearchBar from "../components/SearchBar";
import { DarkMode } from "@/components/DarkMode";
import { useState, useEffect } from "react";
export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Array<string>>([]);

  useEffect(() => {
    setLoading(true);

    // fetch results
    const fetchData = async () => {
      try {
        const res = await fetch("localhost:3000/api/search");
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <SearchBar setQuery={setQuery} />
        <DarkMode />
      </div>
      {query && <div>{query}</div>}
    </div>
  );
}
