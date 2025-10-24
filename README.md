# Flight Simulator 3D

![React](https://img.shields.io/badge/React-18-blue?logo=react) ![Three.js](https://img.shields.io/badge/Three.js-0.160.0-orange?logo=three.js) ![Vite](https://img.shields.io/badge/Vite-4.5.0-green?logo=vite) ![License](https://img.shields.io/badge/License-MIT-blue)

Simulador de vuelo 3D desarrollado con **React**, **Three.js**, **@react-three/fiber** y **@react-three/drei**. Este proyecto permite pilotar un avión sobre un mapa con ciudades, aeropuertos y condiciones climáticas como nieve. Incluye minimapa, controles de vuelo y aterrizaje automático.

---

## Demo

Puedes ejecutar localmente siguiendo las instrucciones de instalación.

---

## Características

- **Avión interactivo**: Despegue automático, aceleración, giro, ascenso y descenso.
- **Aeropuertos**: Varios aeropuertos distribuidos en el mapa, con detección de aterrizaje.
- **Ciudades**: Modelos 3D de ciudades en el mapa.
- **Minimapa**: Muestra la posición y orientación del avión.
- **Clima**: Efectos de nieve dinámica sobre ciertas áreas.
- **Cámara dinámica**: Sigue el avión automáticamente y permite cámara libre con OrbitControls.
- **Pantalla de instrucciones y carga de assets**: Preloader de modelos GLTF y texturas, con pantalla de controles.

---

## Controles

| Tecla        | Acción                           |
|--------------|---------------------------------|
| ⬆️ Arrow Up   | Acelerar / iniciar vuelo         |
| ⬇️ Arrow Down | Descender / iniciar aterrizaje  |
| ⬅️ Arrow Left | Girar a la izquierda            |
| ➡️ Arrow Right| Girar a la derecha              |

> Mantener presionada la flecha arriba para despegar. El avión subirá automáticamente después de unos segundos.

---

## Instalación

1. Abre la carpeta del proyecto en tu terminal.

2. Instala dependencias:
npm install
o
yarn install

3. Ejecuta la aplicación:
npm run dev
o
yarn dev

Abre http://localhost:5173 en tu navegador.

---

## Estructura del proyecto

src/
├─ components/
│  ├─ Airplane.jsx
│  ├─ AirplaneScene.jsx
│  ├─ Airport.jsx
│  ├─ City.jsx
│  ├─ ClientSplash.jsx
│  ├─ InstructionScreen.jsx
│  ├─ MapFloor.jsx
│  ├─ MiniMap.jsx
│  └─ Snow.jsx
├─ pages/
│  └─ Home.jsx
├─ css/
│  ├─ index.css
│  └─ InstructionScreen.css
└─ main.jsx

---

## Dependencias principales

- React 19
- Three.js
- @react-three/fiber
- @react-three/drei
- Vite (para bundling y desarrollo rápido)

---

## Modelos 3D usados

Todos los modelos se usan bajo Creative Commons Attribution (CC BY 4.0).

- Avión: Engineless Airplane por cursed toilet (Licencia: CC BY 4.0)
- Aeropuertos: Modelos free/standard de Sketchfab: https://sketchfab.com/assetfactory
- Ciudades: Burnin Rubber Crash n' Burn City, Burnin Rubber 4 City, Burnin Rubber 4 Snow Peak por https://sketchfab.com/amogusstrikesback2  (Licencia: CC BY 4.0)
- Texturas: /textures/mapa.png, /textures/mapa-fondo.png, /textures/snowflake.png

---

## Funcionalidades futuras

- Sistema de puntuación o misiones.
- Varias condiciones climáticas.
- Sonido de motor y efectos ambientales.
- Aviones adicionales y aeropuertos expandibles.

---

## Créditos

Desarrollo por [Miguel Villaverde Rojas]  
Modelos 3D: ver sección "Modelos 3D usados"  
Three.js, React y @react-three/fiber para gráficos 3D en el navegador.

---

## Licencia

Este proyecto está licenciado bajo MIT License, los modelos 3D siguen sus respectivas licencias de CC BY 4.0.
