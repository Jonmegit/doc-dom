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
  const publicRoutes = ["/login", "/registro", "/recuperar-password", "/activar", "/espera-activacion"]
  const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Rutas de autenticación que redirigen a dashboard si ya está autenticado
  const authRoutes = ["/login", "/registro", "/recuperar-password"]
  const isAuthRoute = authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Si el usuario está autenticado y trata de acceder a una ruta de auth, redirigir al dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Si el usuario no está autenticado y trata de acceder a una ruta protegida, redirigir a login
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Si el usuario está autenticado, verificar si su perfil está activo
  if (session && !isPublicRoute) {
    // Consultar el estado de activación del perfil
    const { data: profile } = await supabase.from("profiles").select("active").eq("id", session.user.id).single()

    // Si el perfil no está activo y no está en la página de espera, redirigir
    if (profile && !profile.active && !req.nextUrl.pathname.startsWith("/espera-activacion")) {
      return NextResponse.redirect(new URL("/espera-activacion", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
