import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from '../assets/assets'

const Display = () => {
  
  const displayRef = useRef();
  const Location = useLocation();
  const isAlbum = Location.pathname.includes("album");
  const albumId = isAlbum ? Number(Location.pathname.split("/").pop()) : null;
  const bgColor = albumId !== null && albumsData[albumId] ? albumsData[albumId].bgColor : "#121212";

   
  useEffect(() => {
    if (!displayRef.current) return;

    displayRef.current.style.background = isAlbum
      ? `linear-gradient(${bgColor}, #121212)`
      : "#121212";
  }, [isAlbum, bgColor]);

  

  return (
    <div ref={displayRef} className='w-full m-2 px-6 py-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
       <Routes >
         <Route path='/' element={<DisplayHome/>} />
         <Route path='/album/:id' element={<DisplayAlbum/>} />
       </Routes>
    </div>
  )
}

export default Display