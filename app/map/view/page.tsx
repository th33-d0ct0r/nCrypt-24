import React from 'react'

const MapView = () => {
  return (
    <div className="flex items-center w-[100vw] h-[100vh]">
        <img src="/map.png" className="w-[100vw]" />
        <img src="/marker.webp" className="h-[10vh] z-10 top-[20vh] left-[20vw] absolute" />
    </div>
  )
}

export default MapView