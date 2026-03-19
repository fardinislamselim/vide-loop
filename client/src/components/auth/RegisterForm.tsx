"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "./PasswordInput";
import { SocialButtons } from "./SocialButtons";
import axios from "axios";

const registerSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
  terms: z.boolean().refine((val) => val === true, "You must agree to terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/v1/auth/register", data, {
          withCredentials: true
        }
      );
      console.log(result);
    } catch (error) {
      
    }
    console.log(data);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="text-3xl font-semibold">Create your account</h2>
        <p className="text-muted-foreground mt-2">
          Join and start connecting today
        </p>
      </div>

      <SocialButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground">OR</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label>Full Name</Label>
          <Input {...register("name") } />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Username</Label>
            <Input {...register("username")} />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <Label>Password</Label>
          <PasswordInput
            register={register}
            name="password"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <Label>Confirm Password</Label>
          <PasswordInput
            register={register}
            name="confirmPassword"
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={watch("terms")}
            onCheckedChange={(checked) => setValue("terms", checked)}
            id="terms"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to Terms & Privacy
          </label>
          {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <span className="text-primary font-medium hover:underline cursor-pointer">
          Login
        </span>
      </p>
    </div>
  );
};
