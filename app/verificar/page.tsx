"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function VerificarPage() {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user?.email) {
        setEmail(session.user.email)
      }
    }
    getUser()
  }, [supabase])

  const handleResendEmail = async () => {
    setIsResending(true)

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
      })

      if (response.ok) {
        setResendSuccess(true)
      }
    } catch (error) {
      console.error("Error al reenviar el correo:", error)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-yellow-100 p-3">
              <AlertCircle className="h-10 w-10 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Verifica tu cuenta</CardTitle>
          <CardDescription className="text-center">
            Necesitamos verificar tu dirección de correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4 text-sm">
            <p>
              Hemos enviado un correo electrónico a <strong>{email}</strong> con un enlace de verificación.
            </p>
            <p className="mt-2">
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu cuenta.
            </p>
          </div>

          {resendSuccess && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
              Se ha enviado un nuevo correo de verificación. Por favor, revisa tu bandeja de entrada.
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={handleResendEmail}
            disabled={isResending || resendSuccess}
          >
            <Mail className="mr-2 h-4 w-4" />
            {isResending ? "Enviando..." : "Reenviar correo de verificación"}
          </Button>
          <Button className="w-full" variant="ghost" onClick={() => router.push("/login")}>
            Volver al inicio de sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
