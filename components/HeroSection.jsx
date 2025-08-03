'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useCallback } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function HeroSection() {
    const imageRef = useRef(null)
    const rafRef = useRef(null)
    const lastScrollY = useRef(0)

    const handleScroll = useCallback(() => {
        // Cancel previous animation frame
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = requestAnimationFrame(() => {
            const imageElement = imageRef.current
            if (!imageElement) return

            const scrollPosition = window.scrollY
            const scrollThreshold = 100
            
            // Only update if scroll position changed significantly
            if (Math.abs(scrollPosition - lastScrollY.current) > 5) {
                if (scrollPosition > scrollThreshold) {
                    if (!imageElement.classList.contains('scrolled')) {
                        imageElement.classList.add('scrolled')
                    }
                } else {
                    if (imageElement.classList.contains('scrolled')) {
                        imageElement.classList.remove('scrolled')
                    }
                }
                lastScrollY.current = scrollPosition
            }
        })
    }, [])

    useEffect(() => {
        // Passive event listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true })
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
            // Clean up animation frame on unmount
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [handleScroll])

    return (
        <section className='relative w-full pt-36 md:pt-48 pb-16 overflow-hidden'>
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className='relative z-10 space-y-10 text-center px-4 md:px-6'>
                <div className='space-y-8 mx-auto max-w-5xl'>
                    <h1 className='text-4xl font-bold md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight tracking-tight'>
                        Your AI Career Coach for
                        <br />
                        <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse'>
                            Professional Success
                        </span>
                    </h1>
                    
                    <div className='w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-blue-500/25 animate-pulse'></div>
                    
                    <p className='mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl leading-relaxed font-light'>
                        Advance your career with personalised guidance, interview prep, and 
                        AI-powered tools for job seekers and professionals.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8 pt-4'>
                    <Link href="/dashboard">
                        <Button 
                            className='px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 border-0 min-w-[160px]'
                            size='lg'
                        >
                            Get Started
                        </Button>
                    </Link>
                    <Link href="https://www.youtube.com/watch?v=X464tZQi6Is&list=RDMMX464tZQi6Is&start_radio=1" target='_blank'>
                        <Button 
                            className='px-10 py-4 bg-gray-900/80 border-gray-600 text-gray-200 hover:bg-white hover:text-gray-900 hover:border-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm min-w-[160px]'
                            size='lg' 
                            variant={'outline'}
                        >
                            Watch Demo
                        </Button>
                    </Link>
                </div>

                <div className='hero-image-wrapper mt-12 md:mt-16 px-4 md:px-8'>
                    <div ref={imageRef} className='hero-image relative group max-w-6xl mx-auto'>
                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Image Container */}
                        <div className="relative">
                            <Image
                                src={"/banner.jpeg"}
                                alt="AI Career Coach"
                                width={1280}
                                height={720}
                                className="rounded-2xl shadow-2xl border-2 border-gray-700/50 mx-auto transform group-hover:scale-[1.02] transition-all duration-500 backdrop-blur-sm"
                                priority
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
                            
                            {/* Corner Accents */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400/50 rounded-tl-lg"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/50 rounded-tr-lg"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-pink-400/50 rounded-bl-lg"></div>
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50 rounded-br-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection