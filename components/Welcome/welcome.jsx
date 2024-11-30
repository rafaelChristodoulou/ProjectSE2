import Link from "next/link"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { typeResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface.js';
import SearchForm from "@/components/SearchForm"
import Footer from "@/components/Footer/Footer"

export default function Welcome(){

return(
<main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  AMS airlines
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Take flight with ease! Our Airline Management System streamlines operations, from booking to baggage handling. Experience seamless scheduling, real-time tracking, and superior customer service—all in one powerful platform. Ready for takeoff?
                </p>
                <div className="mt-6 flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] overflow-hidden rounded-xl flex items-center justify-center">
              
                <img src="airplaine.png"  className="absolute object-cover"/>
              </div>
            </div>
          </div>
        </section>

        <SearchForm data-testid="search-form"></SearchForm>
      <section>
        <h1 className="lg:leading-tighter text-3xl flex justify-center pt-20 font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    Top Destinations
        </h1>
        <p className="mx-auto max-w-[700px] text-center pt-10 text-muted-foreground md:text-xl">
                  This summer treat yourself, Below you can see this websites most visited and most highly rated destinations!!
        </p>
       <div className="flex justify-center gap-4 pt-20">          
      <div className="w-32 h-48 overflow-hidden rounded-full">
        <HoverCard>
        <HoverCardTrigger >
          <img src="paris.jpg" alt="Oval" className="object-cover w-full h-full" />
        
        </HoverCardTrigger>
        <HoverCardContent className="w-24 gap-6">Paris</HoverCardContent>
        </HoverCard>
      </div>
      <div className="w-32 h-48 overflow-hidden rounded-full">
        <HoverCard>
        <HoverCardTrigger>
          <img src="Japan1.jpg" alt="Oval" className="object-cover w-full h-full" />
        </HoverCardTrigger>
        <HoverCardContent className="w-24 gap-6">Tokyo</HoverCardContent>
        </HoverCard>
      </div>
      <div className="w-32 h-48 overflow-hidden rounded-full">
      <HoverCard>
      <HoverCardTrigger>
        <img src="abuDhabi.jpg" alt="Oval" className="object-cover w-full h-full" />
        </HoverCardTrigger>
        <HoverCardContent className="w-24 gap-6">Abu Dhabi</HoverCardContent>
        </HoverCard>
      </div>
      <div className="w-32 h-48 overflow-hidden rounded-full">
      <HoverCard>
      <HoverCardTrigger>
        <img src="greece.jpg" alt="Oval" className="object-cover w-full h-full" />
        </HoverCardTrigger>
        <HoverCardContent className="w-24 gap-6">Mykonos</HoverCardContent>
        </HoverCard>
      </div>
    </div>
    <div className="pt-20">
    <Footer> </Footer>

    </div>
    </section>
      </main>

  
)

}