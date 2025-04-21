import React from 'react'

async function  AIcoverLetterDetailPage ({params}) {
  const id  = await params.id; // Extract the id from the params object
  return (
    <div>
      
      <h1>Cover Letter ID: {id}</h1>
      <p>Here you can view the details of your AI-generated cover letter.</p>
    </div>
  )
}

export default AIcoverLetterDetailPage
