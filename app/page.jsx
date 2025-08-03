import HeroSection from "@/components/HeroSection";
import "./globals.css";
import { features } from "@/data/features";
import { Card, CardContent } from "@/components/ui/card";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import Image from "next/image";
import { faqs } from "@/data/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="grid-background opacity-20"></div>
      <HeroSection />

      {/* Features Section */}
      <section className="relative flex justify-center items-center w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
              Powerful Features for Your Career Growth
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full shadow-lg"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto max-w-6xl">
            {features.map((feature, index) => {
              return (
                <Card
                  key={index}
                  className="bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 hover:border-gray-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 group"
                >
                  <CardContent className="cursor-pointer flex flex-col items-center justify-center text-center pt-8 pb-6 px-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative flex justify-center items-center w-full py-16 md:py-24 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-3 group hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">50+</h3>
              <p className="text-gray-300 font-medium">Industries Covered</p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 group hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">1000+</h3>
              <p className="text-gray-300 font-medium">Interview Questions</p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 group hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">95%</h3>
              <p className="text-gray-300 font-medium">Success rate</p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 group hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">24/7</h3>
              <p className="text-gray-300 font-medium">AI Support</p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative flex justify-center items-center w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-300 text-lg">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto max-w-6xl">
            {howItWorks.map((item, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer flex flex-col items-center text-center space-y-6 group hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 backdrop-blur-sm border border-gray-700 group-hover:border-gray-600">
                      {item.icon}
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>
                  <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative flex justify-center items-center w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-gray-900/30 to-gray-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
              What Our Users Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-lg"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => {
              return (
                <Card key={index} className="bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 hover:border-gray-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 group">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="flex flex-col space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-14 w-14 flex-shrink-0">
                          <Image
                            width={56}
                            height={56}
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="rounded-full object-cover border-2 border-primary/20"
                          />
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg">{testimonial.author}</p>
                          <p className="text-sm text-gray-300">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-blue-400 font-medium">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote className="relative">
                        <p className="text-gray-300 italic leading-relaxed relative pl-6">
                          <span className="text-4xl text-blue-400 absolute -top-2 -left-2 font-serif">
                            "
                          </span>
                          {testimonial.quote}
                          <span className="text-4xl text-blue-400 absolute -bottom-6 right-0 font-serif">
                            "
                          </span>
                        </p>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative flex justify-center items-center w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-300 text-lg">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Accordion type="single" collapsible className='w-full space-y-4'>
              {faqs.map((faq, index) => {
                return (
                  <AccordionItem 
                    value={`item-${index + 1}`} 
                    key={index}
                    className="bg-gray-900/80 border-gray-700 rounded-xl px-6 backdrop-blur-sm hover:bg-gray-800/80 transition-colors duration-300"
                  >
                    <AccordionTrigger className="text-white hover:text-blue-300 transition-colors duration-300 text-left py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-18">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm"></div>
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Ready to Accelerate Your Career?
            </h2>

            <p className="mx-auto max-w-[700px] text-white/90 text-lg md:text-xl leading-relaxed">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>

            <Link href='/dashboard' passHref>
              <Button 
                size='lg' 
                variant='secondary' 
                className='h-14 px-8 mt-8 bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg group'
              >
                Start Your Journey Today 
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}