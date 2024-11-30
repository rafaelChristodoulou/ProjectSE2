'use client';

import { useEffect,Suspense } from 'react';
import { useRouter } from 'next/navigation';
import UserBookingsPage from '@/components/UserBookings';
import Navigation from '@/components/Navbar/navbar';

export default function BookingsPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');

    // If not logged in, redirect to login page
    if (!isLoggedIn || !userId) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navigation />
      <Suspense fallback={<div>Loading your bookings...</div>}>
        <UserBookingsPage />
      </Suspense>
    </div>
  );
}