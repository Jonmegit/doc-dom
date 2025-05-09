import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string
  const department = (formData.get("department") as string) || null

  if (!email || !password || !fullName) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
  }

  const supabase = createRouteHandlerClient({ cookies })

  try {
    // Registrar usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (authError) {
      throw authError
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Error al crear el usuario" }, { status: 500 })
    }

    // Crear perfil de usuario con estado inactivo
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      full_name: fullName,
      email: email,
      role: "user", // Rol por defecto
      department: department,
      active: false, // Inicialmente inactivo hasta que un admin lo active
      created_at: new Date().toISOString(),
    })

    if (profileError) {
      // Si hay error al crear el perfil, eliminar el usuario de auth
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw profileError
    }

    // Enviar notificación al administrador sobre el nuevo usuario
    const response = await fetch(process.env.N8N_WEBHOOK_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        userEmail: email,
        name: fullName,
        userId: authData.user.id,
        activationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/activate-user?userId=${authData.user.id}`,
      }),
    })

    if (!response.ok) {
      console.error("Error al enviar notificación al administrador")
    }

    return NextResponse.json(
      { success: true, message: "Usuario registrado correctamente. Un administrador activará tu cuenta en breve." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error en el registro:", error)
    return NextResponse.json({ error: "Error al procesar el registro" }, { status: 500 })
  }
}
