import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
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

    // Generar token de verificación
    const verificationToken = crypto.randomUUID()

    // Guardar el token en la base de datos
    await supabase.from("verification_tokens").insert({
      user_id: session.user.id,
      token: verificationToken,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
    })

    // Enviar correo de verificación a través de n8n
    const response = await fetch(process.env.N8N_WEBHOOK_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: profile.email || session.user.email,
        name: profile.full_name || "Usuario",
        subject: "Verifica tu cuenta",
        verificationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${verificationToken}`,
      }),
    })

    if (!response.ok) {
      throw new Error("Error al enviar el correo de verificación")
    }

    return NextResponse.json(
      { success: true, message: "Correo de verificación enviado correctamente" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error al enviar el correo de verificación:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
