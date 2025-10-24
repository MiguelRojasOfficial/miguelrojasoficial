import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export default function Snow({
  areaCenter = [0, 0, 0],
  areaSize = 200,
  count = 1000,
  fallSpeed = 0.006,     
  windSpeed = 0.03,     
  swirlIntensity = 0.02 
}) {
  const pointsRef = useRef()
  const snowTexture = useLoader(THREE.TextureLoader, '/textures/snowflake.png')

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * areaSize + areaCenter[0]
      arr[i * 3 + 1] = Math.random() * 100 + areaCenter[1]
      arr[i * 3 + 2] = (Math.random() - 0.5) * areaSize + areaCenter[2]
    }
    return arr
  }, [areaCenter, areaSize, count])

  useFrame(({ clock }) => {
    const pos = pointsRef.current.geometry.attributes.position.array
    const time = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3 + 1] -= fallSpeed + Math.sin(time * 0.5 + i) * swirlIntensity
      pos[i3] += Math.sin(time * 0.3 + i) * windSpeed
      pos[i3 + 2] += Math.cos(time * 0.25 + i) * windSpeed * 1.2

      if (pos[i3 + 1] < areaCenter[1]) {
        pos[i3] = (Math.random() - 0.5) * areaSize + areaCenter[0]
        pos[i3 + 1] = Math.random() * 100 + areaCenter[1]
        pos[i3 + 2] = (Math.random() - 0.5) * areaSize + areaCenter[2]
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={snowTexture}
        color="#ffffff"
        size={1.5}
        transparent
        opacity={0.9}
        alphaTest={0.1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
