"use client";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { PhoneInput } from "@/components/ui/base-phone-input";
import {
  signUpFormSchema,
  SignUpFormSchema,
} from "@/form-schemas/sign-up-schema";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const SignUpPage = () => {
  const queryClient = useQueryClient();
  const signUpMutation = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
      phone: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate, br",
          },
          body: JSON.stringify(data),
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Sign up successful");
      router.replace("/explore");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const router = useRouter();

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
    },
  });

  const onSubmit = (data: SignUpFormSchema) => {
    const newData = {
      name: data.first_name + " " + data.last_name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      phone: data.phone,
    };
    signUpMutation.mutate(newData);
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
            <FieldLegend>Sign up</FieldLegend>
            <FieldDescription>Create your account</FieldDescription>
            <FieldGroup className="max-h-96 overflow-y-scroll">
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                  <Controller
                    name="first_name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          id="first_name"
                          autoComplete="off"
                          type="text"
                          placeholder="John"
                          {...field}
                          disabled={signUpMutation.isPending}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </>
                    )}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                  <Controller
                    name="last_name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          id="last_name"
                          autoComplete="off"
                          type="text"
                          placeholder="Doe"
                          {...field}
                          disabled={signUpMutation.isPending}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </>
                    )}
                  />
                </Field>
              </div>
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
                      disabled={signUpMutation.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          id="password"
                          autoComplete="off"
                          type="password"
                          placeholder="password123"
                          {...field}
                          disabled={signUpMutation.isPending}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </>
                    )}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password_confirmation">
                    Confirm Password
                  </FieldLabel>
                  <Controller
                    name="password_confirmation"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          id="password_confirmation"
                          autoComplete="off"
                          type="password"
                          placeholder="password123"
                          {...field}
                          disabled={signUpMutation.isPending}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </>
                    )}
                  />
                </Field>
              </div>

              {/* Phone Field */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <PhoneInput
                      id="phone"
                      placeholder="12345678"
                      autoComplete="off"
                      type="tel"
                      {...field}
                      disabled={signUpMutation.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Field>
              <Button type="submit" disabled={signUpMutation.isPending}>
                {signUpMutation.isPending ? (
                  <>
                    Signing up
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </Field>
          </FieldSet>
        </form>
        <p className="pt-1 text-center">
          Already have an account?{" "}
          <span>
            <Button
              variant="link"
              className="m-0 p-0"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
