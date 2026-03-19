import { RegisterForm } from "@/components/auth/RegisterForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE (same as your design) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
            ⚡
          </div>
          <span className="text-2xl font-bold">ConnectSocial</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-6xl font-bold leading-tight">
            Connect with the <br /> world's best <br /> creators.
          </h1>
          <p className="text-xl text-white/80 max-w-md">
            Join over 2 million users sharing their journey.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 flex items-center gap-4 w-fit">
          <div className="flex -space-x-3">
            <Avatar className="border-2 border-white w-9 h-9">
              <AvatarImage src="https://i.pravatar.cc/32?u=1" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-white w-9 h-9">
              <AvatarImage src="https://i.pravatar.cc/32?u=2" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
          </div>
          <p>Join 500+ people online right now</p>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)]" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <RegisterForm />
      </div>
    </div>
  );
}
