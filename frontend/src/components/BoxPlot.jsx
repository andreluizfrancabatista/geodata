import React, { useRef, useEffect } from 'react'

const BoxPlot = ({ data }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Configurações do gráfico
    const padding = 60
    const chartWidth = canvas.width - 2 * padding
    const chartHeight = canvas.height - 2 * padding

    // Encontrar valores min e max para escala Y
    const allValues = data.flatMap(d => d.values)
    const globalMin = Math.min(...allValues)
    const globalMax = Math.max(...allValues)
    const range = globalMax - globalMin
    const yMin = globalMin - range * 0.1
    const yMax = globalMax + range * 0.1

    // Função para converter valores para coordenadas do canvas
    const scaleY = (value) => {
      return canvas.height - padding - ((value - yMin) / (yMax - yMin)) * chartHeight
    }

    const scaleX = (index) => {
      return padding + (index / (data.length - 1)) * chartWidth
    }

    // Desenhar eixos
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    // Eixo Y
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.stroke()

    // Eixo X
    ctx.beginPath()
    ctx.moveTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.stroke()

    // Labels do eixo Y
    ctx.fillStyle = '#6b7280'
    ctx.font = '12px Inter'
    ctx.textAlign = 'right'
    const ySteps = 5
    for (let i = 0; i <= ySteps; i++) {
      const value = yMin + (yMax - yMin) * (i / ySteps)
      const y = scaleY(value)
      ctx.fillText(Math.round(value).toLocaleString(), padding - 10, y + 4)
      
      // Linhas de grade
      if (i > 0 && i < ySteps) {
        ctx.strokeStyle = '#f3f4f6'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(canvas.width - padding, y)
        ctx.stroke()
      }
    }

    // Largura de cada boxplot
    const boxWidth = Math.min(40, chartWidth / data.length * 0.6)

    // Desenhar boxplots
    data.forEach((item, index) => {
      const x = scaleX(index)
      const { min, max, q1, median, q3 } = item

      const yMin = scaleY(min)
      const yMax = scaleY(max)
      const yQ1 = scaleY(q1)
      const yQ3 = scaleY(q3)
      const yMedian = scaleY(median)

      // Linha vertical (whiskers)
      ctx.strokeStyle = '#374151'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, yMin)
      ctx.lineTo(x, yMax)
      ctx.stroke()

      // Linha superior (max)
      ctx.beginPath()
      ctx.moveTo(x - boxWidth/4, yMax)
      ctx.lineTo(x + boxWidth/4, yMax)
      ctx.stroke()

      // Linha inferior (min)
      ctx.beginPath()
      ctx.moveTo(x - boxWidth/4, yMin)
      ctx.lineTo(x + boxWidth/4, yMin)
      ctx.stroke()

      // Caixa (Q1 a Q3)
      ctx.fillStyle = 'rgba(34, 197, 94, 0.3)'
      ctx.strokeStyle = '#22c55e'
      ctx.lineWidth = 2
      ctx.fillRect(x - boxWidth/2, yQ3, boxWidth, yQ1 - yQ3)
      ctx.strokeRect(x - boxWidth/2, yQ3, boxWidth, yQ1 - yQ3)

      // Mediana
      ctx.strokeStyle = '#dc2626'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x - boxWidth/2, yMedian)
      ctx.lineTo(x + boxWidth/2, yMedian)
      ctx.stroke()
    })

    // Labels do eixo X
    ctx.fillStyle = '#6b7280'
    ctx.font = '11px Inter'
    ctx.textAlign = 'center'
    data.forEach((item, index) => {
      if (index % 3 === 0 || index === data.length - 1) { // Mostrar apenas alguns labels
        const x = scaleX(index)
        ctx.fillText(item.period, x, canvas.height - padding + 20)
      }
    })

    // Título dos eixos
    ctx.fillStyle = '#374151'
    ctx.font = '14px Inter'
    ctx.textAlign = 'center'
    
    // Título eixo X
    ctx.fillText('Período de Semeadura', canvas.width / 2, canvas.height - 10)
    
    // Título eixo Y (rotacionado)
    ctx.save()
    ctx.translate(20, canvas.height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('Produtividade Potencial (SC/ha)', 0, 0)
    ctx.restore()

  }, [data])

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-auto border border-gray-200 rounded"
        style={{ maxHeight: '400px' }}
      />
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-2 bg-red-600 mr-2"></div>
            <span>Mediana</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 border border-green-500 mr-2"></div>
            <span>Q1-Q3 (50% dos dados)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-gray-700 mr-2"></div>
            <span>Min-Max</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxPlot