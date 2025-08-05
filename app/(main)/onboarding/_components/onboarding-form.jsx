"use client";

import { onboardingSchema } from "@/app/lib/schema";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { updateUser } from "@/actions/user";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";

function OnboardingForm({ industries }) {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const router = useRouter();

  const {
    loading : updateLoading,
    fn : updateUserFn,
    data : updateResult
  } = useFetch(updateUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onsubmit = async (value) => {
    try {
      const formattedIndustry = `${value.industry}-${value.subIndustry.toLowerCase().replace(/ /g, "-")}`;
      await updateUserFn({
        ...value,
        industry : formattedIndustry
      })
    } catch (error) {
      console.error('Onboarding Error', error);
    }
  }

  useEffect(() => {
    if(updateResult?.success && !updateLoading) {
      toast.success('Profile completed successfully');
      router.push('/dashboard')
      router.refresh();
    }
  }, [updateResult, updateLoading])

  const watchIndustry = watch("industry");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl bg-gray-900/80 border-gray-700 backdrop-blur-sm shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
          <CardHeader className="text-center space-y-6 pb-8 pt-8">
            {/* Logo Icon */}
            <div className="mx-auto relative group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-300">
                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            {/* Title */}
            <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
              Complete Your Profile
            </CardTitle>
            
            {/* Subtitle */}
            <CardDescription className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
              Select your industry to get personalized career insights and recommendations tailored just for you
            </CardDescription>
            
            {/* Decorative Line */}
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full shadow-lg"></div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form className="space-y-8" onSubmit={handleSubmit(onsubmit)}>
              {/* Industry Selection */}
              <div className="space-y-4 group">
                <Label htmlFor="industry" className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>
                  Industry
                </Label>
                <Select
                  className="w-full"
                  onValueChange={(value) => {
                    setValue("industry", value);
                    setSelectedIndustry(
                      industries.find((ind) => ind.id === value)
                    );
                    setValue("subIndustry", "");
                  }}
                >
                  <SelectTrigger 
                    id="industry" 
                    className="w-full h-14 bg-gray-800/50 border-2 border-gray-600 hover:border-blue-400 focus:border-blue-500 transition-all duration-300 rounded-xl shadow-lg hover:shadow-blue-500/20 text-white backdrop-blur-sm"
                  >
                    <SelectValue placeholder="Choose your industry" className="text-gray-300" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-2xl border-gray-600 bg-gray-800/95 backdrop-blur-md">
                    {industries.map((ind) => {
                      return (
                        <SelectItem 
                          key={ind.id} 
                          value={ind.id}
                          className="hover:bg-blue-500/20 focus:bg-blue-500/20 rounded-lg mx-2 my-1 text-gray-200 transition-colors duration-200"
                        >
                          {ind.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-sm text-red-400 flex items-center gap-2 animate-in slide-in-from-left-2 duration-200">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.industry.message}
                  </p>
                )}
              </div>

              {/* Sub Industry with smooth animation */}
              {watchIndustry && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                  <Label htmlFor="subIndustry" className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"></div>
                    Specialization
                  </Label>
                  <Select
                    className="w-full"
                    onValueChange={(value) => setValue("subIndustry", value)}
                  >
                    <SelectTrigger 
                      id="subIndustry" 
                      className="w-full h-14 bg-gray-800/50 border-2 border-gray-600 hover:border-purple-400 focus:border-purple-500 transition-all duration-300 rounded-xl shadow-lg hover:shadow-purple-500/20 text-white backdrop-blur-sm"
                    >
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-2xl border-gray-600 bg-gray-800/95 backdrop-blur-md">
                      {selectedIndustry?.subIndustries?.map((ind) => {
                        return (
                          <SelectItem 
                            key={ind} 
                            value={ind}
                            className="hover:bg-purple-500/20 focus:bg-purple-500/20 rounded-lg mx-2 my-1 text-gray-200 transition-colors duration-200"
                          >
                            {ind}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.subIndustry && (
                    <p className="text-sm text-red-400 flex items-center gap-2 animate-in slide-in-from-left-2 duration-200">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      {errors.subIndustry.message}
                    </p>
                  )}
                </div>
              )}

              {/* Experience */}
              <div className="space-y-4">
                <Label htmlFor="experience" className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></div>
                  Years of Experience
                </Label>
                <Input 
                  {...register('experience')}
                  id='experience'
                  type='number'
                  placeholder='Enter your years of experience'
                  min='0'
                  max='50'
                  className="h-14 bg-gray-800/50 border-2 border-gray-600 hover:border-green-400 focus:border-green-500 transition-all duration-300 rounded-xl shadow-lg hover:shadow-green-500/20 placeholder:text-gray-400 text-white backdrop-blur-sm"
                />
                {errors.experience && (
                  <p className="text-sm text-red-400 flex items-center gap-2 animate-in slide-in-from-left-2 duration-200">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.experience.message}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <Label htmlFor="skills" className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"></div>
                  Skills
                </Label>
                <Input 
                  id='skills'
                  placeholder='e.g. Python, JavaScript, Project Management'
                  {...register('skills')}
                  className="h-14 bg-gray-800/50 border-2 border-gray-600 hover:border-yellow-400 focus:border-yellow-500 transition-all duration-300 rounded-xl shadow-lg hover:shadow-yellow-500/20 placeholder:text-gray-400 text-white backdrop-blur-sm"
                />
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Separate multiple skills with commas
                </p>
                {errors.skills && (
                  <p className="text-sm text-red-400 flex items-center gap-2 animate-in slide-in-from-left-2 duration-200">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.skills.message}
                  </p>
                )}
              </div>

              {/* Professional Bio */}
              <div className="space-y-4">
                <Label htmlFor="bio" className="text-sm font-semibold text-gray-200 flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-lg"></div>
                  Professional Bio
                </Label>
                <Textarea
                  id='bio'
                  className='h-36 bg-gray-800/50 border-2 border-gray-600 hover:border-cyan-400 focus:border-cyan-500 transition-all duration-300 rounded-xl shadow-lg hover:shadow-cyan-500/20 resize-none placeholder:text-gray-400 text-white backdrop-blur-sm'
                  placeholder='Tell us about your professional background, achievements, and career goals...'
                  {...register('bio')}
                />
                {errors.bio && (
                  <p className="text-sm text-red-400 flex items-center gap-2 animate-in slide-in-from-left-2 duration-200">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type='submit' 
                className='w-full h-16 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] rounded-xl border-0 text-white' 
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Saving your profile...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>Complete Profile</span>
                    <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OnboardingForm;