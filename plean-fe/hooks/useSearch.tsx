import { useState, useEffect } from "react";
import { Result } from "../app/page";

export default function useSearch(query: string, isAuthenticated: boolean) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated || !query) return;

    const fetchData = async () => {
      setLoading(true);
      setResults([]);

      try {
        const res = await fetch(`http://127.0.0.1:8000/search?q=${query}`);
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);

        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, isAuthenticated]);

  return { loading, results };
}
