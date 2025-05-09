"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter, Calendar, Tag } from "lucide-react"

export function SearchDocuments({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    dateRange: "all",
    includeContent: true,
    includeMetadata: true,
    includeComments: false,
  })

  const handleSearch = () => {
    onSearch(searchQuery, filters)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Buscar por nombre, contenido, etiquetas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-gray-500"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? "Ocultar búsqueda avanzada" : "Mostrar búsqueda avanzada"}
        </Button>

        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Tipo de archivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">Word</SelectItem>
              <SelectItem value="xlsx">Excel</SelectItem>
              <SelectItem value="pptx">PowerPoint</SelectItem>
              <SelectItem value="image">Imágenes</SelectItem>
            </SelectContent>
          </Select>

          <Calendar className="h-4 w-4 text-gray-400" />
          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier fecha</SelectItem>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showAdvanced && (
        <div className="border rounded-md p-4 space-y-4">
          <h4 className="text-sm font-medium mb-2">Opciones de búsqueda avanzada</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="contracts">Contratos</SelectItem>
                  <SelectItem value="invoices">Facturas</SelectItem>
                  <SelectItem value="reports">Informes</SelectItem>
                  <SelectItem value="presentations">Presentaciones</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Etiquetas</Label>
              <div className="flex space-x-2">
                <Input placeholder="Añadir etiquetas..." className="flex-1" />
                <Button variant="outline" size="icon">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Buscar en</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeContent"
                  checked={filters.includeContent}
                  onCheckedChange={(checked) => handleFilterChange("includeContent", checked)}
                />
                <Label htmlFor="includeContent" className="text-sm font-normal">
                  Contenido del documento
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeMetadata"
                  checked={filters.includeMetadata}
                  onCheckedChange={(checked) => handleFilterChange("includeMetadata", checked)}
                />
                <Label htmlFor="includeMetadata" className="text-sm font-normal">
                  Metadatos (nombre, autor, etiquetas)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeComments"
                  checked={filters.includeComments}
                  onCheckedChange={(checked) => handleFilterChange("includeComments", checked)}
                />
                <Label htmlFor="includeComments" className="text-sm font-normal">
                  Comentarios
                </Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
