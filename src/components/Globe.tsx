"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import type { MotionValue } from "framer-motion"

// Base64-encoded 2D equirectangular earth landmass bitmap
const EARTH_MAP_BASE64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAECklEQVR42u3VsW4jRRzH8d94gzfF4Q0VQaC4vBLTRTp0mze4ggfAPAE5XQEFsGNAVIjwBrmW7h7gJE+giKjyABTZE4g06LKJETdRJvtD65kdz6yduKABiW+TVfzRf2bXYxtcE/59YJCz6YdbgQF6ACSRrwYKYImmh5PbwOewlV3wlQNbAN6SEExjUOO+BU0aCSnxReHABUlK4YFQeJeUT3da8IIkZ6NGoSnFY5KsMoVzMKfECUnqxgPYRArarmUCndHwzIEaQEpg5xVdBXROl8mpAQx5dUgPiHoYAAkg5w3JABR06byGAVgcRGAz5bznj6phBQNRFwyqgdxebH6gshJAesWoFhgYpApAFoG8BIZ/fEhSox5jDjQXmV0Ar5XJfAIrALi3URVs09gHIL4XJCkLC5LH9JWiArABFCSrQjdgkBzRJ0WJeUOSNyQAfJJwUSWUBRlJQ8oGHATACGlBynnzy2kEYLNjrxouigD8BZcgOeVPqh12RtufaCN5wCPVDpvQ9lsIrqndsJtDcWqBCpf4hWN7OdWHBw58FwIaNOU/n1TpMW2DFaD48cmr4185T8NHkpUFX749pQPVdgRKC/DGoQPVeAEKv+WHvY8OOWNTPRp5kHuwSf8wzXtVBKR7YwEH9H3lQUaypUfSATOALyVNu5vZJW31Bnx98nkLfDUWJaz6ixvm+RIQRdl3kmRxxiaDoGnZW4CpPfkaQadlcPim1xOSvETQo7Lv75enVAXJ3xGUlony4KQBBWUM1NiDc6qhyS8RgQs18OCMMtPDaAUIyg0PZkRWDqs+wnKJBTDI1Js6BolegOsKmUxNDBAAKqQyMQmidhegBlLZ+wwKYdv5M/8x1khkb1cgKqP2H+MKyV5vS+whrE8DQDgAlUAoRBX056EElJCjJVACeJBZgNfVp+iCCm4RBWCgKsRxASSA9KgDhDtCiTuMyfHsKXzhC6wNAIjjWb8LKAOA2ctk3FmCOlgKFy8f1N0JJtgsxinYnVAHt4t3gPzZXSCTyCWCQmBT91QE3B5yarSN40dNHYPka4TlDhTUI8zLvl0JSL3vZn6DsCFZOeB2yROEpR68sECQQA++xIGCR2X7DwlEoLRgUrZrqlUg50S1uy43YqDcN6UFBVkhAjWiCV2Q0jgQPdplMKxvBXodcOfAwJYvgdL+1etA1YJJfBcZlQV7sO1i2gHoNiyxtQ5sBsCgWyoxCHiFFd2L5nUTCqMAqGUgsQ9f5kCcCiZgRYkMgMTd5WsB1rTzj0Em14BE4r+QxN1lCEsVur2PoF5Wbg8RJXR4djgvBgauhLywoEZQrt1KKRdVS4CdlJ8qafyP+9KIj/nE/d7kKwH9jgS72e9DV+kvfTWgct4ZyP8Byb8BPG7MaaIIkAQAAAAASUVORK5CYII="

// 4 Verified land coordinates corresponding to the 4 bento cards
const FEATURED_COORDINATES = [
  { id: 0, name: "Amsterdam / Europe", lat: 52.37, lng: 4.90, targetSide: "left" },
  { id: 1, name: "New York / Americas", lat: 40.71, lng: -74.00, targetSide: "right" },
  { id: 2, name: "Beijing / Asia", lat: 39.90, lng: 116.40, targetSide: "left" },
  { id: 3, name: "Middle East Hub", lat: 35.69, lng: 51.39, targetSide: "right" },
]

