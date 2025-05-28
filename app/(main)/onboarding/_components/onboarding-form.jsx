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
    <div className="flex items-center justify-center bg-background">
      <Card className={`w-full max-w-lg mt-5 mx-2`}>
        <CardHeader>
          <CardTitle className={`gradient-title text-4xl`}>
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select Your Industry to get personalised career insights and
            recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry :</Label>
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
                <SelectTrigger id="industry" className={`w-full`}>
                  <SelectValue placeholder="Select an Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => {
                    return (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization :</Label>
                <Select
                  className="w-full"
                  onValueChange={(value) => setValue("subIndustry", value)}
                >
                  <SelectTrigger id="subIndustry" className={`w-full`}>
                    <SelectValue placeholder="Select Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries?.map((ind) => {
                      return (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Experience */}

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience :</Label>
              <Input 
              {...register('experience')}
              id='experience'
              type='number'
              placeholder='Enter Year of Experience'
              min='0'
              max='50'
              />
                
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}

                </p>
              )}
            </div>

            {/* Skills */}

            <div className="space-y-2">
              <Label htmlFor="skills">Skills : </Label>
              <Input 
              id='skills'
              placeholder='e.g. Python, JavaScript, Project Management'
              {...register('skills')}
              />
              <p className="text-sm text-muted-foreground">Separate multiple skills with commas</p>
                
              {errors.skills && (
                <p className="text-sm text-red-500">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Professional Bio */}

            <div className="space-y-2">
              <Label htmlFor="skills">Professional Bio : </Label>
              <Textarea
              id='bio'
              className='h-32'
              placeholder='Tell us about your Professional background...'
              {...register('bio')}
              />

                
              {errors.bio && (
                <p className="text-sm text-red-500">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <Button type='submit' className='w-full cursor-pointer' disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Complete Profile'
              )}
              
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default OnboardingForm;
