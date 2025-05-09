"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function TeamActivity() {
  // Datos de ejemplo para la demo
  const teamMembers = [
    {
      id: 1,
      name: "Juan Pérez",
      role: "Administrador",
      avatar: "",
      initials: "JP",
      status: "online",
      lastActive: "Ahora",
      documentsUploaded: 45,
      documentsReviewed: 78,
    },
    {
      id: 2,
      name: "Ana Martínez",
      role: "Revisor",
      avatar: "",
      initials: "AM",
      status: "online",
      lastActive: "Hace 5 min",
      documentsUploaded: 32,
      documentsReviewed: 124,
    },
    {
      id: 3,
      name: "Carlos López",
      role: "Usuario",
      avatar: "",
      initials: "CL",
      status: "offline",
      lastActive: "Hace 2 horas",
      documentsUploaded: 67,
      documentsReviewed: 12,
    },
    {
      id: 4,
      name: "Laura Gómez",
      role: "Revisor",
      avatar: "",
      initials: "LG",
      status: "online",
      lastActive: "Hace 10 min",
      documentsUploaded: 28,
      documentsReviewed: 93,
    },
  ]

  return (
    <div className="space-y-4">
      {teamMembers.map((member) => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                  member.status === "online" ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
            </div>
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                  {member.role}
                </Badge>
                <p className="text-xs text-gray-500">{member.lastActive}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Documentos</p>
            <p className="text-sm">
              <span className="font-medium">{member.documentsUploaded}</span> subidos ·{" "}
              <span className="font-medium">{member.documentsReviewed}</span> revisados
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
