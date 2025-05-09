import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "ID de usuario no proporcionado" }, { status: 400 })
  }

  const supabase = createRouteHandlerClient({ cookies })

  // Verificar si el usuario que realiza la acción es administrador
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verificar si el usuario actual es administrador
    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    if (!adminProfile || adminProfile.role !== "admin") {
      return NextResponse.json({ error: "No tienes permisos para realizar esta acción" }, { status: 403 })
    }

    // Activar el perfil del usuario
    const { error } = await supabase.from("profiles").update({ active: true }).eq("id", userId)

    if (error) {
      throw error
    }

    // Obtener información del usuario activado para enviar notificación
    const { data: userProfile } = await supabase.from("profiles").select("email, full_name").eq("id", userId).single()

    if (userProfile) {
      // Enviar notificación al usuario de que su cuenta ha sido activada
      await fetch(process.env.N8N_WEBHOOK_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userProfile.email,
          name: userProfile.full_name || "Usuario",
          subject: "Tu cuenta ha sido activada",
          message:
            "Tu cuenta ha sido activada correctamente. Ya puedes acceder a todas las funcionalidades del sistema.",
        }),
      })
    }

    return NextResponse.redirect(new URL("/admin/usuarios?activated=true", request.url))
  } catch (error) {
    console.error("Error al activar usuario:", error)
    return NextResponse.json({ error: "Error al activar el usuario" }, { status: 500 })
  }
}
