"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "./resume-pdf";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch form fields for preview updates
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(
        <ResumePDF formValues={formValues} user={user} />
      ).toBlob();
  
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };
  

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

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

      <div data-color-mode="dark" className="relative space-y-8 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="font-bold text-5xl md:text-6xl bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
              Resume Builder
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto md:mx-0 mt-4 rounded-full shadow-lg"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Resume
                </>
              )}
            </Button>
            
            <Button 
              onClick={generatePDF} 
              disabled={isGenerating}
              className="h-12 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 border-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-800/50 border border-gray-700 rounded-xl p-1 backdrop-blur-sm">
            <TabsTrigger 
              value="edit" 
              className="rounded-lg px-6 py-3 text-gray-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium transition-all duration-300"
            >
              <Edit className="mr-2 h-4 w-4" />
              Form Builder
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className="rounded-lg px-6 py-3 text-gray-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white font-medium transition-all duration-300"
            >
              <Monitor className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>
                  <h3 className="text-2xl font-bold text-white">Contact Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 border-2 border-gray-700 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:border-gray-600 transition-colors duration-300">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Email Address
                    </label>
                    <Input
                      {...register("contactInfo.email")}
                      type="email"
                      placeholder="your@email.com"
                      className="h-12 bg-gray-700/50 border-2 border-gray-600 hover:border-blue-400 focus:border-blue-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400"
                      error={errors.contactInfo?.email}
                    />
                    {errors.contactInfo?.email && (
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        {errors.contactInfo.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Mobile Number
                    </label>
                    <Input
                      {...register("contactInfo.mobile")}
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className="h-12 bg-gray-700/50 border-2 border-gray-600 hover:border-green-400 focus:border-green-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400"
                    />
                    {errors.contactInfo?.mobile && (
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        {errors.contactInfo.mobile.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      LinkedIn Profile
                    </label>
                    <Input
                      {...register("contactInfo.linkedin")}
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                      className="h-12 bg-gray-700/50 border-2 border-gray-600 hover:border-purple-400 focus:border-purple-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400"
                    />
                    {errors.contactInfo?.linkedin && (
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        {errors.contactInfo.linkedin.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      Twitter/X Profile
                    </label>
                    <Input
                      {...register("contactInfo.twitter")}
                      type="url"
                      placeholder="https://twitter.com/your-handle"
                      className="h-12 bg-gray-700/50 border-2 border-gray-600 hover:border-cyan-400 focus:border-cyan-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400"
                    />
                    {errors.contactInfo?.twitter && (
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        {errors.contactInfo.twitter.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"></div>
                  <h3 className="text-2xl font-bold text-white">Professional Summary</h3>
                </div>
                
                <div className="p-6 border-2 border-gray-700 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:border-gray-600 transition-colors duration-300">
                  <Controller
                    name="summary"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        className="h-36 bg-gray-700/50 border-2 border-gray-600 hover:border-orange-400 focus:border-orange-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400 resize-none"
                        placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
                        error={errors.summary}
                      />
                    )}
                  />
                  {errors.summary && (
                    <p className="text-sm text-red-400 flex items-center gap-2 mt-3">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      {errors.summary.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg"></div>
                  <h3 className="text-2xl font-bold text-white">Skills & Technologies</h3>
                </div>
                
                <div className="p-6 border-2 border-gray-700 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:border-gray-600 transition-colors duration-300">
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        className="h-36 bg-gray-700/50 border-2 border-gray-600 hover:border-emerald-400 focus:border-emerald-500 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400 resize-none"
                        placeholder="List your technical skills, programming languages, frameworks, and tools..."
                        error={errors.skills}
                      />
                    )}
                  />
                  {errors.skills && (
                    <p className="text-sm text-red-400 flex items-center gap-2 mt-3">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      {errors.skills.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full shadow-lg"></div>
                  <h3 className="text-2xl font-bold text-white">Work Experience</h3>
                </div>
                
                <div className="p-6 border-2 border-gray-700 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:border-gray-600 transition-colors duration-300">
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <EntryForm
                        type="Experience"
                        entries={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.experience && (
                    <p className="text-sm text-red-400 flex items-center gap-2 mt-3">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      {errors.experience.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-lg"></div>
                  <h3 className="text-2xl font-bold text-white">Education</h3>
                </div>
                
                <div className="p-6 border-2 border-gray-700 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:border-gray-600 transition-colors duration-300">
                  <Controller
                    name="education"
                    control={control}
                    render={({ field }) => (
                      <EntryForm
                        type="Education"
                        entries={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.education && (
                    <p className="text-sm text-red-400 flex items-center gap-2 mt-3">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      {errors.education.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full shadow-lg"></div>
                  <h3 className="text-2xl font-bold text-white">Projects</h3>
                </div>
                
                <div className="p-6 border-2 border-gray-700 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:border-gray-600 transition-colors duration-300">
                  <Controller
                    name="projects"
                    control={control}
                    render={({ field }) => (
                      <EntryForm
                        type="Project"
                        entries={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.projects && (
                    <p className="text-sm text-red-400 flex items-center gap-2 mt-3">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      {errors.projects.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="preview" className="mt-8">
            {activeTab === "preview" && (
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    setResumeMode(resumeMode === "preview" ? "edit" : "preview")
                  }
                  className="h-12 px-6 bg-gray-800/50 border-2 border-gray-600 hover:border-purple-400 hover:bg-purple-500/10 text-gray-200 hover:text-white rounded-xl transition-all duration-300"
                >
                  {resumeMode === "preview" ? (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Markdown
                    </>
                  ) : (
                    <>
                      <Monitor className="mr-2 h-4 w-4" />
                      Show Preview
                    </>
                  )}
                </Button>
              </div>
            )}

            {activeTab === "preview" && resumeMode !== "preview" && (
              <div className="flex p-4 gap-3 items-center border-2 border-yellow-500/50 bg-yellow-500/10 text-yellow-300 rounded-xl mb-6 backdrop-blur-sm">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">
                  You will lose edited markdown if you update the form data.
                </span>
              </div>
            )}
            
            <div className="border-2 border-gray-700 rounded-2xl overflow-hidden bg-gray-800/30 backdrop-blur-sm">
              <MDEditor
                value={previewContent}
                onChange={setPreviewContent}
                height={800}
                preview={resumeMode}
                data-color-mode="dark"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}