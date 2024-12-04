import React, { useRef, useEffect } from 'react'

export const NeuroSynapse = ({ scrollY }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const neurons = []
    const numNeurons = 100
    const connectionDistance = 100

    for (let i = 0; i < numNeurons; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1
      })
    }

    const drawNeurons = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      neurons.forEach((neuron, i) => {
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(52, 152, 219, ${0.5 + (scrollY / 1000)})`
        ctx.fill()

        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[j].x - neuron.x
          const dy = neurons[j].y - neuron.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(neuron.x, neuron.y)
            ctx.lineTo(neurons[j].x, neurons[j].y)
            ctx.strokeStyle = `rgba(52, 152, 219, ${0.2 + (scrollY / 2000)})`
            ctx.stroke()
          }
        }
      })
    }

    const animate = () => {
      drawNeurons()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [scrollY])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />
}

