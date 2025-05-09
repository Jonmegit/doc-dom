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

    // 2. Crear perfil de usuario con estado pendiente de verificación
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: fullName,
        email,
        plan: plan,
        verified: false,
      })

      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 500 })
      }

      // 3. Generar token de verificación
      const verificationToken = crypto.randomUUID()

      // 4. Guardar el token en la base de datos
      await supabase.from("verification_tokens").insert({
        user_id: authData.user.id,
        token: verificationToken,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
      })

      // 5. Enviar correo de verificación a través de n8n
      const verificationResponse = await fetch(process.env.N8N_WEBHOOK_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: fullName,
          subject: "Verifica tu cuenta en DocManager",
          verificationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${verificationToken}`,
          plan: plan,
        }),
      })

      if (!verificationResponse.ok) {
        console.error("Error al enviar correo de verificación")
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en el checkout:", error)
    return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 })
  }
}
