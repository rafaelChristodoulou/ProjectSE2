
import Link from "next/link"
export default function Header(){
    return(

    <header className="sticky top-0 z-50 flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-muted text-card-foreground">
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Home
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Services
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
      </nav>
    </header>
  )
}


