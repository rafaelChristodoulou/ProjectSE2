import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Users, Globe, Shield, LucideIcon } from 'lucide-react';

interface Statistic {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface CoreValue {
  title: string;
  description: string;
}

const AboutUs: React.FC = () => {
  const stats: Statistic[] = [
    { icon: <Plane className="w-6 h-6" />, value: "150+", label: "Aircraft" },
    { icon: <Globe className="w-6 h-6" />, value: "120+", label: "Destinations" },
    { icon: <Users className="w-6 h-6" />, value: "20M+", label: "Passengers Yearly" },
    { icon: <Shield className="w-6 h-6" />, value: "25+", label: "Years of Service" }
  ];

  const values: CoreValue[] = [
    {
      title: "Safety First",
      description: "Safety is our top priority. We maintain the highest standards of aircraft maintenance and crew training."
    },
    {
      title: "Customer Excellence",
      description: "We are committed to providing exceptional service and comfort to every passenger on every flight."
    },
    {
      title: "Innovation",
      description: "Continuously investing in modern technology and sustainable practices to shape the future of aviation."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-200 text-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Flying Dreams to Reality
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl opacity-90">
            Since 1998, AMS Airlines has been connecting people, places, and cultures with safe, comfortable, and reliable air travel.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center text-blue-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            To provide safe, reliable, and comfortable air travel while connecting people and cultures across the globe. We strive to make air travel accessible, sustainable, and enjoyable for everyone.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="prose max-w-3xl mx-auto text-gray-600">
            <p className="mb-6">
              Founded in 1998, AMS Airlines began with just three aircraft serving five domestic routes. Today, we&apos;ve grown into one of the region&apos;s leading carriers, connecting millions of passengers to destinations worldwide.
            </p>
            <p className="mb-6">
              Our commitment to innovation has driven us to maintain one of the youngest and most efficient fleets in the industry. We&apos;ve consistently invested in the latest technology and sustainable practices to reduce our environmental impact.
            </p>
            <p>
              As we look to the future, we remain dedicated to our founding principles of safety, service, and sustainability while embracing new technologies and opportunities to better serve our passengers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;