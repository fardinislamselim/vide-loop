import { Button } from "@/components/ui/button";
import { Chrome, Github } from "lucide-react";

export const SocialButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="h-12">
        <Chrome className="mr-2 h-5 w-5" />
        Google
      </Button>
      <Button variant="outline" className="h-12">
        <Github className="mr-2 h-5 w-5" />
        GitHub
      </Button>
    </div>
  );
};
