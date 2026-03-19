import { TheemToggle } from "@/components/TheemToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <h1>Welcome to Vibe Loop App 👋</h1>
        <Button>Sign Up</Button>
        <TheemToggle />
      </div>
    </div>
  );
}
