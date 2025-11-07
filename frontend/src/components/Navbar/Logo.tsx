import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="hidden sm:block">
      <div className="flex gap-2 w-full pr-10 group">
        <Image src="/dzomio-logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-2xl font-bold group-hover:text-primary transition-all">
          DZOMIO
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
