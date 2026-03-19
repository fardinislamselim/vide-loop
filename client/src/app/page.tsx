"use client"
import { TheemToggle } from "@/components/TheemToggle";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
export default function Home() {
  const handelLogout = async () => {
    const result = await api.get("/auth/logout");
    console.log(result);
};

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <h1>Welcome to Vibe Loop App 👋</h1>
        <Button onClick={handelLogout}>Sign Up</Button>
        <TheemToggle />
      </div>
    </div>
  );
}
