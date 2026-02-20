import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Container, Cookie, Refrigerator, Sparkles } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { checkUser } from "@/lib/checkUser";
import PricingModal from "./PricingModal";
import { Badge } from "./ui/badge";
import HowToCookModal from "./HowToCookModal";

const Header = async () => {
  const user = await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <Image
            src="/orange-logo.png"
            alt="CookItAI Logo"
            width={62}
            height={62}
            className="w-16 cursor-pointer"
          />
        </Link>

        {/* Nav Links */}
       <div className="hidden md:flex items-center md:ml-12 lg:ml-32 xl:ml-40 space-x-8 text-sm font-medium text-stone-600">

  <Link
    href="/recipes"
    className="relative hover:text-orange-600 transition-colors flex gap-1.5 items-center 
    after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 
    after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full"
  >
    <Cookie className="w-4 h-4" />
    My Recipes
  </Link>

  <Link
    href="/pantry"
    className="relative hover:text-orange-600 transition-colors flex gap-1.5 items-center 
    after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 
    after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full"
  >
    <Refrigerator className="w-4 h-4" />
    My Pantry
  </Link>

  <Link
    href="/generated-recipes"
    className="relative hover:text-orange-600 transition-colors flex gap-1.5 items-center 
    after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 
    after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full"
  >
    <Container className="w-4 h-4" />
    My AI Recipes
  </Link>

</div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <HowToCookModal />
            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${
                    user.subscriptionTier === "pro"
                      ? "bg-linear-to-r from-orange-600 to-amber-500 cursor-pointer text-white border-none shadow-sm"
                      : "bg-stone-200/50 text-stone-600 border-stone-200 cursor-pointer hover:bg-stone-300/50 hover:border-stone-300"
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${
                      user.subscriptionTier === "pro"
                        ? "text-white fill-white/20"
                        : "text-stone-500"
                    }`}
                  />
                  <span>
                    {user.subscriptionTier === "pro" ? "Pro Chef" : "Free Plan"}
                  </span>
                </Badge>
              </PricingModal>
            )}
            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-stone-600 hover:text-orange-600 hover:bg-orange-50 font-medium"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="primary" className="rounded-full px-6">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
