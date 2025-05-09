"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Tag } from "lucide-react"

export function DocumentPreview({ document, fullSize = false }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)

  const totalPages = 5 // Simulado para la demo

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50))
  }

  const handleRotate = () => {
    setRotation((rotation + 90) % 360)
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Vista previa</TabsTrigger>
          <TabsTrigger value="metadata">Metadatos</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="border rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Página {currentPage} de {totalPages}
              </span>
              <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">{zoom}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleRotate}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className="border rounded-md bg-gray-50 flex items-center justify-center overflow-hidden"
            style={{
              height: fullSize ? "500px" : "300px",
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            {document.type === "pdf" ? (
              <div className="text-center p-8">
                <img
                  src={`/placeholder.svg?height=400&width=300&query=PDF Document Preview`}
                  alt="PDF Preview"
                  className="mx-auto mb-4 max-h-full"
                />
                <p className="text-sm text-gray-500">Vista previa del documento PDF</p>
              </div>
            ) : document.type === "docx" ? (
              <div className="text-center p-8">
                <img
                  src={`/placeholder.svg?height=400&width=300&query=Word Document Preview`}
                  alt="Word Preview"
                  className="mx-auto mb-4 max-h-full"
                />
                <p className="text-sm text-gray-500">Vista previa del documento Word</p>
              </div>
            ) : document.type === "xlsx" ? (
              <div className="text-center p-8">
                <img
                  src={`/placeholder.svg?height=400&width=300&query=Excel Document Preview`}
                  alt="Excel Preview"
                  className="mx-auto mb-4 max-h-full"
                />
                <p className="text-sm text-gray-500">Vista previa del documento Excel</p>
              </div>
            ) : (
              <div className="text-center p-8">
                <img
                  src={`/placeholder.svg?height=400&width=300&query=Document Preview`}
                  alt="Document Preview"
                  className="mx-auto mb-4 max-h-full"
                />
                <p className="text-sm text-gray-500">Vista previa del documento</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="metadata" className="border rounded-md p-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Información general</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Nombre:</div>
                <div>{document.name}</div>
                <div className="text-gray-500">Tipo:</div>
                <div>{document.type}</div>
                <div className="text-gray-500">Tamaño:</div>
                <div>2.4 MB</div>
                <div className="text-gray-500">Creado:</div>
                <div>{new Date(document.created_at).toLocaleString()}</div>
                <div className="text-gray-500">Modificado:</div>
                <div>{new Date(document.created_at).toLocaleString()}</div>
                <div className="text-gray-500">Autor:</div>
                <div>{document.created_by?.full_name || "Usuario"}</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Etiquetas</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Informe</Badge>
                <Badge variant="secondary">Trimestral</Badge>
                <Badge variant="secondary">Finanzas</Badge>
                <Badge variant="secondary">2023</Badge>
                <Button variant="ghost" size="sm" className="h-6">
                  <Tag className="h-3 w-3 mr-1" />
                  <span className="text-xs">Añadir etiqueta</span>
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Análisis de contenido</h4>
              <div className="text-sm space-y-2">
                <p>
                  <span className="font-medium">Idioma:</span> Español
                </p>
                <p>
                  <span className="font-medium">Palabras:</span> 2,450
                </p>
                <p>
                  <span className="font-medium">Páginas:</span> 5
                </p>
                <p>
                  <span className="font-medium">Entidades detectadas:</span> Nombres, Fechas, Cantidades monetarias
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="border rounded-md p-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">JP</div>
              </div>
              <div>
                <p className="text-sm font-medium">Juan Pérez modificó este documento</p>
                <p className="text-xs text-gray-500">Hace 2 días</p>
                <p className="text-sm mt-1">Actualización de cifras en la sección 3</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">AM</div>
              </div>
              <div>
                <p className="text-sm font-medium">Ana Martínez comentó este documento</p>
                <p className="text-xs text-gray-500">Hace 3 días</p>
                <p className="text-sm mt-1">Revisar las proyecciones del Q3 antes de la presentación</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">CL</div>
              </div>
              <div>
                <p className="text-sm font-medium">Carlos López creó este documento</p>
                <p className="text-xs text-gray-500">Hace 5 días</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
