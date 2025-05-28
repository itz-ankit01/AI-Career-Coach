import { getOnboardingStatus } from '@/actions/user';
import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding-form';
import { redirect } from 'next/navigation';

const OnboardingPage = async () =>{
  const { isOnboarded } = await getOnboardingStatus();

  if(isOnboarded) {
    redirect('/dashboard')
  }
  return (
    <main>
      <OnboardingForm industries={industries}/>
    </main>
  )
}

export default OnboardingPage
