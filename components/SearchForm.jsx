'use client';

import * as React from "react"
import { useState, useEffect } from 'react';
import { format } from "date-fns"
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api'
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Clock, DollarSign } from 'lucide-react';


const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 0,
  lng: 0
}

export default function FlightSearchAndRouteMap() {

  const [airports, setAirports] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [route, setRoute] = useState([]);
  const [error, setError] = useState('');
  const [flights, setFlights] = useState([]); 
  const [loading, setLoading] = useState(false); 


  useEffect(() => {
    fetch('/api/airports')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (!response.headers.get('content-type')?.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        return response.json();
      })
      .then(data => setAirports(data))
      .catch(error => {
        console.error('Error fetching airports:', error);
        setError('Failed to load airports');
      });
  }, []);


  const handleSelectFrom = (airport) => setSelectedFrom(airport);
  const handleSelectTo = (airport) => setSelectedTo(airport);

  const  calculateRoute = async() => {
    setError('');
    setLoading(true);

    if (!selectedFrom || !selectedTo) {
      setError('Please select both origin and destination airports.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/flights?from=${encodeURIComponent(selectedFrom.name)}&to=${encodeURIComponent(selectedTo.name)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const flightData = await response.json();
      setFlights(flightData);


    setRoute([
      { lat: Number(selectedFrom.latitude), lng: Number(selectedFrom.longitude) },
      { lat: Number(selectedTo.latitude), lng: Number(selectedTo.longitude) }
    ]);

  } catch (error) {
    console.error('Error fetching flights:', error);
    setError('Failed to fetch flight information');
  } finally {
    setLoading(false);
  }
  };

  return (
    
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Flight Search and Route Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal">
                    <PlaneIcon className="mr-2 h-4 w-4" />
                    <span>{selectedFrom ? `${selectedFrom.name} (${selectedFrom.code})` : 'Select airport'}</span>
                    <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <div className="space-y-2 p-4">
                    <Input placeholder="Search airports" />
                    <div className="grid gap-2 max-h-[300px] overflow-y-auto">
                      {airports.map((airport) => (
                        <div
                          key={airport.id}
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => handleSelectFrom(airport)}
                        >
                          <PlaneIcon className="h-5 w-5" />
                          <span>{airport.name} ({airport.code})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal">
                    <PlaneIcon className="mr-2 h-4 w-4" />
                    <span>{selectedTo ? `${selectedTo.name} (${selectedTo.code})` : 'Select airport'}</span>
                    <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <div className="space-y-2 p-4">
                    <Input placeholder="Search airports" />
                    <div className="grid gap-2 max-h-[300px] overflow-y-auto">
                      {airports.map((airport) => (
                        <div
                          key={airport.id}
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => handleSelectTo(airport)}
                        >
                          <PlaneIcon className="h-5 w-5" />
                          <span>{airport.name} ({airport.code})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dates">Starting Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarDaysIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dates">Finish Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarDaysIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={calculateRoute} className="w-full justify-center">
              Search and Show Route
            </Button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}

          {flights.length > 0 && (
  <div className="mt-4">
    <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
    <div className="space-y-4">
      {flights.map((flight, index) => (
        <Card key={index} className="max-w-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col space-y-4">
            {/* Flight route and time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">From</span>
                  <span className="text-lg font-semibold">
                    {flight.from_airport} ({flight.from_code})
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <PlaneIcon className="w-5 h-5 text-blue-500 rotate-90" />
                  <div className="w-24 h-px bg-gray-300 my-2"></div>
                  <span className="text-sm text-gray-500">Direct</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">To</span>
                  <span className="text-lg font-semibold">
                    {flight.to_airport} ({flight.to_code})
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{flight.duration}</span>
                </div>
                <span className="text-lg font-semibold">
                  {flight.departuretime} - {flight.arrivaltime}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Bottom section with price and details */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-sm text-gray-500">{flight.airline}</span>
                  <div className="text-xs text-gray-400">{flight.aircraft}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold">{flight.price}</span>
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Select
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
)}







          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={2}
            >
              {route.length > 0 && (
                <>
                  <Marker position={route[0]} />
                  <Marker position={route[route.length - 1]} />
                  <Polyline
                    path={route}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 1,
                      strokeWeight: 2,
                      geodesic: true,
                    }}
                  />
                </>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </CardContent>
    </Card>
  )
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}