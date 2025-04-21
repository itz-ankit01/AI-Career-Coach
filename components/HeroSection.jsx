'use client'

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function HeroSection() {
    const imageRef = useRef(null)

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollthreshold = 100;
    
            if(scrollPosition > scrollthreshold) {
                imageElement.classList.add('scrolled');
            } else {
                imageElement.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, [])
  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
      <div className='space-y-6 text-center'>
        <div className='space-y-6 mx-auto'>
            <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:8-xl gradient-title'>
                Your AI Career Coach for
                <br />
                Professional Success
            </h1>
            <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                Advance your career with personalised guidance, interview prep, and 
                AI-powered tools for job seekers and professionals.
            </p>
        </div>

        <div className='flex justify-center gap-4 md:gap-6'>
            <Link href="/dashboard">
                <Button className='px-8'size='lg' >
                    Get Started
                </Button>
            </Link>
            <Link href="https://www.youtube.com/watch?v=X464tZQi6Is&list=RDMMX464tZQi6Is&start_radio=1" target='_blank'>
                <Button className='px-8'size='lg' variant={'outline'}>
                    Watch Demo
                </Button>
            </Link>
        </div>


        <div className='hero-image-wrapper mt-5 md:mt-0'>
            <div ref={imageRef} className='hero-image'>
                <Image
                src={"/banner.jpeg"}
                alt="AI Career Coach"
                width={1280}
                height={720}
                className=" rounded-lg shadow-2xl border mx-auto "
                priority
                />
            </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
