"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EsperaActivacionPage() {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const router = useRouter()

  const handleResendEmail = async () => {
    setIsResending(true)

    try {
      const response = await fetch("/api/auth/resend-activation", {
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
          <CardTitle className="text-center text-2xl">Cuenta pendiente de activación</CardTitle>
          <CardDescription className="text-center">
            Tu cuenta está pendiente de activación por un administrador
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4 text-sm">
            <p>
              Gracias por registrarte en nuestra plataforma. Un administrador revisará tu solicitud y activará tu cuenta
              en breve.
            </p>
            <p className="mt-2">Recibirás un correo electrónico cuando tu cuenta haya sido activada.</p>
          </div>

          {resendSuccess && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
              Se ha enviado un recordatorio al administrador. Gracias por tu paciencia.
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
            {isResending ? "Enviando..." : "Recordar al administrador"}
          </Button>
          <Button className="w-full" variant="ghost" onClick={() => router.push("/login")}>
            Volver al inicio de sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
