"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, MessageSquare, CheckCircle, AlertCircle, Upload, Download, Edit, Eye } from "lucide-react"

export function RecentActivity() {
  // Datos de ejemplo para la demo
  const activities = [
    {
      id: 1,
      user: { name: "Juan Pérez", avatar: "", initials: "JP" },
      action: "comment",
      document: "Informe_Trimestral_Q2_2023.pdf",
      timestamp: "Hace 2 horas",
      details: "Excelente informe, pero creo que deberíamos revisar las cifras de la sección 3 antes de enviarlo.",
    },
    {
      id: 2,
      user: { name: "Ana Martínez", avatar: "", initials: "AM" },
      action: "approve",
      document: "Contrato_Servicios_TechCorp.docx",
      timestamp: "Hace 5 horas",
      details: null,
    },
    {
      id: 3,
      user: { name: "Carlos López", avatar: "", initials: "CL" },
      action: "upload",
      document: "Presentacion_Proyecto_Alpha.pptx",
      timestamp: "Hace 1 día",
      details: null,
    },
    {
      id: 4,
      user: { name: "Laura Gómez", avatar: "", initials: "LG" },
      action: "reject",
      document: "Propuesta_Comercial.pdf",
      timestamp: "Hace 2 días",
      details: "Necesitamos revisar los términos comerciales y ajustar los precios según lo acordado en la reunión.",
    },
    {
      id: 5,
      user: { name: "Miguel Sánchez", avatar: "", initials: "MS" },
      action: "view",
      document: "Manual_Usuario_v2.pdf",
      timestamp: "Hace 3 días",
      details: null,
    },
  ]

  const getActionIcon = (action) => {
    switch (action) {
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "approve":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "reject":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "upload":
        return <Upload className="h-4 w-4 text-purple-500" />
      case "download":
        return <Download className="h-4 w-4 text-blue-500" />
      case "edit":
        return <Edit className="h-4 w-4 text-yellow-500" />
      case "view":
        return <Eye className="h-4 w-4 text-gray-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getActionText = (action) => {
    switch (action) {
      case "comment":
        return "comentó en"
      case "approve":
        return "aprobó"
      case "reject":
        return "rechazó"
      case "upload":
        return "subió"
      case "download":
        return "descargó"
      case "edit":
        return "editó"
      case "view":
        return "visualizó"
      default:
        return "interactuó con"
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span>{" "}
              <span className="text-gray-500">{getActionText(activity.action)}</span>{" "}
              <span className="font-medium">{activity.document}</span>
            </p>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
            {activity.details && <p className="text-sm mt-1 p-2 bg-gray-50 rounded-md">{activity.details}</p>}
          </div>
          <div className="ml-auto">{getActionIcon(activity.action)}</div>
        </div>
      ))}
    </div>
  )
}
