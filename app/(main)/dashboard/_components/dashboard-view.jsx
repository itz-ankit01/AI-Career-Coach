"use client";
import {
  Brain,
  Briefcase,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function DashboardView({ insights }) {
  const salaryData = insights.salaryRange.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "medium":
        return "bg-gradient-to-r from-yellow-500 to-amber-600";
      case "low":
        return "bg-gradient-to-r from-red-500 to-red-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-600";
    }
  };

  const getDemandLevelGlow = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "shadow-lg shadow-green-500/20";
      case "medium":
        return "shadow-lg shadow-yellow-500/20";
      case "low":
        return "shadow-lg shadow-red-500/20";
      default:
        return "shadow-lg shadow-gray-500/20";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return {
          icon: TrendingUp,
          color: "text-green-400",
          glow: "shadow-lg shadow-green-500/20",
          bg: "bg-green-500/10 border-green-500/30",
        };
      case "neutral":
        return {
          icon: LineChart,
          color: "text-yellow-400",
          glow: "shadow-lg shadow-yellow-500/20",
          bg: "bg-yellow-500/10 border-yellow-500/30",
        };
      case "negative":
        return {
          icon: TrendingDown,
          color: "text-red-400",
          glow: "shadow-lg shadow-red-500/20",
          bg: "bg-red-500/10 border-red-500/30",
        };
      default:
        return {
          icon: LineChart,
          color: "text-gray-400",
          glow: "shadow-lg shadow-gray-500/20",
          bg: "bg-gray-500/10 border-gray-500/30",
        };
    }
  };

  const outlookInfo = getMarketOutlookInfo(insights.marketOutlook);
  const OutlookIcon = outlookInfo.icon;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight">
              Market Analytics Dashboard
            </h1>
            <p className="text-gray-400 text-lg">
              Real-time market insights and trends
            </p>
          </div>
          <Badge
            variant="outline"
            className="bg-gray-800/80 border-gray-600 text-gray-200 px-4 py-2 backdrop-blur-sm"
          >
            Last updated: {lastUpdatedDate}
          </Badge>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className={`bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${outlookInfo.glow}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-200">
                Market Outlook
              </CardTitle>
              <div
                className={`p-2 rounded-lg ${outlookInfo.bg} backdrop-blur-sm`}
              >
                <OutlookIcon className={`h-5 w-5 ${outlookInfo.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">
                {insights.marketOutlook}
              </div>
              <Badge className="bg-gray-800/80 border-gray-600 text-gray-200 px-4 py-2 backdrop-blur-sm">
                Next update: {nextUpdateDistance}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-200">
                Industry Growth
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {insights.growthRate.toFixed(1)}%
              </div>
              <Progress
                value={insights.growthRate}
                className="h-2 bg-gray-700"
              />
              <p className="text-sm text-gray-400 mt-2">
                Year over year growth
              </p>
            </CardContent>
          </Card>

          <Card
            className={`bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${getDemandLevelGlow(
              insights.demandLevel
            )}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-200">
                Demand Level
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
                <Briefcase className="h-5 w-5 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {insights.demandLevel}
              </div>
              <div
                className={`h-3 w-full rounded-full ${getDemandLevelColor(
                  insights.demandLevel
                )} shadow-sm`}
              ></div>
              <p className="text-sm text-gray-400 mt-2">
                Current market demand
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-200">
                Top Skills
              </CardTitle>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
                <Brain className="h-5 w-5 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.topSkills.map((skill, index) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className={`${
                      index === 0
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        : index === 1
                        ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                        : index === 2
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : "bg-orange-500/20 text-orange-300 border-orange-500/30"
                    } backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Salary Chart */}
        <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardHeader className="border-b border-gray-700 bg-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-white">
                  Salary Ranges by Role
                </CardTitle>
                <CardDescription className="text-gray-400 mt-1">
                  Displaying minimum, median and maximum salaries (in thousands)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barGap={10}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    axisLine={{ stroke: "#4B5563" }}
                  />
                  <YAxis
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    axisLine={{ stroke: "#4B5563" }}
                    label={{
                      value: "Salary (K)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fill: "#9CA3AF" },
                    }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-gray-800/95 border border-gray-600 rounded-xl p-4 shadow-2xl backdrop-blur-sm">
                            <p className="font-bold text-lg text-white mb-2">
                              {label} Developer
                            </p>
                            {payload.map((item) => (
                              <p
                                key={item.name}
                                className="text-sm flex items-center gap-2 mb-1"
                              >
                                <div
                                  className="w-3 h-3 rounded-full shadow-sm"
                                  style={{ backgroundColor: item.fill }}
                                ></div>
                                <span className="font-medium text-gray-300">
                                  {item.name}:
                                </span>
                                <span className="font-bold text-green-400">
                                  ${item.value}K
                                </span>
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="min"
                    fill="#ef4444"
                    name="Min Salary (K)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="median"
                    fill="#3b82f6"
                    name="Median Salary (K)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="max"
                    fill="#10b981"
                    name="Max Salary (K)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Trends */}
     

        {/* Key Trends and Recommended Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
            <CardHeader className="border-b border-gray-700 bg-gray-800/50">
              <div className=" pt-4 flex items-center gap-3">
                <div className=" p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">
                    Key Industry Trends
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    Current trends shaping the industry
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {insights.keyTrends.map((trend, index) => (
                  <li key={index} className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-sm group-hover:shadow-blue-400/50 transition-all duration-200"></div>
                    </div>
                    <span className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-200 font-medium">
                      {trend}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
            <CardHeader className="border-b border-gray-700 bg-gray-800/50">
              <div className="flex items-center gap-3 pt-4">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">
                    Recommended Skills
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    Skills to consider developing
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                {insights.recommendedSkills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="outline" 
                    className={`px-3 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-default ${
                      index % 4 === 0 ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 hover:shadow-emerald-500/25' :
                      index % 4 === 1 ? 'bg-teal-500/10 text-teal-300 border-teal-500/30 hover:bg-teal-500/20 hover:shadow-teal-500/25' :
                      index % 4 === 2 ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20 hover:shadow-cyan-500/25' :
                      'bg-green-500/10 text-green-300 border-green-500/30 hover:bg-green-500/20 hover:shadow-green-500/25'
                    } backdrop-blur-sm`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;