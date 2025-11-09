import Navbar from "@/components/Navbar/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
