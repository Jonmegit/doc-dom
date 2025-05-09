import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function PlanesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Planes y Precios</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Elige el plan que mejor se adapte a las necesidades de tu empresa
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {/* Plan Básico */}
            <div className="flex flex-col rounded-lg border shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-bold">Básico</h3>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">€29</span>
                  <span className="ml-1 text-xl font-semibold">/mes</span>
                </div>
                <p className="mt-4 text-gray-500">Ideal para pequeñas empresas y profesionales independientes.</p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Hasta 5 usuarios</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>10GB de almacenamiento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Búsqueda básica</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Firma electrónica simple</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Soporte por email</span>
                  </li>
                </ul>
              </div>
              <div className="flex p-6 border-t">
                <Link href="/checkout/basico" className="w-full">
                  <Button className="w-full">Contratar plan</Button>
                </Link>
              </div>
            </div>

            {/* Plan Profesional */}
            <div className="flex flex-col rounded-lg border shadow-sm relative">
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                Popular
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">Profesional</h3>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">€79</span>
                  <span className="ml-1 text-xl font-semibold">/mes</span>
                </div>
                <p className="mt-4 text-gray-500">Perfecto para empresas medianas con necesidades avanzadas.</p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Hasta 20 usuarios</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>50GB de almacenamiento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Búsqueda avanzada por contenido</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Firma electrónica avanzada</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Flujos de aprobación</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Soporte prioritario</span>
                  </li>
                </ul>
              </div>
              <div className="flex p-6 border-t">
                <Link href="/checkout/profesional" className="w-full">
                  <Button className="w-full">Contratar plan</Button>
                </Link>
              </div>
            </div>

            {/* Plan Empresarial */}
            <div className="flex flex-col rounded-lg border shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-bold">Empresarial</h3>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">€199</span>
                  <span className="ml-1 text-xl font-semibold">/mes</span>
                </div>
                <p className="mt-4 text-gray-500">Solución completa para grandes empresas con altos volúmenes.</p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Usuarios ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>200GB de almacenamiento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Búsqueda con IA</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Firma electrónica cualificada</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Flujos de trabajo personalizados</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>API completa</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Soporte 24/7</span>
                  </li>
                </ul>
              </div>
              <div className="flex p-6 border-t">
                <Link href="/checkout/empresarial" className="w-full">
                  <Button className="w-full">Contratar plan</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Plan Personalizado */}
          <div className="mt-12 rounded-lg border p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold">Plan Personalizado</h3>
                <p className="mt-2 text-gray-500">
                  ¿Necesitas una solución a medida? Contacta con nuestro equipo para crear un plan personalizado.
                </p>
              </div>
              <Link href="/contacto">
                <Button variant="outline">Contactar</Button>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Preguntas frecuentes</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">¿Puedo cambiar de plan en cualquier momento?</h3>
                <p className="mt-2 text-gray-500">
                  Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo
                  ciclo de facturación.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">¿Hay algún período de prueba?</h3>
                <p className="mt-2 text-gray-500">
                  Ofrecemos una prueba gratuita de 14 días para todos nuestros planes. No se requiere tarjeta de
                  crédito.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">¿Qué métodos de pago aceptan?</h3>
                <p className="mt-2 text-gray-500">
                  Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express) y transferencias bancarias
                  para planes anuales.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold">¿Ofrecen descuentos para pagos anuales?</h3>
                <p className="mt-2 text-gray-500">
                  Sí, ofrecemos un 15% de descuento para todos los planes pagados anualmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
