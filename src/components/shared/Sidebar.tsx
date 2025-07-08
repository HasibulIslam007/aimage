"use client";

import { navLinks } from "../../../constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen ${
        collapsed ? "w-[80px]" : "w-[250px]"
      } transition-all duration-300 bg-[#0F1117] text-white backdrop-blur-xl border-r border-white/10 shadow-lg flex flex-col justify-between p-4`}
    >
      {/* Logo + Collapse */}
      <div className="flex items-center justify-between">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/images/logo-text.svg"
              alt="logo"
              width={160}
              height={30}
              className="drop-shadow"
            />
          </Link>
        )}
        <button
          className="text-white ml-auto"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* Nav Links */}
      <ul className="mt-10 space-y-2 flex-grow">
        {navLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <li key={link.route}>
              <Link
                href={link.route}
                className={`group flex items-center gap-4 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow"
                    : "text-gray-300"
                }`}
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={20}
                  height={20}
                />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-white/10 pt-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" showName={!collapsed} />
        </SignedIn>
        <SignedOut>
          <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 mt-4 text-white">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </aside>
  );
};

export default Sidebar;
