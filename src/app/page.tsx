import GoogleBooks from '@/components/GoogleBooks'
import { SignedIn } from '@clerk/nextjs'
import React from 'react'

export default function Home() {
  return (
    <div>
      <SignedIn>
        <GoogleBooks />
      </SignedIn>
    </div>
  )
}