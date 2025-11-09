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

const SignUpPage = () => {
  const formSchema = z
    .object({
      first_name: z.string().min(2, "First name must be at least 2 characters"),
      last_name: z.string().min(2, "Last name must be at least 2 characters"),
      email: z.email("Email is required"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirm_password: z.string(),
      phone: z.string().min(8, "Phone number must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
    });
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
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
            <FieldLegend>Sign up</FieldLegend>
            <FieldDescription>Create your account</FieldDescription>
            <FieldGroup className="max-h-70 overflow-y-scroll">
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

              {/* Confirm Password Field */}
              <Controller
                name="confirm_password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="confirm_password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm_password"
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

              {/* Phone Field */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      autoComplete="off"
                      type="phone"
                      placeholder="12345678"
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
              <Button>Sign up</Button>
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
