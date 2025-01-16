import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import AIMessage from "@/components/AIMessage";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  // This is the function that will be called when the form is submitted. Reset the input value field
  // and prevent the default form submission.

  return (
    <div className="bg-gray-100 items-end rounded-xl flex p-2 m-5 w-full max-w-2xl">
      <TextareaAutosize
        placeholder="Ask anything..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        className="self-center bg-transparent w-full focus:outline-none resize-none max-h-[200px]"
      />
      <Button
        className="bg-black rounded-full"
        disabled={inputValue.length === 0}
      >
        <Search />
      </Button>
    </div>
  );
}
