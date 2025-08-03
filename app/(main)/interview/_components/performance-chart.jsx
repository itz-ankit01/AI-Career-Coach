"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments && assessments.length > 0) {
      // Sort assessments by date to ensure proper line progression
      const sortedAssessments = [...assessments].sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      
      const formattedData = sortedAssessments.map((assessment, index) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: parseFloat(assessment.quizScore) || 0, // Ensure it's a number
        attempt: index + 1, // Add attempt number for better tracking
      }));
      
      console.log('Chart data:', formattedData); // Debug log
      setChartData(formattedData);
    } else {
      setChartData([]);
    }
  }, [assessments]);

  // If no data, show a message
  if (!chartData || chartData.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Performance Trend
          </CardTitle>
          <CardDescription className="text-gray-400">Your quiz scores over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500">No assessment data available yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-gray-400">Your quiz scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid 
                strokeDasharray="5 5" 
                stroke="#4B5563" 
                opacity={0.6}
                horizontal={true}
                vertical={true}
              />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                fontSize={12}
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                domain={[0, 100]} 
                stroke="#9CA3AF"
                fontSize={12}
                tick={{ fill: '#9CA3AF' }}
                label={{ 
                  value: 'Score (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#9CA3AF' }
                }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-800/95 border border-gray-600 rounded-lg p-3 shadow-xl backdrop-blur-sm">
                        <p className="text-sm font-semibold text-white">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-gray-300">
                          Date: {label}
                        </p>
                        <p className="text-xs text-gray-400">
                          Attempt #{data.attempt}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6" // Explicit blue color
                strokeWidth={3}
                dot={{ 
                  fill: '#3B82F6', 
                  strokeWidth: 2, 
                  r: 6,
                  stroke: '#1E40AF'
                }}
                activeDot={{ 
                  r: 8, 
                  fill: '#60A5FA',
                  stroke: '#3B82F6',
                  strokeWidth: 2
                }}
                connectNulls={false}
              />
              {/* Add a gradient fill under the line */}
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#scoreGradient)"
                dot={{ 
                  fill: '#3B82F6', 
                  strokeWidth: 2, 
                  r: 6,
                  stroke: '#1E40AF'
                }}
                activeDot={{ 
                  r: 8, 
                  fill: '#60A5FA',
                  stroke: '#3B82F6',
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}