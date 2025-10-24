import React from 'react'
import * as THREE from 'three'

const AirplaneIcon = ({ rotation }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="limegreen"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', transformOrigin: 'center center', transform: `rotate(${rotation}deg)` }}
  >
    <path d="M2.5 19l19-7-19-7v6l13 1-13 1v6z" />
  </svg>
)

const points = [
  { name: 'América',    x: 1160,  z: 4500 },
  { name: 'Europa',     x: 2890,  z: 2000 },
  { name: 'África',     x: 3580,  z: 5510 },
  { name: 'Asia',       x: -1310, z: 1580 },
  { name: 'Oceanía',    x: -1380, z: -2401 },
]

function MiniMap({ airplanePosition, airplaneRotation = 0, mapWidth = 280, mapHeight = 170 }) {
  const minX = -399
  const maxX = 15500
  const minZ = 80
  const maxZ = 15500

  const rangeX = maxX - minX
  const rangeZ = maxZ - minZ

  const iconHalf = 10
  const innerW = mapWidth - 2 * iconHalf
  const innerH = mapHeight - 2 * iconHalf

  const worldToMap = (x, z) => {
    let normX = (x - minX) / rangeX
    let normZ = ((-z) - minZ) / rangeZ

    normX = (normX * 2) % 1
    normZ = (normZ * 2) % 1
    if (normX < 0) normX += 1
    if (normZ < 0) normZ += 1

    return {
      left: iconHalf + innerW * normX,
      top: mapHeight - (iconHalf + innerH * normZ)
    }
  }

  const { left, top } = worldToMap(airplanePosition[0], airplanePosition[2])

  const style = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: mapWidth,
    height: mapHeight,
    border: '2px solid black',
    backgroundImage: 'url(/textures/mapa-fondo.png)',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    zIndex: 1000
  }

  return (
    <div style={style}>
      {points.map((p, i) => {
        const { left, top } = worldToMap(p.x, p.z)
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left,
              top,
              width: 6,
              height: 6,
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            title={p.name}
          />
        )
      })}

      <div
        style={{
          position: 'absolute',
          left,
          top,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      >
        <AirplaneIcon rotation={-THREE.MathUtils.radToDeg(airplaneRotation) - 90} />
      </div>
    </div>
  )
}

export default MiniMap
