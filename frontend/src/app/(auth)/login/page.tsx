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

const LoginPage = () => {
  const formSchema = z.object({
    email: z.email("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Field>
              <Button>Login</Button>
            </Field>
          </FieldSet>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
