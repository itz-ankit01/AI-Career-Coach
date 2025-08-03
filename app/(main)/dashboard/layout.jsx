import React, { Suspense } from 'react'
import { BarLoader } from "react-spinners";

function Layout({children}) {
  return (
    <div className='mt-0 min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900'>
      <div className='px-6 lg:px-8 py-8'>
        {/* Header Section */}
        <div className='flex items-center justify-center mb-12'>
          <div className='text-center space-y-4'>
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight leading-tight'>
              Industry Insights
            </h1>
            <div className='w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-blue-500/25'></div>
            <p className='text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed'>
              Real-time analytics and market intelligence for informed decision making
            </p>
          </div>
        </div>

        {/* Loading State */}
        <Suspense 
          fallback={
            <div className="flex flex-col items-center justify-center space-y-6 py-12">
              <div className="relative">
                <BarLoader 
                  width={300} 
                  height={6}
                  color="#3b82f6" 
                  className="rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-50"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-gray-300 text-lg font-medium">Loading insights...</p>
                <p className="text-gray-500 text-sm">Fetching the latest market data</p>
              </div>
            </div>
          }
        >
          <div className='max-w-7xl mx-auto'>
            {children}
          </div>
        </Suspense>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default Layout