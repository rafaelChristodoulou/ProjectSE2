'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Booking {
  id: string
  flight_number: string
  from_airport: string
  to_airport: string
  departure_time: string
  price: number
}

export default function UserBookingsPage() {
  const searchParams = useSearchParams()
  const userId = localStorage.getItem('userId');
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetchBookings()
    }
  }, [userId])

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/bookings?userId=${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch bookings')
      }
      const data = await response.json()
      setBookings(data.bookings)
    } catch (error) {
      console.error("Unable to fetch bookings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      if (response.ok) {
        await fetchBookings()
        alert("Your booking has been successfully cancelled.")
      } else {
        throw new Error('Failed to delete booking')
      }
    } catch (error) {
      alert("Failed to cancel booking. Please try again.")
    }
  }

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Please log in to view your bookings.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Loading bookings...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no current bookings.</p>
      ) : (
        bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Flight {booking.flight_number}</span>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(booking.id)}
                >
                  Cancel Booking
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">From:</span>
                  <span className="text-gray-900">{booking.from_airport}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">To:</span>
                  <span className="text-gray-900">{booking.to_airport}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Departure Time:</span>
                  <span className="text-gray-900">{booking.departure_time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Price:</span>
                  <span className="text-green-600 font-semibold">{booking.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}