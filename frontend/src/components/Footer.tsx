import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-center sm:px-20 lg:px-10 border-t border-t-muted">
      <div className="flex items-center justify-between max-w-7xl w-full gap-10 lg:gap-20 xl:gap-30 p-4">
        <p className="text-neutral-300">
          Copyright © Dzomio 2025 - All rights reserved
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size={"lg"}>
            Contact
          </Button>
          <Button variant="ghost" size={"lg"}>
            About
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
