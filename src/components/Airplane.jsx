import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function Airplane({ position, onMove, onRotate, onLanded }) {
  const ref = useRef()
  const { scene } = useGLTF('/models/airplane.glb')
  const [keys, setKeys] = useState({ left: false, right: false, forward: false, down: false })
  const [takeoff, setTakeoff] = useState(false)
  const [started, setStarted] = useState(false)
  const [isLanding, setIsLanding] = useState(false)
  const [landed, setLanded] = useState(false)
  const [targetAirport, setTargetAirport] = useState(null)

  const speed = 8.8
  const ascentSpeed = 0.1
  const descentSpeed = 0.05
  const maxAltitude = 250
  const groundAltitude = 6
  const landingDistance = 500
  
  const airportPositions = [
    { pos: new THREE.Vector3(-39.65, 2.5, -138) },
    { pos: new THREE.Vector3(1728, 7.2, -3180) },
    { pos: new THREE.Vector3(3441, 6.5, -5625) },
    { pos: new THREE.Vector3(3820, 7.5, -2460) },
    { pos: new THREE.Vector3(6388.3, 7, -5880) },
    { pos: new THREE.Vector3(6655.5, 8.5, -2460) },
  ];

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowUp') {
        setKeys(k => ({ ...k, forward: true }))
        if (!started) {
          setStarted(true)
          setTimeout(() => setTakeoff(true), 5000)
        }
      }
      if (e.key === 'ArrowDown') {
        setKeys(k => ({ ...k, down: true }))
      }
      if (e.key === 'ArrowLeft') setKeys(k => ({ ...k, left: true }))
      if (e.key === 'ArrowRight') setKeys(k => ({ ...k, right: true }))
    }

    function handleKeyUp(e) {
      if (e.key === 'ArrowUp') setKeys(k => ({ ...k, forward: false }))
      if (e.key === 'ArrowDown') setKeys(k => ({ ...k, down: false }))
      if (e.key === 'ArrowLeft') setKeys(k => ({ ...k, left: false }))
      if (e.key === 'ArrowRight') setKeys(k => ({ ...k, right: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyUp)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [started])

  useFrame(() => {
    if (!ref.current || landed) return

    const currentPosition = new THREE.Vector3().copy(ref.current.position)
    let isNearAirport = false
    let currentAirport = null
    for (const airport of airportPositions) {
      if (currentPosition.distanceTo(airport.pos) < landingDistance) {
        isNearAirport = true
        currentAirport = airport
        break
      }
    }

    if (!landed) {
        if (keys.left) ref.current.rotation.y += 0.03
        if (keys.right) ref.current.rotation.y -= 0.03
    }
    
    if (!isLanding && !landed) {
        if (keys.forward) {
            const dir = new THREE.Vector3(0, 0, -1)
            dir.applyEuler(ref.current.rotation)
            dir.multiplyScalar(speed)
            ref.current.position.add(dir)
        }
    }
    
    if (takeoff && ref.current.position.y < maxAltitude && !keys.down) {
      ref.current.position.y += ascentSpeed
    }
    
    if (keys.down && isNearAirport && ref.current.position.y > currentAirport.pos.y && !isLanding) {
        setIsLanding(true)
        setTargetAirport(currentAirport)
    }

    if (isLanding) {
      const targetPos = new THREE.Vector3(targetAirport.pos.x, targetAirport.pos.y, targetAirport.pos.z)
      const distanceToTarget = currentPosition.distanceTo(targetPos)
      const altitudeToTarget = currentPosition.y - targetAirport.pos.y
      
      const dir = new THREE.Vector3(0, 0, -1)
      dir.applyEuler(ref.current.rotation)
      const dotProduct = new THREE.Vector3().subVectors(targetPos, currentPosition).normalize().dot(dir)

      if (dotProduct > 0 && distanceToTarget > 1) {
          const landingDir = new THREE.Vector3().subVectors(targetPos, currentPosition).normalize()
          ref.current.position.addScaledVector(landingDir, speed * 0.5)
      } else {
          const forwardDir = new THREE.Vector3(0, 0, -1)
          forwardDir.applyEuler(ref.current.rotation)
          ref.current.position.addScaledVector(forwardDir, speed * 0.5)
      }

      if (altitudeToTarget > 0) {
        let actualDescentSpeed = descentSpeed
        if (altitudeToTarget < 20) {
          actualDescentSpeed *= (altitudeToTarget / 20)
        }
        ref.current.position.y -= actualDescentSpeed
      }
      
      if (distanceToTarget > landingDistance * 1.5 && altitudeToTarget > 10) {
          setIsLanding(false)
          setTargetAirport(null)
      }

      if (ref.current.position.y <= targetAirport.pos.y + 0.1 && distanceToTarget < 20) {
          ref.current.position.copy(targetPos)
          ref.current.position.y = targetAirport.pos.y
          setIsLanding(false)
          setLanded(true)
          
          if (onLanded) onLanded(targetAirport.pos);

          setTimeout(() => {
              setLanded(false)
              setTakeoff(false)
              setStarted(false)
          }, 15000)
      }
    }

    onRotate?.(ref.current.rotation.y)
    onMove?.([ref.current.position.x, ref.current.position.y, ref.current.position.z])
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      position={position}
      rotation={[0, 0, 0]}
      scale={0.6}
    />
  )
}

export default Airplane