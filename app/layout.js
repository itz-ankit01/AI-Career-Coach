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
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning >
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider appearance={{
          baseTheme: "dark",
        }}
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/** Header */}
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster richColors/>
            {/** Footer */}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with ❤️ by RM10</p>
              </div>
            </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
