
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  VideoPlayer,
  VideoPlayerContent,
} from "@/components/ui/shadcn-io/video-player";
import Image from "next/image";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-between p-6 pt-18">
        <div className="w-full h-full flex flex-col justify-end gap-4 p-12 rounded-4xl relative overflow-hidden bg-linear-to-t from-black/50 to-black/0">
          {/* <Image
            src={"/city.jpg"}
            alt="CITY"
            fill
            className="object-cover object-center absolute top-0 left-0 -z-1"
          /> */}
          <VideoPlayer className="w-full h-full absolute top-0 left-0 -z-1">
            <VideoPlayerContent
              suppressHydrationWarning
              crossOrigin=""
              muted
              autoPlay
              preload="auto"
              slot="media"
              src="/city.mp4"
            />
          </VideoPlayer>
          <h1 className="text-7xl font-bold text-white">
            Live the <span className="font-serif italic">Experience</span>
          </h1>
          <p className="text-2xl text-white/70">
            Premium rooms, hotels and experiences across the world.
          </p>
        </div>
      </div>
    </>
  );
};
export default LandingPage;
