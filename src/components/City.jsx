import { useGLTF } from '@react-three/drei'

function City({ src, position, scale = 1, rotation = [0, 0, 0] }) { 
    const { scene } = useGLTF(src)
    scene.rotation.set(...rotation)

  return <primitive object={scene} position={position} scale={scale} />
}

export default City