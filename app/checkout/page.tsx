"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Define the type for flight data
interface FlightData {
  airline: string
  flight_number: string
  from_airport: string
  from_code: string
  to_airport: string
  to_code: string
  departuretime: string
  arrivaltime: string
  duration: string
  aircraft: string
  price: number
}

export default function AirlineCheckout() {

  
  const searchParams = useSearchParams()
  const [flightData, setFlightData] = useState<FlightData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    const flightParam = searchParams.get('flight')
    if (flightParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(flightParam))
        setFlightData(decoded as FlightData)
      } catch (error) {
        console.error('Error parsing flight data:', error)
      }
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      setShowConfirmation(true)
    }, 2000)
  }

  if (!flightData) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading flight details...
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Loading Checkout...</div>}>
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Flight Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Airline:</strong> {flightData.airline}</p>
                <p><strong>Flight:</strong> {flightData.flight_number}</p>
                <p><strong>From:</strong> {flightData.from_airport} ({flightData.from_code})</p>
                <p><strong>To:</strong> {flightData.to_airport} ({flightData.to_code})</p>
                <p><strong>Departure:</strong> {flightData.departuretime}</p>
                <p><strong>Arrival:</strong> {flightData.arrivaltime}</p>
                <p><strong>Duration:</strong> {flightData.duration}</p>
                <p><strong>Aircraft:</strong> {flightData.aircraft}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Price Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Fare</span>
                  <span>${(flightData.price * 0.85).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>${(flightData.price * 0.15).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${flightData.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Passenger Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </CardContent>
            </Card>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input id="nameOnCard" required />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms">
                    I agree to the terms and conditions
                  </Label>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : `Pay $${flightData.price}`}
            </Button>
          </form>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful</DialogTitle>
            <DialogDescription>
              Your payment of ${flightData.price} has been processed successfully. Your booking is confirmed!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button onClick={() => setShowConfirmation(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </Suspense>
  )
}