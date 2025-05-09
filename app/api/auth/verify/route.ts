import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid_token", request.url))
  }

  const supabase = createRouteHandlerClient({ cookies })

  try {
    // Buscar el token en la base de datos
    const { data: tokenData, error: tokenError } = await supabase
      .from("verification_tokens")
      .select("user_id, expires_at")
      .eq("token", token)
      .single()

    if (tokenError || !tokenData) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", request.url))
    }

    // Verificar si el token ha expirado
    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.redirect(new URL("/login?error=expired_token", request.url))
    }

    // Actualizar el perfil del usuario como verificado
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ verified: true })
      .eq("id", tokenData.user_id)

    if (updateError) {
      throw updateError
    }

    // Eliminar el token usado
    await supabase.from("verification_tokens").delete().eq("token", token)

    // Redirigir al dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("Error al verificar la cuenta:", error)
    return NextResponse.redirect(new URL("/login?error=verification_failed", request.url))
  }
}
