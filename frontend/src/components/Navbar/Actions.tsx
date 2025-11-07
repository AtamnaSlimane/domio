import Link from "next/link";
import { Button } from "../ui/button";

const Actions = () => {
  return (
    <div className="hidden lg:flex items-center justify-center gap-2">
      <Button variant="ghost" size={"lg"} asChild>
        <Link href="/sign-up">Become a host</Link>
      </Button>
      <Button size={"lg"}>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
};

export default Actions;
