import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { Toaster } from "@/components/ui/toaster";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen pt-10 w-full flex-col lg:flex-row bg-background">
      {/* Sidebar only visible on large screens */}
      <div className="hidden lg:flex md:hiddden">
        <Sidebar />
      </div>

      {/* Mobile nav only on small screens */}
      <div className="lg:hidden">
        <MobileNav />
      </div>

      {/* Main content */}
      <div className="flex-1 pt-16 lg:pt-0 overflow-auto">
        <div className="wrapper">{children}</div>
      </div>
      <Toaster />
    </main>
  );
};

export default layout;
