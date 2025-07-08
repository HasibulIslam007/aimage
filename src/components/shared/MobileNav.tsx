"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "../../../constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-40 flex w-full justify-between items-center h-16 bg-[#0F1117] border-b border-white/10 px-4 text-white lg:hidden">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={140}
          height={28}
        />
      </Link>

      <nav className="flex items-center gap-3">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={28}
                height={28}
              />
            </SheetTrigger>
            <SheetContent className="bg-[#0F1117] text-white">
              <ul className="mt-8 space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.route;
                  return (
                    <li key={link.route}>
                      <Link
                        href={link.route}
                        className={`flex items-center gap-3 text-sm px-3 py-2 rounded-xl ${
                          isActive
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                            : "hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button
            asChild
            className="bg-purple-500 text-white rounded-full px-4 py-2"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
