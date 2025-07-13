"use client";

import { navLinks } from "../../../constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Floating Button + List */}
      <div className="fixed top-6 left-6 z-[100]">
        <div className="relative">
          {/* Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-xl flex items-center justify-center text-white text-2xl transition hover:scale-105 z-20"
          >
            ☰
          </button>

          {/* Vertical Nav List */}
          <div
            className={cn(
              "absolute top-20 left-0 flex flex-col gap-4 transition-all duration-500",
              open
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 pointer-events-none"
            )}
          >
            {navLinks.map((link, index) => {
              const isActive = pathname === link.route;
              return (
                <Link
                  href={link.route}
                  key={link.label}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 w-56 rounded-xl shadow-lg backdrop-blur-md border border-white/10",
                    "transition-all duration-500 transform hover:scale-105 text-white",
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-500"
                      : "bg-white/10 hover:bg-white/20"
                  )}
                >
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={22}
                    height={22}
                  />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Blurred Background Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Top Navbar (desktop only) */}
      <header className="hidden lg:flex fixed top-0 left-0 z-40 w-full h-16 px-4 bg-black/50 backdrop-blur-md border-b border-white/10 text-white items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={130}
            height={28}
            className="drop-shadow-md"
          />
        </Link>

        <SignedOut>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm shadow-md"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </header>
    </>
  );
};

export default MobileNav;
