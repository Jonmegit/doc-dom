import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { notFound } from "next/navigation"

const planes = {
  basico: {
    id: "basico",
    nombre: "Básico",
    precio: 29,
    descripcion: "Ideal para pequeñas empresas y profesionales independientes.",
    caracteristicas: [
      "Hasta 5 usuarios",
      "10GB de almacenamiento",
      "Búsqueda básica",
      "Firma electrónica simple",
      "Soporte por email",
    ],
  },
  profesional: {
    id: "profesional",
    nombre: "Profesional",
    precio: 79,
    descripcion: "Perfecto para empresas medianas con necesidades avanzadas.",
    caracteristicas: [
      "Hasta 20 usuarios",
      "50GB de almacenamiento",
      "Búsqueda avanzada por contenido",
      "Firma electrónica avanzada",
      "Flujos de aprobación",
      "Soporte prioritario",
    ],
  },
  empresarial: {
    id: "empresarial",
    nombre: "Empresarial",
    precio: 199,
    descripcion: "Solución completa para grandes empresas con altos volúmenes.",
    caracteristicas: [
      "Usuarios ilimitados",
      "200GB de almacenamiento",
      "Búsqueda con IA",
      "Firma electrónica cualificada",
      "Flujos de trabajo personalizados",
      "API completa",
      "Soporte 24/7",
    ],
  },
}

export default function CheckoutPage({ params }: { params: { plan: string } }) {
  const plan = planes[params.plan as keyof typeof planes]

  if (!plan) {
    notFound()
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold mb-6">Finalizar compra</h1>
          <CheckoutForm plan={plan} />
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
              <CardDescription>Plan {plan.nombre}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Plan {plan.nombre}</span>
                  <span>€{plan.precio}/mes</span>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Incluye:</h3>
                  <ul className="space-y-1 text-sm">
                    {plan.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-4 w-4 text-green-500 mr-2 mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>€{plan.precio}/mes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Garantía de devolución de 30 días</h3>
            <p className="text-sm text-gray-500">
              Si no estás satisfecho con nuestro servicio, te devolvemos tu dinero sin preguntas en los primeros 30
              días.
            </p>
          </div>

          <div className="mt-4 rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Pago seguro</h3>
            <p className="text-sm text-gray-500">
              Todas las transacciones están protegidas con encriptación SSL de 256 bits.
            </p>
            <div className="flex space-x-2 mt-2">
              <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="20" rx="4" fill="#F3F4F6" />
                <path
                  d="M16 14C18.2091 14 20 12.2091 20 10C20 7.79086 18.2091 6 16 6C13.7909 6 12 7.79086 12 10C12 12.2091 13.7909 14 16 14Z"
                  fill="#D1D5DB"
                />
                <path d="M22 6H26V14H22V6Z" fill="#D1D5DB" />
                <path d="M6 6H10V14H6V6Z" fill="#D1D5DB" />
              </svg>
              <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="20" rx="4" fill="#F3F4F6" />
                <path d="M9 6H23V14H9V6Z" fill="#D1D5DB" />
              </svg>
              <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="20" rx="4" fill="#F3F4F6" />
                <path
                  d="M16 14C18.2091 14 20 12.2091 20 10C20 7.79086 18.2091 6 16 6C13.7909 6 12 7.79086 12 10C12 12.2091 13.7909 14 16 14Z"
                  fill="#D1D5DB"
                />
                <path d="M22 6H26V14H22V6Z" fill="#D1D5DB" />
                <path d="M6 6H10V14H6V6Z" fill="#D1D5DB" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
