"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = createServerActionClient({ cookies })

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: error.message,
    }
  }

  // Verificar si el usuario tiene un perfil activo
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    const { data: profile } = await supabase.from("profiles").select("active").eq("id", session.user.id).single()

    if (!profile?.active) {
      // Si el perfil no está activo, cerrar sesión y devolver error
      await supabase.auth.signOut()
      return {
        error: "Tu cuenta aún no ha sido activada. Por favor, espera a que un administrador active tu cuenta.",
      }
    }
  }

  return { success: true }
}

export async function signOut() {
  const supabase = createServerActionClient({ cookies })
  await supabase.auth.signOut()
  redirect("/login")
}
