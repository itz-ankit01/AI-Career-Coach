import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";

export default function NewCoverLetterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-8">
          {/* Back Button */}
          <div className="flex items-center">
            <Link href="/ai-cover-letter">
              <Button 
                variant="ghost" 
                className="group gap-3 pl-0 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-gray-600/50"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700/50 group-hover:bg-blue-500/20 border border-gray-600/50 group-hover:border-blue-400/50 transition-all duration-300">
                  <ArrowLeft className="h-4 w-4 group-hover:text-blue-300 transition-colors duration-300" />
                </div>
                Back to Cover Letters
              </Button>
            </Link>
          </div>

          {/* Header Section */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute -top-2 -right-8 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg"></div>
            
            <div className="relative bg-gray-800/30 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              {/* Title Section */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg animate-pulse"></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg animate-pulse delay-300"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full shadow-lg animate-pulse delay-700"></div>
                </div>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-4 tracking-tight">
                Create Cover Letter
              </h1>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg"></div>
                <p className="text-gray-300 text-lg font-medium">
                  Generate a tailored cover letter for your job application
                </p>
              </div>
              
              {/* Progress Indicator */}
              <div className="mt-6 flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xs text-gray-400 font-medium">Step 1 of 3</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="relative">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:32px_32px] rounded-2xl"></div>
            
            {/* Content Card */}
            <div className="relative bg-gray-800/40 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden">
              {/* Top Border Accent */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-10">
                <CoverLetterGenerator />
              </div>
              
              {/* Bottom Accent */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>
          </div>

          {/* Footer Decorative Elements */}
          <div className="flex justify-center items-center gap-2 py-4">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping delay-150"></div>
            <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping delay-300"></div>
          </div>
        </div>
      </div>
      
      {/* Additional Background Effects */}
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="fixed top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
    </div>
  );
}