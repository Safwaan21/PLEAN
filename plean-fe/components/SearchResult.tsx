import { Result } from "../app/page";
import Image from "next/image";

export default function SearchResult({ result }: { result: Result }) {
  const iconMapping: { [key: string]: string } = {
    "application/vnd.google-apps.document": "/gdoc.png",
    "application/vnd.google-apps.presentation": "/gslide.png",
  };

  if (!iconMapping[result.type]) {
    return null;
  }

  return (
    <div
      className="flex items-start mb-5 mr-5 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 active:scale-95 p-4 rounded-lg transition duration-200 cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => window.open(result.link, "_blank")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          window.open(result.link, "_blank");
        }
      }}
    >
      <Image
        src={iconMapping[result.type]}
        width={64}
        height={64}
        alt={result.type}
        className="w-8 h-8 mr-2"
      />
      <div>
        <h1 className="text-blue-500 text-2xl font-bold">{result.name}</h1>
        <div className="flex font-thin text-xs">
          <p className="mr-3">{result.modified_date.toString()}</p>
          <p className="font-normal">{result.owner}</p>
        </div>
        <p>{result.description}</p>
      </div>
    </div>
  );
}
