import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.06),transparent_50%)] pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-8">
          {/* Navigation Section */}
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
            {/* Decorative Background Elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-3 -right-10 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
            <div className="absolute top-8 right-4 w-8 h-8 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-full blur-lg"></div>
            
            <div className="relative bg-gray-800/30 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
              {/* Top Accent Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              {/* Status Indicators */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse"></div>
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Active</span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-400">Cover Letter Preview</span>
                </div>
              </div>
              
              {/* Title Section with Enhanced Typography */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-1 mt-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                    <div className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                  </div>
                  
                  <div className="flex-1">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-2 tracking-tight leading-tight">
                      {coverLetter?.jobTitle || "Cover Letter"}
                    </h1>
                    
                    {coverLetter?.companyName && (
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-gray-400 text-lg">at</span>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-lg"></div>
                          <span className="relative text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent px-4 py-2">
                            {coverLetter.companyName}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Meta Information */}
                <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Last updated: Today</span>
                  </div>
                  <div className="w-px h-4 bg-gray-600"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">Ready to export</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Preview Section */}
          <div className="relative">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:24px_24px] rounded-2xl"></div>
            
            {/* Main Content Card */}
            <div className="relative bg-gray-800/40 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden">
              {/* Content Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-800/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
                  <h2 className="text-lg font-semibold text-white">Cover Letter Content</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Live Preview</span>
                </div>
              </div>
              
              {/* Preview Content */}
              <div className="p-6 sm:p-8 lg:p-10">
                <CoverLetterPreview content={coverLetter?.content} />
              </div>
              
              {/* Bottom Accent */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>
          </div>

          {/* Footer Elements */}
          <div className="flex justify-center items-center gap-3 py-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping delay-200"></div>
              <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping delay-400"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle Border Effects */}
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <div className="fixed top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>
    </div>
  );
}