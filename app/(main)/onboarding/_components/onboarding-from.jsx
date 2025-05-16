"use client";

import { onboardingSchema } from "@/app/lib/schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

function OnboardingForm({ industries }) {
  const [selectIndustry, setSelectIndustry] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className={`w-full max-w-lg mt-10 mx-2`}>
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
          <form>
            <div className="space-y-4">
              <Label htmlFor="industry">Industry</Label>
              <Select className="w-full">
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
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default OnboardingForm;
