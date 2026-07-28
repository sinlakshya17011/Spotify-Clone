import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const SongItem = ({image,name,desc,id}) => {

   const Naviagte = useNavigate()

  return (
    <div onClick={()=>Navigate(`/songs/${id}`)} className='min-w-45 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded' src={image} />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc}</p>  
    </div>
  )
}

export default SongItem