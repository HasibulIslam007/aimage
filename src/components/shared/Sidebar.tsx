"use client";

import { navLinks } from "@/../constants";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const radius = 160;
  const centerX = 100;
  const centerY = 160;
  const maxAngle = 180;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* === Blurred Overlay === */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* === Sidebar Arc Menu === */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
        <div className="relative w-[260px] h-[400px]">
          {/* ☰ Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="absolute left-[85px] top-[140px] z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-xl text-white text-xl transition hover:scale-110"
          >
            ☰
          </button>

          {/* Auth Buttons Below Toggle */}
          <div className="absolute top-[200px] left-[50px] flex flex-col items-center gap-2 z-40 transition-all duration-500">
            <SignedOut>
              <Button
                asChild
                className={cn(
                  "bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm shadow-md",
                  open
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>

            <SignedIn>
              <SignOutButton>
                <Button
                  className={cn(
                    "bg-red-500 hover:bg-red-600 text-white px-10 py-2 rounded-full text-sm shadow-md",
                    open
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-100 pointer-events-none"
                  )}
                >
                  Logout
                </Button>
              </SignOutButton>
            </SignedIn>
          </div>

          {/* Arc Items */}
          {navLinks.map((link, index) => {
            const angleStep =
              navLinks.length > 1 ? maxAngle / (navLinks.length - 1) : 0;
            const angle = index * angleStep - maxAngle / 2;
            const rad = (angle * Math.PI) / 180;
            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);
            const isActive = pathname === link.route;

            // Tooltip position
            let labelPosition = "right";
            if (index === 0) labelPosition = "top";
            else if (index === navLinks.length - 1) labelPosition = "bottom";

            return (
              <div
                key={link.label}
                className={cn(
                  "absolute transition-all duration-500 ease-in-out group",
                  open ? "opacity-100 scale-100" : "opacity-0 scale-0"
                )}
                style={{
                  left: `${centerX + x}px`,
                  top: `${centerY - y}px`,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push(link.route);
                  }}
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-full transition-all group/icon hover:scale-110",
                    isActive
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
                      : "bg-[#e64870]/90 hover:bg-[#e64870]"
                  )}
                >
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={22}
                    height={22}
                    className="z-10"
                  />

                  {/* Tooltip */}
                  <span
                    className={cn(
                      "absolute px-3 py-1 text-sm font-medium text-white whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-all duration-300 pointer-events-none",
                      labelPosition === "top"
                        ? "bottom-14 left-1/2 -translate-x-1/2"
                        : labelPosition === "bottom"
                        ? "top-14 left-1/2 -translate-x-1/2"
                        : labelPosition === "right"
                        ? "left-14 top-1/2 -translate-y-1/2"
                        : "right-14 top-1/2 -translate-y-1/2"
                    )}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      zIndex: 60,
                    }}
                  >
                    {link.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
