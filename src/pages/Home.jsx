import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Preload } from '@react-three/drei';
import AirplaneScene from '../components/AirplaneScene';
import MiniMap from '../components/MiniMap';
import * as THREE from 'three';

const parkPositions = [
  new THREE.Vector3(-10, 0, -280),
  new THREE.Vector3(1920, 1.55, -3183),
  new THREE.Vector3(3500, 1.55, -5700),
  new THREE.Vector3(3900, 1.55, -2600),
  new THREE.Vector3(6300, 1.55, -5950),
  new THREE.Vector3(6600, 1.55, -2500),
];

export default function Home() {
  const [airplanePosition, setAirplanePosition] = useState([-396, 20, -695]);
  const [airplaneRotation, setAirplaneRotation] = useState(0);
  const [followTarget, setFollowTarget] = useState('airplane');
  const [showMessage, setShowMessage] = useState(false);
  const [showAirportButton, setShowAirportButton] = useState(false);
  const [currentAirportUrl, setCurrentAirportUrl] = useState(null);

  const handleAirportClick = () => {
    if (currentAirportUrl) {
      window.open(currentAirportUrl, '_blank', 'width=1200,height=800,left=200,top=100,noopener,noreferrer');
      setShowAirportButton(false);
    }
  };

  return (
    <>
      {showMessage && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          zIndex: 1000,
          fontSize: '1.2em',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          userSelect: 'none',
          fontFamily: 'Arial, sans-serif',
        }}>
          Presiona **Enter** para bajarte del coche
        </div>
      )}

      {followTarget === 'airplane' && (
        <MiniMap 
          airplanePosition={airplanePosition} 
          airplaneRotation={airplaneRotation} 
        />
      )}

      <Canvas camera={{ position: [0, 200, 500], fov: 60 }}>
        <Sky distance={450000} sunPosition={[100, 20, 100]} inclination={0} azimuth={0.25} mieCoefficient={0.005} rayleigh={1} turbidity={10} />
        <ambientLight />
        <directionalLight position={[100, 200, 100]} />
        
        <Suspense fallback={null}>
          <AirplaneScene
            onPositionChange={setAirplanePosition}
            onRotationChange={setAirplaneRotation}
            onShowMessage={setShowMessage} 
            parkPositions={parkPositions} 
            setFollowTarget={setFollowTarget} 
            followTarget={followTarget}     
            setShowAirportButton={setShowAirportButton}
            setCurrentAirportUrl={setCurrentAirportUrl}
          />
        </Suspense>
        
        <Preload all /> 
      </Canvas>

      {showAirportButton && (
        <button
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '24px 48px',
            fontSize: '24px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
          }}
          onClick={handleAirportClick}
        >
          Ir al proyecto
        </button>
      )}
    </>
  );
}
