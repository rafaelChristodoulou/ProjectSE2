import { Metadata } from 'next'
import AboutUs from '@/components/AboutUs'
import Header from '@/components/Navbar/navbar'

export const metadata: Metadata = {
  title: 'About Us | AMS Airlines',
  description: 'Learn about AMS Airlines history, mission, values, and our commitment to safe and comfortable air travel since 1998.',
}

export default function AboutPage() {
  return (
    <main>
      <Header/>
      <AboutUs />
    </main>
  )
}