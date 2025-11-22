"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { useUser } from "@/hooks/use-auth";

const Actions = () => {
  const { data, isLoading } = useUser();
  return (
    <div className="hidden lg:flex items-center justify-center gap-2">
      <ThemeToggle />
      {isLoading ? (
        <Button disabled size={"lg"} className="animate-pulse">
          Loading...
        </Button>
      ) : data ? (
        <>
        
        <Button variant="ghost" size={"lg"} asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="ghost" size={"lg"} asChild>
          <Link href="/profile">Profile</Link>
        </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" size={"lg"} asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size={"lg"}>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default Actions;
