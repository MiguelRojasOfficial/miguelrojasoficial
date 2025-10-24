'use client'

import React, { useState, useEffect } from 'react'
import InstructionScreen from './InstructionScreen'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

const GLTF_MODELS = [
  '/models/airplane.glb',
  '/models/JESUS.glb',
  '/models/JESUS1.glb',
  '/models/JESUS3.glb',
  '/models/JESUS5.glb',
  '/models/JESUS7.glb',
  '/models/JESUS9.glb',
  '/models/ciudad.glb',
  '/models/ciudad1.glb',
  '/models/ciudad3.glb',
  '/models/ciudad5.glb',
  '/models/ciudad7.glb',
  '/models/ciudad9.glb',
]

const TEXTURES = [
  '/textures/mapa.png',
  '/textures/mapa-fondo.png',
  '/textures/snowflake.png',
]


export default function ClientSplash({ children }) {
  const [splashDone, setSplashDone] = useState(false)
  const [instructionsDone, setInstructionsDone] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 2000)
    return () => clearTimeout(t)
  }, [])

   useEffect(() => {
    let mounted = true
    async function startPreload() {
      const gltfCount = GLTF_MODELS.length
      const texCount = TEXTURES.length
      setTotalCount(gltfCount + texCount)
      setLoadedCount(0)

      GLTF_MODELS.forEach((path) => {
        try {
           if (useGLTF.preload) useGLTF.preload(path)
        } catch (e) {
        }
    })

    const loader = new THREE.TextureLoader()
      let localLoaded = 0

      await Promise.all(
        TEXTURES.map(
          (url) =>
            new Promise((res) => {
              loader.load(
                url,
                (tex) => {
                  localLoaded += 1
                  if (mounted) setLoadedCount(prev => prev + 1)
                  res()
                },
                undefined,
                (err) => {
                  localLoaded += 1
                  if (mounted) setLoadedCount(prev => prev + 1)
                  res()
                }
              )
            })
        )
      )

      setTimeout(() => {
        if (mounted) {
          setLoadedCount((c) => Math.min(totalCount, c + Math.max(0, totalCount - c)))
          setReady(true)
        }
      }, 250)
    }

    if (splashDone) startPreload()

    return () => {
      mounted = false
    }
  }, [splashDone])

  if (!splashDone) {
    return (
      <div className="splash-container">
        <div className="splash-text">
          JESÚS
          <div className="splash-bar">
            <div className="splash-bar-fill" />
          </div>
        </div>
      </div>
    )
  }

  if (!instructionsDone) {
    return (
      <InstructionScreen
        onStart={() => setInstructionsDone(true)}
        preloadProgress={{ loaded: loadedCount, total: totalCount, ready }}
      />
    )
  }

  return <>{children}</>
}