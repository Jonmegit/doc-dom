import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ConfirmacionPage() {
  return (
    <div className="container max-w-3xl py-16">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">¡Pago completado con éxito!</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Gracias por tu compra. Hemos enviado un correo electrónico de confirmación con los detalles de tu pedido.
        </p>

        <div className="w-full max-w-md rounded-lg border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Próximos pasos</h2>
          <ol className="space-y-4 text-left">
            <li className="flex items-start">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-xs text-white mr-3">
                1
              </span>
              <div>
                <p className="font-medium">Verifica tu correo electrónico</p>
                <p className="text-sm text-gray-500">Hemos enviado un enlace de activación a tu correo electrónico.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-xs text-white mr-3">
                2
              </span>
              <div>
                <p className="font-medium">Activa tu cuenta</p>
                <p className="text-sm text-gray-500">Haz clic en el enlace de activación para confirmar tu cuenta.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-xs text-white mr-3">
                3
              </span>
              <div>
                <p className="font-medium">Accede a tu cuenta</p>
                <p className="text-sm text-gray-500">
                  Inicia sesión con tu correo y contraseña para comenzar a usar la plataforma.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login">
            <Button>Iniciar sesión</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
