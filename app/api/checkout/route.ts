import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, fullName, plan } = body

    if (!email || !password || !fullName || !plan) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // 1. Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          plan: plan,
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    // 2. Crear perfil de usuario con estado pendiente
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: fullName,
        email,
        plan: plan,
        active: false,
      })

      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 500 })
      }

      // 3. Enviar notificación al administrador a través de n8n
      const adminNotificationResponse = await fetch(process.env.N8N_WEBHOOK_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: process.env.ADMIN_EMAIL,
          name: "Administrador",
          userEmail: email,
          userName: fullName,
          plan: plan,
          activationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/activate-user?userId=${authData.user.id}&token=${authData.user.id}`,
        }),
      })

      if (!adminNotificationResponse.ok) {
        console.error("Error al enviar notificación al administrador")
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en el checkout:", error)
    return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 })
  }
}
