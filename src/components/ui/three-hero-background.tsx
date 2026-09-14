"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 30

    // WebGL Renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    // Floating 3D luminous particles
    const particleCount = 140
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 55
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      scales[i] = Math.random() * 0.8 + 0.3
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1))

    // Soft teal glowing material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x70cab9,
      size: 0.7,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, particleMaterial)
    scene.add(particles)

    // Subtle 3D Depth Ring in background
    const ringGeo = new THREE.TorusGeometry(18, 0.08, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x60948a,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 3
    ring.position.y = -2
    ring.position.z = -10
    scene.add(ring)

    // Smooth Mouse Parallax without layout reflows
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event: MouseEvent) => {
      // Window-relative calculation avoids getBoundingClientRect layout thrashing
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    // Intersection Observer to pause rendering when not in view (guarantees 60fps)
    let isVisible = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    // Animation Loop with delta time
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.035
      particles.rotation.x = elapsedTime * 0.015

      // Ring rotation
      ring.rotation.z = elapsedTime * 0.025

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      camera.position.x = targetX * 2.5
      camera.position.y = -targetY * 1.5
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      particleMaterial.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ opacity: 0.85 }}
    />
  )
}
