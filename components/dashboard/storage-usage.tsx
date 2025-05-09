"use client"

import { Progress } from "@/components/ui/progress"

export function StorageUsage({ used, total, breakdown }) {
  const percentage = (used / total) * 100

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">
          {used} GB de {total} GB utilizados
        </span>
        <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
      </div>

      <Progress value={percentage} className="h-2" />

      <div className="space-y-3 mt-4">
        <h4 className="text-sm font-medium">Desglose por tipo de archivo</h4>

        {breakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm">{item.type}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium">{item.size} GB</span>
              <span className="text-xs text-gray-500 ml-2">({Math.round((item.size / used) * 100)}%)</span>
            </div>
          </div>
        ))}
      </div>

      {percentage > 80 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-2">
          <p className="text-sm text-yellow-800">
            Estás utilizando más del 80% de tu almacenamiento. Considera actualizar tu plan o liberar espacio.
          </p>
        </div>
      )}

      <div className="pt-2">
        <button className="text-sm text-blue-600 hover:text-blue-800">Actualizar plan de almacenamiento</button>
      </div>
    </div>
  )
}
