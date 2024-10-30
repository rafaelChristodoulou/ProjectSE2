'use client'
import React, { useState } from 'react';
import Link from "next/link";
import { Menu, X, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
   
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-black hover:text-blue-700 transition-colors"
            prefetch={false}
          >
            <Plane className="h-8 w-8" />
            <span className="font-bold text-xl hidden sm:block">AMS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </nav>

          {/* Book Now Button (Desktop) */}
          <div className="hidden md:flex items-center">

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <nav className="flex flex-col px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 text-gray-600 hover:text-blue-600 font-medium border-b border-gray-100 last:border-0"
            >
              {item.label}
            </Link>
          ))}

        </nav>
      </div>
    </header>
  );
};

export default Navigation;


