import Fetcher from "@/components/Fetcher";
import Footer from "@/components/Footer";
import HowToUse from "@/components/HowToUse";
import NavBar from "@/components/NavBar";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen p-2 sm:p-4">
      <NavBar />
      <div className="flex-grow flex flex-col w-full items-center overflow-hidden sm:mt-[10%] mt-[50%] p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="mb-4 sm:mb-6 z-10">
          <HowToUse />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-y-2 sm:gap-y-4">
          <h1 className="font-black text-2xl sm:text-3xl md:text-3xl lg:text-3xl text-center max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl">
            Download Files and Directories from GitHub with Ease
          </h1>
          <div className="flex mb-6 sm:mb-8">
            <Fetcher />
          </div>
        </div>
      </div>
      <GridPattern
        width={25}
        height={25}
        maxOpacity={0.07}
        x={-1}
        y={-1}
        strokeDasharray={"5 4"}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
      <Footer />
    </main>
  );
}
