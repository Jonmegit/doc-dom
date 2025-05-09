import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="font-bold">DocManager</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/#caracteristicas" className="font-medium transition-colors hover:text-primary">
                Características
              </Link>
              <Link href="/#contacto" className="font-medium transition-colors hover:text-primary">
                Contacto
              </Link>
              <Link href="/planes">
                <Button variant="outline">Ver planes</Button>
              </Link>
              <Link href="/login">
                <Button>Iniciar sesión</Button>
              </Link>
            </nav>
            <div className="flex md:hidden">
              <Button variant="ghost" size="icon" className="text-primary">
                <svg
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
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} DocManager. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/terminos" className="text-sm text-muted-foreground hover:text-foreground">
                Términos
              </Link>
              <Link href="/privacidad" className="text-sm text-muted-foreground hover:text-foreground">
                Privacidad
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
