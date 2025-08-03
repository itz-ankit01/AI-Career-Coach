import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {

  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-gray-800/50 bg-black/80 backdrop-blur-xl shadow-2xl z-50 supports-[backdrop-filter]:bg-black/60">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/50 to-black opacity-80"></div>
      
      <nav className="relative container mx-auto px-4 lg:px-6 h-16 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="group transition-transform duration-300 hover:scale-105">
          <Image
            src="/logo.png"
            alt="Sensai Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300"
          />
        </Link>

        {/* Navigation Section */}
        <div className="flex items-center gap-3 md:gap-4">
          <SignedIn>
            {/* Industry Insights Button */}
            <Link href={"/dashboard"}>
              <Button 
                variant='outline' 
                className="bg-gray-900/80 border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm"
              >
                <LayoutDashboard className="h-4 w-4 text-blue-400" />
                <span className="ml-2 hidden md:block font-medium cursor-pointer">Industry Insights</span>
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                  <Star className="h-4 w-4" />
                  <span className="hidden md:block font-medium cursor-pointer">Growth Tools</span>
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900/95 border-gray-700 backdrop-blur-xl shadow-2xl min-w-[200px] p-2">
                <DropdownMenuItem className="hover:bg-gray-800/80 rounded-lg transition-colors duration-200 cursor-pointer focus:bg-gray-800/80">
                  <Link href={"/resume"} className="flex items-center gap-3 w-full py-2 px-1">
                    <div className="p-1.5 bg-green-500/10 rounded-md">
                      <FileText className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-gray-200 font-medium">Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800/80 rounded-lg transition-colors duration-200 cursor-pointer focus:bg-gray-800/80">
                  <Link
                    href={"/ai-cover-letter"}
                    className="flex items-center gap-3 w-full py-2 px-1"
                  >
                    <div className="p-1.5 bg-blue-500/10 rounded-md">
                      <PenBox className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-gray-200 font-medium">Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800/80 rounded-lg transition-colors duration-200 cursor-pointer focus:bg-gray-800/80">
                  <Link href={"/interview"} className="flex items-center gap-3 w-full py-2 px-1">
                    <div className="p-1.5 bg-purple-500/10 rounded-md">
                      <GraduationCap className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-gray-200 font-medium">Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          {/* Sign In Button */}
          <SignedOut>
            <SignInButton>
              <Button 
                variant='outline'
                className="bg-gray-900/80 border-gray-700 text-gray-200 hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-300 hover:shadow-lg backdrop-blur-sm font-medium px-6 cursor-pointer"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          
          {/* User Button */}
          <SignedIn>
            <div className="relative">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full ring-2 ring-gray-700 hover:ring-blue-500 transition-all duration-300 shadow-lg",
                    userButtonPopoverCard: "w-56 bg-gray-900/95 border-gray-700 backdrop-blur-xl shadow-2xl",
                    userPreviewMainIdentifier: "text-white font-semibold",
                    userPreviewSecondaryIdentifier: "text-gray-400",
                    userButtonPopoverActionButton: "hover:bg-gray-800/80 text-gray-200 hover:text-white transition-colors duration-200",
                    userButtonPopoverActionButtonIcon: "text-gray-400",
                    userButtonPopoverFooter: "hidden",
                  },
                }} 
                afterSignOutUrl="/"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;