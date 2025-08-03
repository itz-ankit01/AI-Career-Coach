import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import QuizList from "./_components/quiz-list";
import PerformanceChart from "./_components/performance-chart";

export default async function InterviewPage() {
 const assessments = await getAssessments();

 return (
   <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 p-6">
     {/* Header */}
     <div className="text-center mb-8">
       <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
         Interview Preparation
       </h1>
       <p className="text-gray-400 text-lg max-w-2xl mx-auto">
         Track your progress and improve your interview skills
       </p>
     </div>

     {/* Content */}
     <div className="max-w-7xl mx-auto space-y-8">
       <StatsCards assessments={assessments} />
       <PerformanceChart assessments={assessments} />
       <QuizList assessments={assessments} />
     </div>
   </div>
 );
}