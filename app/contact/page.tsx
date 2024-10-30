import { Metadata } from 'next'
import ContactUs from '@/components/ContactUs'
import Header from '@/components/Navbar/navbar'

export const metadata: Metadata = {
  title: 'Contact Us | SkyWings Airlines',
  description: 'Get in touch with SkyWings Airlines. We are here to help with your inquiries, feedback, and support needs.',
}

export default function ContactPage() {
  return (
    <main>
      <Header/>
      <ContactUs />
    </main>
  )
}