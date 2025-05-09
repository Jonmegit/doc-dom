"use client"

import { useEffect, useRef } from "react"

export function DocumentAnalytics({ data, type = "bar", colors = ["#3b82f6"] }) {
  const chartRef = useRef(null)

  useEffect(() => {
    // Esta es una simulación de un gráfico. En una implementación real,
    // usaríamos una biblioteca como Chart.js, Recharts o D3.js
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      // Limpiar el canvas
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

      if (type === "bar") {
        drawBarChart(ctx, data, colors)
      } else if (type === "pie") {
        drawPieChart(ctx, data, colors)
      } else if (type === "line") {
        drawLineChart(ctx, data, colors)
      }
    }
  }, [data, type, colors])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={chartRef} width="400" height="300"></canvas>
    </div>
  )
}

// Funciones de dibujo simuladas
function drawBarChart(ctx, data, colors) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  const barWidth = width / (data.length * 2)
  const maxValue = Math.max(...data.map((item) => (typeof item.count === "number" ? item.count : 0)))

  // Usar colores que funcionen bien en ambos modos (claro y oscuro)
  const textColor = "currentColor" // Usa el color de texto actual del contexto
  const axisColor = "#6b7280" // Un gris medio que es visible en ambos modos

  // Dibujar ejes
  ctx.beginPath()
  ctx.moveTo(40, 20)
  ctx.lineTo(40, height - 40)
  ctx.lineTo(width - 20, height - 40)
  ctx.strokeStyle = axisColor
  ctx.stroke()

  // Dibujar barras
  data.forEach((item, index) => {
    const x = 60 + index * (barWidth * 2)
    const barHeight = (item.count / maxValue) * (height - 80)
    const y = height - 40 - barHeight

    ctx.fillStyle = colors[0]
    ctx.fillRect(x, y, barWidth, barHeight)

    // Etiquetas
    ctx.fillStyle = axisColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(item.category || item.type, x + barWidth / 2, height - 25)

    ctx.fillStyle = textColor
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(item.count.toString(), x + barWidth / 2, y - 5)
  })
}

function drawPieChart(ctx, data, colors) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  const radius = Math.min(width, height) / 2 - 40
  const centerX = width / 2
  const centerY = height / 2

  // Usar colores que funcionen bien en ambos modos
  const textColor = "currentColor"

  const total = data.reduce((sum, item) => sum + item.count, 0)
  let startAngle = 0

  // Dibujar sectores
  data.forEach((item, index) => {
    const sliceAngle = (item.count / total) * 2 * Math.PI
    const endAngle = startAngle + sliceAngle

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.closePath()

    ctx.fillStyle = colors[index % colors.length]
    ctx.fill()

    // Etiquetas
    const labelAngle = startAngle + sliceAngle / 2
    const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
    const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(item.count.toString(), labelX, labelY)

    startAngle = endAngle
  })

  // Leyenda
  const legendY = height - 20
  data.forEach((item, index) => {
    const legendX = 60 + index * 80

    ctx.fillStyle = colors[index % colors.length]
    ctx.fillRect(legendX, legendY, 10, 10)

    ctx.fillStyle = textColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText(item.type, legendX + 15, legendY + 5)
  })
}

function drawLineChart(ctx, data, colors) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  const padding = 40

  // Usar colores que funcionen bien en ambos modos
  const textColor = "currentColor"
  const axisColor = "#6b7280"

  // Encontrar valores máximos
  const allValues = data.flatMap((item) => [item.uploads || 0, item.views || 0, item.edits || 0])
  const maxValue = Math.max(...allValues, 10)

  // Dibujar ejes
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.strokeStyle = axisColor
  ctx.stroke()

  // Dibujar líneas de datos
  const metrics = [
    { key: "uploads", label: "Subidas", color: colors[0] },
    { key: "views", label: "Vistas", color: colors[1] },
    { key: "edits", label: "Ediciones", color: colors[2] },
  ]

  metrics.forEach((metric) => {
    ctx.beginPath()
    data.forEach((item, index) => {
      const x = padding + index * ((width - padding * 2) / (data.length - 1))
      const y = height - padding - ((item[metric.key] || 0) / maxValue) * (height - padding * 2)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.strokeStyle = metric.color
    ctx.lineWidth = 2
    ctx.stroke()

    // Puntos de datos
    data.forEach((item, index) => {
      const x = padding + index * ((width - padding * 2) / (data.length - 1))
      const y = height - padding - ((item[metric.key] || 0) / maxValue) * (height - padding * 2)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = metric.color
      ctx.fill()
    })
  })

  // Etiquetas del eje X
  data.forEach((item, index) => {
    const x = padding + index * ((width - padding * 2) / (data.length - 1))

    ctx.fillStyle = axisColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(item.date.split("-")[2], x, height - padding + 15)
  })

  // Leyenda
  const legendY = padding
  metrics.forEach((metric, index) => {
    const legendX = padding + index * 80

    ctx.fillStyle = metric.color
    ctx.fillRect(legendX, legendY, 10, 10)

    ctx.fillStyle = textColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText(metric.label, legendX + 15, legendY + 5)
  })
}
