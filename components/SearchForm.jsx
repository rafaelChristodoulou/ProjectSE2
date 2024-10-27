'use client';

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { useState } from 'react';
import { format } from "date-fns"
import { cn } from "@/lib/utils"


export default function SearchForm() {

  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const destinations = [
    { code: 'SFO', name: 'San Francisco' },
    { code: 'LAX', name: 'Los Angeles' },
    { code: 'JFK', name: 'New York' },
  ];

  const destinationsTo = [
    { code: 'LHR', name: 'London' },
    { code: 'CDG', name: 'Paris' },
    { code: 'NRT', name: 'Tokyo' },
  ];

  const handleSelectFrom = (destination) => setSelectedFrom(destination);
  const handleSelectTo = (destination) => setSelectedTo(destination);
  const handleDateSelect = (range) => {
    setStartDate(range?.from || null);
    setEndDate(range?.to || null);
  };


  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 md:p-10">
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal">
                  <PlaneIcon className="mr-2 h-4 w-4" />
                  <span>{selectedFrom ? selectedFrom : 'Select airport'}</span>
                  <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0" align="start">
                <div className="space-y-2 p-4">
                  <Input placeholder="Search airports" />
                  <div className="grid gap-2">
                  {destinations.map((destination) => (
                      <div
                        key={destination.code}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleSelectFrom(`${destination.name} (${destination.code})`)}
                      >
                        <PlaneIcon className="h-5 w-5" />
                        <span>{destination.name} ({destination.code})</span>
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
                  <span>{selectedTo ? selectedTo : 'Select airport'}</span>
                  <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0" align="start">
                <div className="space-y-2 p-4">
                  <Input placeholder="Search airports" />
                  <div className="grid gap-2">
                  {destinationsTo.map((destination) => (
                      <div
                        key={destination.code}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleSelectTo(`${destination.name} (${destination.code})`)}
                      >
                        <PlaneIcon className="h-5 w-5" />
                        <span>{destination.name} ({destination.code})</span>
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
        <div className="lex justify-center">
            <Button type="submit" className="w-full justify-center">
              Search
            </Button>
          </div>
      </div>
    </div>
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


function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}