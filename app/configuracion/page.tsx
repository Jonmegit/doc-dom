import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ConfiguracionPage() {
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
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Preferencias generales</h2>
          <p className="mt-1 text-sm text-gray-500">Configura las preferencias generales de la aplicación.</p>
        </div>

        <div className="p-6 border-b border-gray-200 space-y-6">
          <div>
            <h3 className="text-base font-medium text-gray-900">Idioma</h3>
            <div className="mt-2">
              <select
                id="language"
                name="language"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-900">Zona horaria</h3>
            <div className="mt-2">
              <select
                id="timezone"
                name="timezone"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="Europe/Madrid">Europe/Madrid (GMT+1)</option>
                <option value="Europe/London">Europe/London (GMT+0)</option>
                <option value="America/New_York">America/New_York (GMT-5)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (GMT-8)</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-900">Tema</h3>
            <div className="mt-2 space-y-4">
              <div className="flex items-center">
                <input
                  id="theme-light"
                  name="theme"
                  type="radio"
                  defaultChecked
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="theme-light" className="ml-3 block text-sm font-medium text-gray-700">
                  Claro
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="theme-dark"
                  name="theme"
                  type="radio"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="theme-dark" className="ml-3 block text-sm font-medium text-gray-700">
                  Oscuro
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="theme-system"
                  name="theme"
                  type="radio"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="theme-system" className="ml-3 block text-sm font-medium text-gray-700">
                  Sistema
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Notificaciones</h2>
          <p className="mt-1 text-sm text-gray-500">Configura cómo y cuándo quieres recibir notificaciones.</p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-base font-medium text-gray-900">Email</h3>
              <div className="mt-2 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email_documents"
                      name="email_documents"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email_documents" className="font-medium text-gray-700">
                      Documentos
                    </label>
                    <p className="text-gray-500">Recibir notificaciones cuando se suban o modifiquen documentos.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email_workflows"
                      name="email_workflows"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email_workflows" className="font-medium text-gray-700">
                      Flujos de trabajo
                    </label>
                    <p className="text-gray-500">Recibir notificaciones sobre cambios en los flujos de trabajo.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email_comments"
                      name="email_comments"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email_comments" className="font-medium text-gray-700">
                      Comentarios
                    </label>
                    <p className="text-gray-500">Recibir notificaciones cuando alguien comente en tus documentos.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium text-gray-900">Aplicación</h3>
              <div className="mt-2 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="app_documents"
                      name="app_documents"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="app_documents" className="font-medium text-gray-700">
                      Documentos
                    </label>
                    <p className="text-gray-500">Mostrar notificaciones en la aplicación para documentos.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="app_workflows"
                      name="app_workflows"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="app_workflows" className="font-medium text-gray-700">
                      Flujos de trabajo
                    </label>
                    <p className="text-gray-500">Mostrar notificaciones en la aplicación para flujos de trabajo.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="app_comments"
                      name="app_comments"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="app_comments" className="font-medium text-gray-700">
                      Comentarios
                    </label>
                    <p className="text-gray-500">Mostrar notificaciones en la aplicación para comentarios.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Privacidad y seguridad</h2>
          <p className="mt-1 text-sm text-gray-500">Configura tus preferencias de privacidad y seguridad.</p>

          <div className="mt-6 space-y-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="two_factor"
                  name="two_factor"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="two_factor" className="font-medium text-gray-700">
                  Autenticación de dos factores
                </label>
                <p className="text-gray-500">Habilitar la autenticación de dos factores para mayor seguridad.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="session_timeout"
                  name="session_timeout"
                  type="checkbox"
                  defaultChecked
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="session_timeout" className="font-medium text-gray-700">
                  Tiempo de espera de sesión
                </label>
                <p className="text-gray-500">Cerrar sesión automáticamente después de 30 minutos de inactividad.</p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium text-gray-900">Historial de sesiones</h3>
              <p className="mt-1 text-sm text-gray-500">Dispositivos donde has iniciado sesión recientemente.</p>
              <div className="mt-2 border rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispositivo / Ubicación / Fecha
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Chrome en Windows</p>
                      <p className="text-xs text-gray-500">Madrid, España • Hoy, 10:23 AM</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Actual</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Safari en iPhone</p>
                      <p className="text-xs text-gray-500">Madrid, España • Ayer, 18:45 PM</p>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-800">Cerrar sesión</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  )
}
