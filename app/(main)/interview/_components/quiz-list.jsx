"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy, Calendar, Plus, TrendingUp } from "lucide-react";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 80) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    if (score >= 60) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    return "bg-red-500/20 text-red-300 border-red-500/30";
  };

  if (!assessments || assessments.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-gray-400">
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button 
              onClick={() => router.push("/interview/mock")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No quizzes taken yet</p>
            <p className="text-gray-600 text-sm mt-2">Start your first quiz to track your progress</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-gray-400">
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button 
              onClick={() => router.push("/interview/mock")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-124 overflow-y-auto pr-2 custom-scrollbar">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="group cursor-pointer bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-gray-600/50 hover:border-gray-500/70 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50 hover:-translate-y-1"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      Quiz {i + 1}
                    </CardTitle>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getScoreBadgeColor(assessment.quizScore)}`}>
                      {assessment.quizScore.toFixed(1)}%
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mt-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(
                      new Date(assessment.createdAt),
                      "MMM dd, yyyy 'at' HH:mm"
                    )}
                  </div>
                </CardHeader>
                {assessment.improvementTips && (
                  <CardContent className="pt-0">
                    <div className="bg-gray-800/60 rounded-lg p-3 border-l-4 border-blue-500/50">
                      <p className="text-sm text-gray-300 italic">
                        💡 {assessment.improvementTips}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-gray-700/50 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Quiz Results
            </DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.8);
        }
      `}</style>
    </>
  );
}