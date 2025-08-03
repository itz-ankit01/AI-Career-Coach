import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata = {
  title: "Sensai - AI Career Coach",
  description: "Made with ❤️ by RM10",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
      appearance={{
        baseTheme: "dark",
        variables: {
          colorPrimary: "#6366f1",
          colorDanger: "#ef4444",
          colorSuccess: "#10b981",
          colorWarning: "#f59e0b",
          fontFamily: "var(--font-inter)",
        },
        elements: {
          formButtonPrimary: {
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #5856eb 0%, #7c3aed 100%)",
            }
          },
         
        }
      }}
    >
      <html lang="en" suppressHydrationWarning  className={inter.variable}>
        <body className={`${inter.className} font-sans antialiased`}>
          <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Background Elements */}
            <div className="fixed inset-0 -z-50 overflow-hidden">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
              
              {/* Moving Background Orbs */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse opacity-70"></div>
              <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000 opacity-70"></div>
              <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000 opacity-70"></div>
              
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(51,65,85,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(51,65,85,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            </div>

            {/* Main App Container */}
            <div className="relative min-h-screen flex flex-col">
              {/* Header */}
              <Header />
              
              {/* Main Content */}
              <main className="flex-1 relative">
                <div className="relative z-10">
                  {children}
                </div>
              </main>
              
              {/* Enhanced Footer */}
              <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/60 backdrop-blur-xl">
                {/* Footer Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                
                <div className="relative">
                  {/* Main Footer Content */}
                  <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                      {/* Brand Section */}
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                          </div>
                          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Sensai
                          </h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-md">
                          Your AI-powered career coach helping professionals advance their careers with personalized guidance and interview preparation.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex space-x-4 mt-6">
                          <a href="#" className="w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-center transition-colors duration-200 group">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          </a>
                          <a href="#" className="w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-center transition-colors duration-200 group">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                          <a href="#" className="w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-center transition-colors duration-200 group">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                      
                      {/* Quick Links */}
                      <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                          <li><a href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">Dashboard</a></li>
                          <li><a href="/interview-prep" className="text-gray-400 hover:text-white transition-colors duration-200">Interview Prep</a></li>
                          <li><a href="/career-advice" className="text-gray-400 hover:text-white transition-colors duration-200">Career Advice</a></li>
                          <li><a href="/resources" className="text-gray-400 hover:text-white transition-colors duration-200">Resources</a></li>
                        </ul>
                      </div>
                      
                      {/* Support */}
                      <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                          <li><a href="/help" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                          <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
                          <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                          <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-slate-800/50 pt-8">
                      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                          © 2024 Sensai. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-400">Made with</span>
                          <span className="text-red-400 animate-pulse">❤️</span>
                          <span className="text-gray-400">by</span>
                          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                            RM10
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            
            {/* Enhanced Toaster */}
            <Toaster 
              richColors
              position="top-right"
              toastOptions={{
                style: {
                  background: 'rgba(15, 23, 42, 0.9)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(51, 65, 85, 0.3)',
                  color: '#f1f5f9',
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}