// Target vectors for left-facing and right-facing card orientations
const TARGET_LEFT = new THREE.Vector3(-0.68, 0.12, 0.72).normalize()
const TARGET_RIGHT = new THREE.Vector3(0.68, 0.12, 0.72).normalize()

const STAGE_QUATERNIONS = FEATURED_COORDINATES.map((coord) => {
  const vSource = latLngToVector3(coord.lat, coord.lng, 1).normalize()
  const vTarget = coord.targetSide === "left" ? TARGET_LEFT : TARGET_RIGHT
  return new THREE.Quaternion().setFromUnitVectors(vSource, vTarget)
})

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

export interface PointScreenPos {
  x: number
  y: number
  visible: boolean
  coordId: number
  isSnapped: boolean
}

export interface ThreeGlobeProps {
  className?: string
  globeZ?: MotionValue<number>
  globeScale?: MotionValue<number>
  activeStage?: number
  isMobile?: boolean
  onActivePointScreenPos?: (pos: PointScreenPos) => void
}

/**
 * ThreeGlobe: High-performance 3D Earth Globe
 * Features:
 * - Persistent globe stays visible at full scale during transitions
 * - Smooth glide Left <-> Right with 1-rotation roll animation
 * - Water: Primary/30 (#70CAB9 at 30% over white)
 * - Land: Solid Primary #70CAB9
 * - 4 Verified land coordinates facing their respective cards
 * - Real-time screen coordinate projection for dynamic connecting line
 */
