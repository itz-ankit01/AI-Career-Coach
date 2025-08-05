// app/resume/_components/entry-form.jsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Pencil, Save, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    onChange([...entries, formattedEntry]);

    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Add this effect to handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  // Replace handleImproveDescription with this
  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(), // 'experience', 'education', or 'project'
    });
  };

  return (
    <div className="space-y-6">
      {/* Existing Entries */}
      <div className="space-y-4">
        {entries.map((item, index) => (
          <Card 
            key={index} 
            className="bg-gray-700/50 border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 rounded-xl backdrop-blur-sm group hover:shadow-lg hover:shadow-blue-500/10"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
                <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                  {item.title}
                </CardTitle>
                <span className="text-gray-400">@</span>
                <span className="text-purple-300 font-medium">{item.organization}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleDelete(index)}
                className="h-9 w-9 bg-red-500/10 border-red-500/30 hover:bg-red-500/20 hover:border-red-400 text-red-400 hover:text-red-300 rounded-lg transition-all duration-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <p className="text-sm text-emerald-300 font-medium">
                  {item.current
                    ? `${item.startDate} - Present`
                    : `${item.startDate} - ${item.endDate}`}
                </p>
              </div>
              <div className="pl-4 border-l-2 border-gray-600">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Entry Form */}
      {isAdding && (
        <Card className="bg-gray-800/50 border-2 border-gray-600 rounded-2xl backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></div>
              <CardTitle className="text-2xl font-bold text-white">
                Add New {type}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Title and Organization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Title/Position
                </label>
                <Input
                  placeholder={`Enter ${type.toLowerCase()} title`}
                  {...register("title")}
                  className="h-12 bg-gray-700/50 border-2 border-gray-600 hover:border-blue-400 focus:border-blue-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400"
                  error={errors.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.title.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Organization/Company
                </label>
                <Input
                  placeholder="Enter organization name"
                  {...register("organization")}
                  className="h-12 bg-gray-700/50 border-2 border-gray-600 hover:border-purple-400 focus:border-purple-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400"
                  error={errors.organization}
                />
                {errors.organization && (
                  <p className="text-sm text-red-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Start Date
                </label>
                <Input
                  type="month"
                  {...register("startDate")}
                  className="h-12 bg-gray-700/50 border-2 border-gray-600 hover:border-green-400 focus:border-green-500 transition-all duration-300 rounded-xl text-white"
                  error={errors.startDate}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  End Date
                </label>
                <Input
                  type="month"
                  {...register("endDate")}
                  disabled={current}
                  className="h-12 bg-gray-700/50 border-2 border-gray-600 hover:border-orange-400 focus:border-orange-500 transition-all duration-300 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  error={errors.endDate}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Current Checkbox */}
            <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
              <input
                type="checkbox"
                id="current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label 
                htmlFor="current" 
                className="text-gray-200 font-medium cursor-pointer select-none"
              >
                This is my current {type.toLowerCase()}
              </label>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Description
              </label>
              <Textarea
                placeholder={`Describe your ${type.toLowerCase()}, key achievements, and responsibilities...`}
                className="h-36 bg-gray-700/50 border-2 border-gray-600 hover:border-cyan-400 focus:border-cyan-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400 resize-none"
                {...register("description")}
                error={errors.description}
              />
              {errors.description && (
                <p className="text-sm text-red-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  {errors.description.message}
                </p>
              )}
              
              {/* AI Improve Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleImproveDescription}
                disabled={isImproving || !watch("description")}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/50 hover:border-purple-400 text-purple-300 hover:text-purple-200 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 rounded-lg transition-all duration-300"
              >
                {isImproving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Improving with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Improve with AI
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
              className="h-12 px-6 bg-gray-700/50 border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleAdd}
              className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add {type}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Add New Entry Button */}
      {!isAdding && (
        <Button
          className="w-full h-14 bg-gradient-to-r from-gray-700/50 to-gray-600/50 border-2 border-gray-600 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-5 w-5 mr-3" />
          Add New {type}
        </Button>
      )}
    </div>
  );
}