import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function FlujosPage() {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Flujos de trabajo</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Crear flujo de trabajo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Aprobación de documentos</h2>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Activo</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-4">
              Flujo de aprobación para documentos legales que requieren revisión por parte del departamento legal.
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Última ejecución: hace 2 días
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Documentos en proceso: 3
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t flex justify-end">
            <button className="text-sm text-blue-600 hover:text-blue-500 mr-4">Ver detalles</button>
            <button className="text-sm text-blue-600 hover:text-blue-500">Editar</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Revisión de facturas</h2>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Activo</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-4">
              Proceso de revisión y aprobación de facturas por parte del departamento de contabilidad.
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Última ejecución: hoy
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Documentos en proceso: 5
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t flex justify-end">
            <button className="text-sm text-blue-600 hover:text-blue-500 mr-4">Ver detalles</button>
            <button className="text-sm text-blue-600 hover:text-blue-500">Editar</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Onboarding de clientes</h2>
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En pausa</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-4">
              Proceso de incorporación de nuevos clientes, incluyendo documentación y verificación.
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Última ejecución: hace 1 semana
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Documentos en proceso: 0
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t flex justify-end">
            <button className="text-sm text-blue-600 hover:text-blue-500 mr-4">Ver detalles</button>
            <button className="text-sm text-blue-600 hover:text-blue-500">Editar</button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Historial de ejecuciones</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Flujo de trabajo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Documento
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Iniciado por
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Revisión de facturas</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Factura_Mayo_2023.pdf</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ana Martínez</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hoy, 10:23 AM</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Completado
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Aprobación de documentos
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Contrato_Servicios.docx</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Carlos López</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ayer, 15:45 PM</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  En proceso
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Revisión de facturas</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Factura_Abril_2023.pdf</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Juan Pérez</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05/05/2023, 09:12 AM</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Completado
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center">
          <span className="text-sm text-gray-500">Mostrando 3 de 24 ejecuciones</span>
          <button className="text-sm text-blue-600 hover:text-blue-500">Ver todas</button>
        </div>
      </div>
    </div>
  )
}
