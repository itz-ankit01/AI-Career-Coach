import { getOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

const IndustryInsightsPage = async () => {
  const { isOnboarded } = await getOnboardingStatus();

  if(!isOnboarded) {
    redirect('/onboarding');
  }
  return (
    <div>
      <h1>Industry Insights</h1>
      <p>Here you can find the latest insights and trends in the industry.</p>
    </div>
  )
}

export default IndustryInsightsPage