export function ThreeGlobe({
  className = "",
  globeZ,
  globeScale,
  activeStage = 0,
  isMobile = false,
  onActivePointScreenPos,
}: ThreeGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onPointCallbackRef = useRef(onActivePointScreenPos)

  const activeStageRef = useRef(activeStage)
  const isMobileRef = useRef(isMobile)
  const globeZRef = useRef(globeZ)
  const globeScaleRef = useRef(globeScale)

  // Track position and orientation refs so transitions start seamlessly from current state
  const initialTargetX = isMobile ? 0 : (activeStage % 2 === 0 ? 3.5 : -3.5)
  const initialQ = STAGE_QUATERNIONS[activeStage]?.clone() || STAGE_QUATERNIONS[0].clone()
  const currentXRef = useRef(initialTargetX)
  const currentQRef = useRef(initialQ)

  const transitionRef = useRef<{
    inProgress: boolean
    startTime: number
    duration: number
    fromX: number
    toX: number
    fromQ: THREE.Quaternion
    toQ: THREE.Quaternion
  }>({
    inProgress: false,
    startTime: 0,
    duration: 750,
    fromX: initialTargetX,
    toX: initialTargetX,
    fromQ: initialQ.clone(),
    toQ: initialQ.clone(),
  })

  useEffect(() => {
    onPointCallbackRef.current = onActivePointScreenPos
  }, [onActivePointScreenPos])

  useEffect(() => {
    isMobileRef.current = isMobile
  }, [isMobile])

  useEffect(() => {
    globeZRef.current = globeZ
  }, [globeZ])

  useEffect(() => {
    globeScaleRef.current = globeScale
  }, [globeScale])

  // React to stage transitions without re-mounting the Three.js scene
  useEffect(() => {
    if (activeStage !== activeStageRef.current) {
      const newTargetX = isMobileRef.current ? 0 : (activeStage % 2 === 0 ? 3.5 : -3.5)
      const newTargetQ = STAGE_QUATERNIONS[activeStage] || STAGE_QUATERNIONS[0]

      transitionRef.current = {
        inProgress: true,
        startTime: performance.now(),
        duration: 750,
        fromX: currentXRef.current,
        toX: newTargetX,
        fromQ: currentQRef.current.clone(),
        toQ: newTargetQ.clone(),
      }
      activeStageRef.current = activeStage
    }
  }, [activeStage])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animId: number
    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight

    // 1. Three.js Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 13.5)

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    container.appendChild(renderer.domElement)

    // 3. Globe Root Group
    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const globeRadius = 2.65

    // 4. World Map Texture
    const textureLoader = new THREE.TextureLoader()
    const earthTexture = textureLoader.load(EARTH_MAP_BASE64)
    earthTexture.wrapS = THREE.RepeatWrapping
    earthTexture.wrapT = THREE.ClampToEdgeWrapping

    // 5. Clean Earth Sphere Shader (Water: Primary/30, Land: Solid Primary #70CAB9)
    const earthVertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const earthFragmentShader = `
      uniform sampler2D uMap;
      uniform vec3 uColorPrimary;
      uniform vec3 uLightDirection;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vec2 uv = vec2(fract(vUv.x + 0.5), vUv.y);
        vec4 mapColor = texture2D(uMap, uv);
        float isLand = step(0.18, mapColor.r);

        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(uLightDirection);
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 viewDir = normalize(-vPosition);

        // Water: Primary/30 (soft primary mint mixed with white)
        vec3 waterBase = mix(vec3(1.0, 1.0, 1.0), uColorPrimary, 0.30);
        vec3 water = waterBase * (0.88 + diff * 0.22);

        // Land: Solid Primary #70CAB9 with subtle lighting depth
        vec3 land = mix(uColorPrimary * 0.94, uColorPrimary * 1.10, diff * 0.4);

        vec3 surface = mix(water, land, isLand);

        // Specular ocean glint
        vec3 halfVector = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfVector), 0.0), 24.0) * (1.0 - isLand);
        surface += spec * vec3(1.0, 1.0, 1.0) * 0.45;

        // Subtle edge contour against white background
        float edge = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.2);
        surface = mix(surface, uColorPrimary * 0.8, edge * 0.3);

        gl_FragColor = vec4(surface, 1.0);
      }
    `

    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        uMap: { value: earthTexture },
        uColorPrimary: { value: new THREE.Color("#70CAB9") },
        uLightDirection: { value: new THREE.Vector3(1.2, 1.0, 1.5) },
      },
    })

    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64)
    const earthMesh = new THREE.Mesh(earthGeo, earthMaterial)
    globeGroup.add(earthMesh)

    // 6. Coordinate Marker Beacons on Land Surface
    interface BeaconObject {
      group: THREE.Group
      dot: THREE.Mesh
      ripple: THREE.Mesh
      coordId: number
    }

    const beacons: BeaconObject[] = []

    FEATURED_COORDINATES.forEach((coord) => {
      const beaconGroup = new THREE.Group()
      const pos = latLngToVector3(coord.lat, coord.lng, globeRadius * 1.008)
      beaconGroup.position.copy(pos)
      beaconGroup.lookAt(pos.clone().multiplyScalar(2))

      // Center contrast dot on land
      const dotGeo = new THREE.SphereGeometry(0.075, 16, 16)
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0x07463e,
      })
      const dot = new THREE.Mesh(dotGeo, dotMat)
      beaconGroup.add(dot)

      // Outer ripple ring in primary mint
      const rippleGeo = new THREE.RingGeometry(0.09, 0.15, 32)
      const rippleMat = new THREE.MeshBasicMaterial({
        color: 0x70cab9,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      })
      const ripple = new THREE.Mesh(rippleGeo, rippleMat)
      beaconGroup.add(ripple)

      globeGroup.add(beaconGroup)
      beacons.push({ group: beaconGroup, dot, ripple, coordId: coord.id })
    })

    // Initial position & quaternion
    globeGroup.position.x = currentXRef.current
    globeGroup.quaternion.copy(currentQRef.current)

    // 7. Animation Loop with Persistent Glide + 1-Rotation Spin between coordinates
    let rippleClock = 0

    const render = () => {
      rippleClock += 0.035
      const now = performance.now()
      const trans = transitionRef.current
      const stage = activeStageRef.current

      const baseTargetZ = globeZRef.current ? globeZRef.current.get() : 0
      const baseTargetScale = globeScaleRef.current
        ? globeScaleRef.current.get()
        : isMobileRef.current
          ? 0.68
          : 1

      let curX: number
      let curQ: THREE.Quaternion
      let isCurrentlySnapped = true

      if (trans.inProgress) {
        const elapsed = now - trans.startTime
        const tau = Math.min(1, Math.max(0, elapsed / trans.duration))

        if (tau < 1) {
          isCurrentlySnapped = false

          // Smooth cubic ease-in-out curve
          const ease = tau < 0.5 ? 4 * tau * tau * tau : 1 - Math.pow(-2 * tau + 2, 3) / 2

          // Smooth horizontal glide across the screen
          curX = trans.fromX + (trans.toX - trans.fromX) * ease

          // Base orientation slerp towards destination coordinate
          const baseQ = new THREE.Quaternion().slerpQuaternions(trans.fromQ, trans.toQ, ease)

          // 1-Rotation Spin (full 360-degree roll in motion direction)
          const deltaX = trans.toX - trans.fromX
          const spinDir = Math.abs(deltaX) > 0.1 ? (deltaX < 0 ? -1 : 1) : 1
          const spinAngle = spinDir * ease * Math.PI * 2
          const spinQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), spinAngle)

          curQ = spinQ.multiply(baseQ.clone())
        } else {
          trans.inProgress = false
          isCurrentlySnapped = true
          curX = trans.toX
          curQ = trans.toQ.clone()
        }

        currentXRef.current = curX
        currentQRef.current = curQ.clone()
      } else {
        const targetX = isMobileRef.current ? 0 : (stage % 2 === 0 ? 3.5 : -3.5)
        const targetQ = STAGE_QUATERNIONS[stage] || STAGE_QUATERNIONS[0]
        curX = targetX
        curQ = targetQ
        currentXRef.current = curX
        currentQRef.current = curQ.clone()
        isCurrentlySnapped = true
      }

      // Apply transforms: Globe stays persistent (scale = baseTargetScale, z = baseTargetZ)
      globeGroup.position.x = curX
      globeGroup.position.y = 0
      globeGroup.position.z = baseTargetZ

      globeGroup.scale.set(baseTargetScale, baseTargetScale, baseTargetScale)
      globeGroup.quaternion.copy(curQ)

      // Update beacon visuals
      beacons.forEach((b) => {
        const isActive = b.coordId === stage
        if (isActive) {
          b.dot.scale.set(1.25, 1.25, 1.25)
          const rippleScale = 1 + (Math.sin(rippleClock * 2) * 0.5 + 0.5) * 0.6
          b.ripple.scale.set(rippleScale, rippleScale, 1)
          const rippleMat = b.ripple.material as THREE.MeshBasicMaterial
          rippleMat.opacity = isCurrentlySnapped
            ? Math.max(0.15, 0.9 - (rippleScale - 1) * 1.2)
            : 0.2
        } else {
          b.dot.scale.set(0.65, 0.65, 0.65)
          b.ripple.scale.set(1, 1, 1)
          const rippleMat = b.ripple.material as THREE.MeshBasicMaterial
          rippleMat.opacity = 0.15
        }
      })

      // Project active coordinate screen position to feed connecting line to card
      if (beacons[stage]) {
        const activeBeacon = beacons[stage]
        const worldPos = new THREE.Vector3()
        activeBeacon.dot.getWorldPosition(worldPos)
        const proj = worldPos.clone().project(camera)
        const px = (proj.x * 0.5 + 0.5) * width
        const py = (-proj.y * 0.5 + 0.5) * height
        const isFacing = proj.z < 1.0

        if (onPointCallbackRef.current) {
          onPointCallbackRef.current({
            x: px,
            y: py,
            visible: isFacing && isCurrentlySnapped,
            coordId: stage,
            isSnapped: isCurrentlySnapped,
          })
        }
      }

      renderer.render(scene, camera)
      animId = requestAnimationFrame(render)
    }

    render()

    // 8. Resize Handling
    const handleResize = () => {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", handleResize)
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
      earthGeo.dispose()
      earthMaterial.dispose()
      earthTexture.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ pointerEvents: "none" }}
    />
  )
}
