"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/match", label: "Match" },
  ];

  return (
    <nav className="bg-indigo-900 shadow-md sticky top-0 z-50 border-b border-[#042c60]/30">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold text-[#eace8f] tracking-tight flex items-center gap-2"
        >
          <span className="text-[#eace8f] text-4xl">🎓</span>
          PeerUp
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <SignedIn>
            <ul className="flex gap-8 items-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-lg font-medium relative transition-all duration-200 ${
                      pathname.startsWith(item.href)
                        ? "text-[#e8c36f]"
                        : "text-[#9da1a7] hover:text-[#e8c36f]"
                    }`}
                  >
                    <span className="hover-underline-animation">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-4">
              <UserButton afterSignOutUrl="/sign-in"/>
            </div>
          </SignedIn>

          <SignedOut>
          <SignUpButton mode="modal">
              <button className="w-full bg-[#e8c36f] hover:bg-[#aa9565] text-black px-6 py-3 rounded-xl font-semibold shadow-xl transition-all duration-300">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

         
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#e8c36f]"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-900 border-t border-[#042c60]/20 px-6 py-6 space-y-4">
          <SignedIn>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-xl font-medium ${
                pathname.startsWith(item.href)
                  ? "text-[#e8c36f]"
                  : "text-[#9da1a7] hover:text-[#3cd598]"
              }`}
            >
              {item.label}
            </Link>
          ))}
           <SignOutButton>
              <button className="w-full bg-[#e8c36f] hover:bg-[#aa9565] text-black px-6 py-3 rounded-xl font-semibold shadow-xl transition-all duration-300">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
          
          <SignedOut>
            <SignInButton>
              <button className="w-full bg-[#e8c36f] hover:bg-[#aa9565] text-black px-6 py-3 rounded-xl font-semibold shadow-xl transition-all duration-300">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      )}

      {/* Underline Hover Animation */}
      <style jsx>{`
        .hover-underline-animation::after {
          content: "";
          display: block;
          width: 0;
          height: 2px;
          background: #e8c36f;
          transition: width 0.3s;
          position: absolute;
          bottom: -4px;
          left: 0;
        }

        .hover-underline-animation:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}
