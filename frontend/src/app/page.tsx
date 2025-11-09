import Navbar from "@/components/Navbar/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";

const LandingPage = () => {
  return (
    <>
      <Navbar />

      <div className="w-full h-full flex items-center justify-center">
        <ThemeToggle />
      </div>
    </>
  );
};
export default LandingPage;
