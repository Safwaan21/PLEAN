import { useState, useEffect } from "react";
import { Result } from "../app/page";
import { API_URL } from "@/lib/constants";

export default function useSearch(query: string, isAuthenticated: boolean) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!isAuthenticated || !query) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${API_URL}/search?q=${query}&token=${localStorage.getItem(
            "authToken"
          )}&user_id=${localStorage.getItem("user_id")}`
        );
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);

        const data = await res.json();
        // check if a new auth token is returned
        if (data["new_auth_token"]) {
          localStorage.setItem("authToken", data["new_auth_token"]);
        }

        // updates results to be an array of Result from data
        const newData = data["files"].map((result: Result) => {
          return {
            name: result.name,
            link: result.link,
            type: result.type,
            owner: result.owner,
            owner_photo: result.owner_photo,
            description: result.description,
            modified_date: new Date(result.modified_date),
          };
        });
        newData.sort((a: Result, b: Result) => {
          return b.modified_date.getTime() - a.modified_date.getTime();
        });
        setResults(newData);
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
