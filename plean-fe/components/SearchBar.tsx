import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function SearchBar({
  setQuery,
}: {
  setQuery: (query: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    setQuery(inputValue);
    setInputValue("");
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className=" rounded-xl flex p-2 mr-5 w-full max-w-2xl border border-gray-200 dark:border-gray-700">
      <TextareaAutosize
        placeholder="Ask anything..."
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={handleTextareaKeyDown}
        className="ml-2 self-center bg-transparent w-full focus:outline-none resize-none max-h-[200px]"
      />
      <Button
        className="ml-3 rounded-full"
        disabled={inputValue.length === 0}
        onClick={handleSearch}
      >
        <Search />
      </Button>
    </div>
  );
}
