import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Verificar si el usuario está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    // Obtener información del usuario
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", session.user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 })
    }

    // Enviar notificación al administrador sobre la solicitud de activación
    const response = await fetch(process.env.N8N_WEBHOOK_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        userEmail: profile.email || session.user.email,
        name: profile.full_name || "Usuario",
        userId: session.user.id,
        activationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/activate-user?userId=${session.user.id}`,
      }),
    })

    if (!response.ok) {
      throw new Error("Error al enviar la notificación")
    }

    return NextResponse.json(
      { success: true, message: "Solicitud de activación reenviada correctamente" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error al reenviar la solicitud de activación:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
