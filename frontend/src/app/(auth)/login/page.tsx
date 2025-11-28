"use client";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import Logo from "@/components/Navbar/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { loginFormSchema, LoginFormSchema } from "@/form-schemas/login-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { User } from "@/hooks/use-auth";
import axios from "@/lib/axios";

const LoginPage = () => {
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login successful");
      router.replace("/explore");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormSchema) => {
    loginMutation.mutate(data);
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md border border-card rounded-2xl p-6 shadow-sm bg-card">
        <div className="w-full p2 flex items-center justify-between pb-6">
          <div className="pointer-events-none">
            <Logo />
          </div>
          <ThemeToggle />
        </div>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldLegend>Welcome Back!</FieldLegend>
            <FieldDescription>Login to your account</FieldDescription>
            <FieldGroup>
              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      autoComplete="off"
                      type="email"
                      placeholder="john.doe@email.com"
                      {...field}
                      disabled={loginMutation.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      autoComplete="off"
                      type="password"
                      placeholder="password"
                      {...field}
                      disabled={loginMutation.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Field>
              <Button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? (
                  <>
                    Logging in
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Field>
          </FieldSet>
        </form>
        <p className="pt-1 text-center">
          Don&apos;t have an account yet?{" "}
          <span>
            <Button
              variant="link"
              className="m-0 p-0"
              onClick={() => router.push("/sign-up")}
            >
              Sign up
            </Button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
