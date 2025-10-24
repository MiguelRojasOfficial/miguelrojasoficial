import { useTexture } from '@react-three/drei'
import { RepeatWrapping } from 'three'

function MapFloor() {
  const texture = useTexture('/textures/mapa.png')
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(4, 4)

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[31000, 31000]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  )
}

export default MapFloor