"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Tag, Filter, X, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export function DocumentFilters({ onFilterChange }) {
  const [activeFilters, setActiveFilters] = useState([])

  const handleAddFilter = (type, value, label) => {
    const newFilter = { type, value, label }
    setActiveFilters((prev) => [...prev, newFilter])
    onFilterChange(type, value)
  }

  const handleRemoveFilter = (index) => {
    const filterToRemove = activeFilters[index]
    setActiveFilters((prev) => prev.filter((_, i) => i !== index))
    onFilterChange(filterToRemove.type, "all") // Reset to default
  }

  const handleClearFilters = () => {
    setActiveFilters([])
    // Reset all filters
    onFilterChange("type", "all")
    onFilterChange("category", "all")
    onFilterChange("dateRange", "all")
    onFilterChange("status", "all")
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="h-3.5 w-3.5 mr-2" />
              <span>Tipo</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("type", "pdf", "Tipo: PDF")}
              >
                PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("type", "docx", "Tipo: Word")}
              >
                Word
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("type", "xlsx", "Tipo: Excel")}
              >
                Excel
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("type", "pptx", "Tipo: PowerPoint")}
              >
                PowerPoint
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("type", "image", "Tipo: Imagen")}
              >
                Imagen
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Tag className="h-3.5 w-3.5 mr-2" />
              <span>Categoría</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("category", "contracts", "Categoría: Contratos")}
              >
                Contratos
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("category", "invoices", "Categoría: Facturas")}
              >
                Facturas
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("category", "reports", "Categoría: Informes")}
              >
                Informes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("category", "presentations", "Categoría: Presentaciones")}
              >
                Presentaciones
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("category", "legal", "Categoría: Legal")}
              >
                Legal
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="h-3.5 w-3.5 mr-2" />
              <span>Fecha</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("dateRange", "today", "Fecha: Hoy")}
              >
                Hoy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("dateRange", "week", "Fecha: Esta semana")}
              >
                Esta semana
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("dateRange", "month", "Fecha: Este mes")}
              >
                Este mes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("dateRange", "year", "Fecha: Este año")}
              >
                Este año
              </Button>
              <div className="pt-2">
                <CalendarComponent
                  mode="single"
                  onSelect={(date) => {
                    if (date) {
                      const formattedDate = date.toLocaleDateString()
                      handleAddFilter("date", formattedDate, `Fecha: ${formattedDate}`)
                    }
                  }}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <span>Estado</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("status", "pending", "Estado: Pendiente")}
              >
                Pendiente
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("status", "approved", "Estado: Aprobado")}
              >
                Aprobado
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("status", "rejected", "Estado: Rechazado")}
              >
                Rechazado
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => handleAddFilter("status", "draft", "Estado: Borrador")}
              >
                Borrador
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input className="pl-10 h-8 w-[200px]" placeholder="Buscar en resultados..." />
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter.label}
              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => handleRemoveFilter(index)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          <Button variant="ghost" size="sm" className="text-xs text-gray-500 h-7" onClick={handleClearFilters}>
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  )
}
