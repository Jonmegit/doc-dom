import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Verificar si el usuario está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rutas públicas que no requieren autenticación
  const publicRoutes = [
    "/",
    "/planes",
    "/checkout",
    "/login",
    "/registro",
    "/recuperar-password",
    "/verificar",
    "/checkout/confirmacion",
    "/terminos",
    "/privacidad",
  ]
  const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Rutas de autenticación que redirigen a dashboard si ya está autenticado
  const authRoutes = ["/login", "/registro", "/recuperar-password"]
  const isAuthRoute = authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Si el usuario está autenticado y trata de acceder a una ruta de auth, redirigir al dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Si el usuario no está autenticado y trata de acceder a una ruta protegida, redirigir a login
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Si el usuario está autenticado, verificar si su perfil está verificado
  if (session && !isPublicRoute) {
    // Consultar el estado de verificación del perfil
    const { data: profile } = await supabase.from("profiles").select("verified").eq("id", session.user.id).single()

    // Si el perfil no está verificado y no está en la página de verificación, redirigir
    if (profile && !profile.verified && !req.nextUrl.pathname.startsWith("/verificar")) {
      return NextResponse.redirect(new URL("/verificar", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
