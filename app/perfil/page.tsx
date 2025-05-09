import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function PerfilPage() {
  const supabase = createServerComponentClient({ cookies })

  // Verificar si el usuario está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Obtener información del perfil
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Tu perfil</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {profile?.avatar_url ? (
                <img className="h-24 w-24 rounded-full" src={profile.avatar_url || "/placeholder.svg"} alt="" />
              ) : (
                <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
                  {profile?.full_name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">{profile?.full_name}</h2>
              <p className="text-sm text-gray-500">{profile?.email}</p>
              <p className="mt-1 text-sm text-gray-500">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mr-2">
                  {profile?.role || "Usuario"}
                </span>
                {profile?.department && (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{profile.department}</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cambiar foto de perfil
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-5">
          <h3 className="text-lg font-medium text-gray-900">Información personal</h3>
          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                defaultValue={profile?.full_name || ""}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={profile?.email || ""}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Departamento
              </label>
              <input
                type="text"
                name="department"
                id="department"
                defaultValue={profile?.department || ""}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Rol
              </label>
              <input
                type="text"
                name="role"
                id="role"
                defaultValue={profile?.role || ""}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-5">
          <h3 className="text-lg font-medium text-gray-900">Cambiar contraseña</h3>
          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                Contraseña actual
              </label>
              <input
                type="password"
                name="current_password"
                id="current_password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div></div>
            <div>
              <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                Nueva contraseña
              </label>
              <input
                type="password"
                name="new_password"
                id="new_password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirmar nueva contraseña
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-5">
          <h3 className="text-lg font-medium text-gray-900">Preferencias de notificación</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="email_notifications"
                  name="email_notifications"
                  type="checkbox"
                  defaultChecked
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="email_notifications" className="font-medium text-gray-700">
                  Notificaciones por email
                </label>
                <p className="text-gray-500">Recibir notificaciones por email cuando haya actividad relevante.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="browser_notifications"
                  name="browser_notifications"
                  type="checkbox"
                  defaultChecked
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="browser_notifications" className="font-medium text-gray-700">
                  Notificaciones del navegador
                </label>
                <p className="text-gray-500">
                  Recibir notificaciones en el navegador cuando estés usando la aplicación.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-5 flex justify-end">
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
