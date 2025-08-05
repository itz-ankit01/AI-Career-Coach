"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit2, Eye, Trash2, FileText, Calendar, Building2, Briefcase } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card className="bg-gray-800/30 border-2 border-gray-700/50 rounded-2xl backdrop-blur-sm shadow-xl">
        <div className="h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50"></div>
        
        <CardHeader className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-600/30 to-gray-700/30 border border-gray-600/50">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold text-white mb-3">
            No Cover Letters Yet
          </CardTitle>
          
          <CardDescription className="text-gray-400 text-lg flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            Create your first cover letter to get started
          </CardDescription>
          
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping delay-150"></div>
            <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping delay-300"></div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {coverLetters.map((letter) => (
        <Card 
          key={letter.id} 
          className="group relative bg-gray-800/50 border-2 border-gray-700/50 hover:border-gray-600/70 rounded-2xl backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden"
        >
          {/* Top Accent Border */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300"></div>
          
          <CardHeader className="pb-6 pt-6 px-8">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                {/* Status Indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Active</span>
                </div>
                
                {/* Title Section */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                    <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-2 group-hover:from-blue-100 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-blue-400" />
                          <span>{letter.jobTitle}</span>
                        </div>
                        <span className="text-gray-400">@</span>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-purple-400" />
                          <span>{letter.companyName}</span>
                        </div>
                      </div>
                    </CardTitle>
                    
                    <CardDescription className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <span>Created {format(new Date(letter.createdAt), "PPP")}</span>
                    </CardDescription>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                  className="h-10 w-10 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-400/50 text-blue-400 hover:text-blue-300 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-10 w-10 bg-red-500/10 border-red-500/30 hover:bg-red-500/20 hover:border-red-400/50 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  
                  <AlertDialogContent className="bg-gray-800 border-2 border-gray-700 rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white text-xl flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center">
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </div>
                        Delete Cover Letter?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300 text-base leading-relaxed">
                        This action cannot be undone. This will permanently delete your cover letter for{" "}
                        <span className="font-semibold text-blue-300">{letter.jobTitle}</span> at{" "}
                        <span className="font-semibold text-purple-300">{letter.companyName}</span>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3">
                      <AlertDialogCancel className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white rounded-xl">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                      >
                        Delete Permanently
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            {/* Job Description Preview */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-sm font-medium text-cyan-300">Job Description Preview</span>
              </div>
              
              <div className="pl-4 border-l-2 border-gray-600/50 group-hover:border-cyan-400/50 transition-all duration-300">
                <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {letter.jobDescription}
                </p>
              </div>
            </div>
            
            {/* Bottom Stats */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-400">Ready to use</span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">AI Generated</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping delay-150"></div>
                <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping delay-300"></div>
              </div>
            </div>
          </CardContent>
          
          {/* Bottom Accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent group-hover:via-gray-500 transition-all duration-300"></div>
        </Card>
      ))}
    </div>
  );
}