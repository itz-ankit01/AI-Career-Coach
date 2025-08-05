"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Briefcase, Building2, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/useFetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  // Update content when letter is generated
  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Form Card */}
      <Card className="bg-gray-800/50 border-2 border-gray-700/50 rounded-2xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 backdrop-blur-sm overflow-hidden">
        {/* Top Accent Border */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <CardHeader className="pb-8 pt-8 px-8 bg-gray-800/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30">
              <FileText className="h-6 w-6 text-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
              <div className="w-2 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold text-white mb-3 flex items-center gap-3">
            Job Details
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </CardTitle>
          
          <CardDescription className="text-gray-300 text-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            Provide information about the position you're applying for
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Company and Job Title Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Name Field */}
              <div className="space-y-4">
                <Label 
                  htmlFor="companyName" 
                  className="text-base font-semibold text-gray-200 flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                    <Building2 className="h-4 w-4 text-purple-300" />
                  </div>
                  Company Name
                </Label>
                
                <div className="relative">
                  <Input
                    id="companyName"
                    placeholder="Enter company name"
                    {...register("companyName")}
                    className="h-14 bg-gray-700/50 border-2 border-gray-600 hover:border-purple-400 focus:border-purple-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400 text-base pl-4 pr-12"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  </div>
                </div>
                
                {errors.companyName && (
                  <p className="text-sm text-red-400 flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Job Title Field */}
              <div className="space-y-4">
                <Label 
                  htmlFor="jobTitle" 
                  className="text-base font-semibold text-gray-200 flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                    <Briefcase className="h-4 w-4 text-blue-300" />
                  </div>
                  Job Title
                </Label>
                
                <div className="relative">
                  <Input
                    id="jobTitle"
                    placeholder="Enter job title"
                    {...register("jobTitle")}
                    className="h-14 bg-gray-700/50 border-2 border-gray-600 hover:border-blue-400 focus:border-blue-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400 text-base pl-4 pr-12"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
                
                {errors.jobTitle && (
                  <p className="text-sm text-red-400 flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            {/* Job Description Field */}
            <div className="space-y-4">
              <Label 
                htmlFor="jobDescription" 
                className="text-base font-semibold text-gray-200 flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30">
                  <FileText className="h-4 w-4 text-green-300" />
                </div>
                Job Description
              </Label>
              
              <div className="relative">
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here... Include key requirements, responsibilities, and qualifications"
                  className="h-40 bg-gray-700/50 border-2 border-gray-600 hover:border-green-400 focus:border-green-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400 text-base p-4 resize-none"
                  {...register("jobDescription")}
                />
                <div className="absolute top-4 right-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              {errors.jobDescription && (
                <p className="text-sm text-red-400 flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            {/* Generate Button */}
            <div className="flex justify-end pt-6 border-t border-gray-700/50">
              <Button 
                type="submit" 
                disabled={generating}
                className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0 text-base min-w-[200px]"
              >
                {generating ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating...</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                      <div className="w-1 h-1 bg-white rounded-full animate-ping delay-150"></div>
                      <div className="w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    <span>Generate Cover Letter</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        
        {/* Bottom Accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      </Card>

      {/* Progress Indicator */}
      {generating && (
        <Card className="bg-gray-800/30 border border-gray-700/50 rounded-xl backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 font-medium">AI is crafting your cover letter...</span>
              </div>
              <div className="flex-1 mx-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}