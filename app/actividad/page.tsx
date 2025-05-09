import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ActividadPage() {
  const supabase = createServerComponentClient({ cookies })

  // Verificar si el usuario está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Actividad reciente</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <input type="text" placeholder="Buscar actividad..." className="border rounded-md px-3 py-2 w-64" />
            <div className="ml-4">
              <select className="border rounded-md px-3 py-2">
                <option>Todos los tipos</option>
                <option>Documentos</option>
                <option>Flujos de trabajo</option>
                <option>Comentarios</option>
                <option>Usuarios</option>
              </select>
            </div>
          </div>
          <div>
            <select className="border rounded-md px-3 py-2">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
              <option>Todo el tiempo</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="p-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">JD</div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Juan Pérez <span className="text-gray-500">comentó en</span> Informe_Trimestral.pdf
                </p>
                <p className="text-sm text-gray-500">Hace 2 horas</p>
                <div className="mt-2 text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
                  "Excelente informe, pero creo que deberíamos revisar las cifras de la sección 3 antes de enviarlo."
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">AM</div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Ana Martínez <span className="text-gray-500">aprobó</span> Contrato_Servicios.docx
                </p>
                <p className="text-sm text-gray-500">Hace 5 horas</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">TÚ</div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Tú <span className="text-gray-500">subiste</span> Presentacion_Proyecto.pptx
                </p>
                <p className="text-sm text-gray-500">Hace 1 día</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-white">CL</div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Carlos López <span className="text-gray-500">inició un flujo de trabajo</span> Revisión de Contrato
                </p>
                <p className="text-sm text-gray-500">Hace 2 días</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white">LG</div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Laura Gómez <span className="text-gray-500">rechazó</span> Propuesta_Comercial.pdf
                </p>
                <p className="text-sm text-gray-500">Hace 3 días</p>
                <div className="mt-2 text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
                  "Necesitamos revisar los términos comerciales y ajustar los precios según lo acordado en la reunión."
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Anterior
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Siguiente
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de{" "}
                <span className="font-medium">42</span> actividades
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Anterior</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  aria-current="page"
                  className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  8
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  9
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Siguiente</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
