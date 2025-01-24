import { Button } from "./ui/button";
import Image from "next/image";
import { URL } from "@/lib/constants";
export default function Login() {
  async function handleGoogleLoginClick() {
    try {
      const response = await fetch(`${URL}/auth/google`);
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
    <div className="flex items-center justify-center w-full min-h-screen p-8">
      <Button
        className="p-8 flex items-center justify-center text-lg font-semibold rounded-lg shadow-md"
        onClick={handleGoogleLoginClick}
      >
        <Image
          alt="google icon"
          src="/google-logo.png"
          width={30}
          height={30}
        />
        Google Login
      </Button>
    </div>
  );
}
