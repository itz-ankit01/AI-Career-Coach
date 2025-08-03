import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Target, BookOpen } from "lucide-react";
import React from "react";

const StatsCards = ({ assessments }) => {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;

    const total = assessments.reduce(
      (sum, assessment) => sum + (assessment.quizScore || 0),
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getLatestScore = () => {
    const latest = getLatestAssessment();
    if (!latest || latest.quizScore === undefined) return 0;
    return parseFloat(latest.quizScore).toFixed(1);
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + (assessment.questions?.length || 0),
      0
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreGlow = (score) => {
    if (score >= 80) return "shadow-emerald-500/20";
    if (score >= 60) return "shadow-yellow-500/20";
    return "shadow-red-500/20";
  };

  const averageScore = parseFloat(getAverageScore());
  const latestScore = parseFloat(getLatestScore());
  const totalQuestions = getTotalQuestions();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Average Score Card */}
      <Card className={`group relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-md hover:border-gray-600/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${getScoreGlow(averageScore)}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <CardTitle className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
            Average Score
          </CardTitle>
          <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm group-hover:scale-110 transition-all duration-300 ${getScoreGlow(averageScore)}`}>
            <Trophy className={`h-5 w-5 ${getScoreColor(averageScore)} group-hover:rotate-12 transition-all duration-300`} />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(averageScore)} transition-all duration-300`}>
            {averageScore}%
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-gray-800/80 hover:bg-gray-700/90 border border-gray-600 text-gray-200 px-3 py-1.5 text-xs backdrop-blur-sm transition-all duration-300 group-hover:border-gray-500">
              Across {assessments?.length || 0} assessments
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Latest Assessment Card */}
      <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-900/20 to-gray-900/90 border-gray-700/50 backdrop-blur-md hover:border-blue-600/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <CardTitle className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
            Latest Score
          </CardTitle>
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-800/30 to-gray-800/80 backdrop-blur-sm group-hover:scale-110 transition-all duration-300">
            <Target className="h-5 w-5 text-blue-400 group-hover:rotate-12 transition-all duration-300" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(latestScore)} transition-all duration-300`}>
            {latestScore}%
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-blue-900/80 hover:bg-blue-800/90 border border-blue-700 text-blue-200 px-3 py-1.5 text-xs backdrop-blur-sm transition-all duration-300 group-hover:border-blue-600">
              {latestScore > 0 ? 'Recent attempt' : 'No attempts yet'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Total Questions Card */}
      <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-gray-900/90 border-gray-700/50 backdrop-blur-md hover:border-purple-600/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <CardTitle className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
            Questions Completed
          </CardTitle>
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-800/30 to-gray-800/80 backdrop-blur-sm group-hover:scale-110 transition-all duration-300">
            <BookOpen className="h-5 w-5 text-purple-400 group-hover:rotate-12 transition-all duration-300" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-4xl font-bold text-purple-400 mb-2 transition-all duration-300">
            {totalQuestions}
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-purple-900/80 hover:bg-purple-800/90 border border-purple-700 text-purple-200 px-3 py-1.5 text-xs backdrop-blur-sm transition-all duration-300 group-hover:border-purple-600">
              Total answered
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;