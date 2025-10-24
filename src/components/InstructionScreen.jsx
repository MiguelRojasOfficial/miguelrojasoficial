'use client'
import React, { useEffect, useState } from 'react'
import '../css/InstructionScreen.css'

export default function InstructionScreen({ onStart }) {
  const [lang, setLang] = useState('en')
  const [percent, setPercent] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const browserLang = (navigator.language || navigator.userLanguage || 'en').startsWith('es') ? 'es' : 'en'
    setLang(browserLang)
  }, [])

  useEffect(() => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setIsReady(true)
      }
      setPercent(Math.floor(progress))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="instruction-container">
      <div className="instruction-box">
        <h1 className="instruction-title">
          {lang === 'es' ? 'Controles del Vuelo' : 'Flight Controls'}
        </h1>

        <p className="instruction-text">
          {lang === 'es'
            ? 'Aprende a pilotar tu avión antes de despegar:'
            : 'Learn how to pilot your plane before takeoff:'}
        </p>

        <ul className="instruction-list">
          <li>⬆️ <strong>{lang === 'es' ? 'Flecha arriba' : 'Arrow Up'}</strong> — {lang === 'es' ? 'Iniciar vuelo y acelerar' : 'Start flight and accelerate'}</li>
          <li>⬇️ <strong>{lang === 'es' ? 'Flecha abajo' : 'Arrow Down'}</strong> — {lang === 'es' ? 'Descender o aterrizar' : 'Descend or begin landing'}</li>
          <li>⬅️ <strong>{lang === 'es' ? 'Flecha izquierda' : 'Arrow Left'}</strong> — {lang === 'es' ? 'Girar a la izquierda' : 'Turn left'}</li>
          <li>➡️ <strong>{lang === 'es' ? 'Flecha derecha' : 'Arrow Right'}</strong> — {lang === 'es' ? 'Girar a la derecha' : 'Turn right'}</li>
        </ul>

        <p className="instruction-note">
          {lang === 'es'
            ? <>Mantén presionada la <strong>flecha arriba</strong> para despegar.<br/>El avión subirá automáticamente después de unos segundos.</>
            : <>Hold the <strong>Up Arrow</strong> key to take off.<br/>The plane will lift automatically after a few seconds.</>}
        </p>

        <div style={{ marginTop: 14, width: '100%' }}>
          {!isReady && (
            <div style={{ fontSize: 13, marginBottom: 6 }}>
              {lang === 'es' ? 'Cargando el juego:' : 'Loading game:'}
            </div>
          )}

          <div style={{ width: '100%', height: 8, background: '#111', borderRadius: 6, overflow: 'hidden' }}>
            <div
              style={{
                width: `${percent}%`,
                height: '100%',
                background: isReady ? '#06b6d4' : '#0ea5a4',
                transition: 'width 600ms ease-in-out',
              }}
            />
          </div>

          <div style={{ fontSize: 12, color: isReady ? '#06b6d4' : '#888', marginTop: 8 }}>
            {isReady
              ? (lang === 'es' ? 'Listo — presiona Empezar' : 'Ready — press Start')
              : (lang === 'es' ? 'Precargando activos. Por favor espera...' : 'Preloading assets. Please wait...')}
          </div>
        </div>

        <button
          className="instruction-button"
          onClick={onStart}
          disabled={!isReady}
          style={{
            marginTop: 18,
            padding: '10px 18px',
            fontSize: 16,
            background: isReady ? '#0ea5a4' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: isReady ? 'pointer' : 'not-allowed',
            boxShadow: isReady ? '0 0 8px #06b6d4' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {lang === 'es' ? 'Empezar vuelo ✈️' : 'Start Flight ✈️'}
        </button>
      </div>
    </div>
  )
}
