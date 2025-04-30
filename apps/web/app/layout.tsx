import type { Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './components/Navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PeerUp: Learning Platform',
  description: 'Your Educational Journey Begins Here !',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <ClerkProvider signInUrl="/sign-in"
    signUpUrl="/sign-up"
    afterSignInUrl="/" // or your landing page
    afterSignUpUrl="/">
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar/>
          {children}
          <Toaster position='top-center'/>
        </body>
      </html>
    </ClerkProvider>
  )
}