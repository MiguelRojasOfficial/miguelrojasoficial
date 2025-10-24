import { useGLTF } from '@react-three/drei'

function Airport({ src, position, scale = 0.3, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(src)
  scene.rotation.set(...rotation)
  return <primitive object={scene} position={position} scale={scale} />
}

export default Airport