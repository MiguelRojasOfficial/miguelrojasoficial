import { useState, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Airplane from './Airplane'
import Airport from './Airport'
import MapFloor from './MapFloor'
import * as THREE from 'three'
import City from './City'
import Snow from './Snow'

const airports = [
  { id: 1, position: new THREE.Vector3(1768, 2, -3180), url: 'https://miguelflix.onrender.com' },
  { id: 2, position: new THREE.Vector3(3481, 2.08, -5625), url: 'https://migueltify.onrender.com' },
  { id: 3, position: new THREE.Vector3(3860, 2, -2460), url: 'https://migueltv.onrender.com' },
  { id: 4, position: new THREE.Vector3(6348.65, 2, -5880), url: 'https://miguelstore.onrender.com' },
  { id: 5, position: new THREE.Vector3(6615.7, 2.5, -2460), url: 'https://miguelcrm.onrender.com' },
]

function findExactAirport(planePosition) {
  for (let airport of airports) {
    if (
      Math.abs(planePosition.x - airport.position.x) < 50 &&
      Math.abs(planePosition.z - airport.position.z) < 50
    ) {
      return airport
    }
  }
  return null
}

export default function AirplaneScene({ onPositionChange, onRotationChange, setFollowTarget, followTarget, setShowAirportButton, setCurrentAirportUrl, }) {
  const [airplanePosition, setAirplanePosition] = useState([0, 7.5, -80])
  const [airplaneRotation, setAirplaneRotation] = useState(0)
  const openedAirports = useRef(new Set());
  const { camera } = useThree()
  const keys = useRef({})

  useEffect(() => {
    const handleKeydown = (e) => (keys.current[e.key] = true)
    const handleKeyup = (e) => (keys.current[e.key] = false)
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keyup', handleKeyup)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('keyup', handleKeyup)
    }
  }, [])

  useFrame(() => {
    const targetPos = new THREE.Vector3(...airplanePosition)
    const targetRotation = airplaneRotation
    const camDistance = 80
    const camHeight = 30

    camera.position.set(
      targetPos.x - Math.sin(targetRotation) * camDistance,
      targetPos.y + camHeight,
      targetPos.z + Math.cos(targetRotation) * camDistance
    )
    camera.lookAt(targetPos.x, targetPos.y, targetPos.z)
    onPositionChange?.(airplanePosition)
    onRotationChange?.(airplaneRotation)
  })

  return (
    <>
      {followTarget === 'free' && <OrbitControls />}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 5]} intensity={1} />

      <MapFloor />

      <Airport src="/models/JESUS.glb" position={[-39.65, 2.5, -138]} scale={0.2} rotation={[0, Math.PI, 0]} />
      <Airport src="/models/JESUS1.glb" position={[1768, 1.5, -3180]} scale={0.2} />
      <Airport src="/models/JESUS3.glb" position={[3481, 2.08, -5625]} scale={0.2} />
      <Airport src="/models/JESUS5.glb" position={[3860, 2, -2460]} scale={0.2} />
      <Airport src="/models/JESUS7.glb" position={[6348.65, 2, -5880]} scale={0.2} rotation={[0, Math.PI, 0]} />
      <Airport src="/models/JESUS9.glb" position={[6615.7, 2.5, -2460]} scale={0.2} rotation={[0, Math.PI, 0]} />

      <City src="/models/ciudad.glb" position={[-55, 0, -310]} scale={0.08} rotation={[0, Math.PI, 0]} />
      <City src="/models/ciudad1.glb" position={[1755, -0.5, -3302.5]} scale={0.08} rotation={[0, -Math.PI / 2, 0]} />
      <City src="/models/ciudad3.glb" position={[3471, 0, -5745]} scale={0.08} rotation={[0, -Math.PI / 2, 0]} />
      <City src="/models/ciudad5.glb" position={[3849, 0, -2581.3]} scale={0.08} rotation={[0, -Math.PI / 2, 0]} />
      <City src="/models/ciudad7.glb" position={[6359.5, 0, -5758.6]} scale={0.08} rotation={[0, Math.PI / 2, 0]} />
      <City src="/models/ciudad9.glb" position={[6625.9, 0, -2338.5]} scale={0.08} rotation={[0, Math.PI / 2, 0]} />

      <Snow areaCenter={[-55, 0, -310]} areaSize={400} count={1000} />
      <Snow areaCenter={[3471, 0, -5745]} areaSize={400} count={1000} />

      <Airplane
        position={airplanePosition}
        rotation={[0, airplaneRotation, 0]}
        onMove={(pos) => setAirplanePosition(pos)}
        onRotate={(rot) => setAirplaneRotation(rot)}
        onLanded={(landedPos) => {
          const landedVector = new THREE.Vector3(...landedPos);
          const airport = findExactAirport(landedVector);
          if (airport && !openedAirports.current.has(airport.id)) {
            openedAirports.current.add(airport.id);
            setCurrentAirportUrl(airport.url);
            setShowAirportButton(true);
            console.log('Aterrizó en aeropuerto', airport.id, 'pos:', landedPos);
          }
        }}
      />
    </>
  )
}

