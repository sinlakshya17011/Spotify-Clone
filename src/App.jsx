import React, { useContext } from 'react'
import Sidebar from './Componenets/Sidebar'
import Player from './Componenets/Player'
import Display from './Componenets/Display'
import { PlayerContext } from './Context/playerContext'


const App = () => {

  const {audioRef, track} = useContext(PlayerContext)
  return (
    <div className='h-screen bg-black'>
        <div className='h-[90%] flex'>
            <Sidebar />
            <Display />
        </div>
           <Player />
           <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </div>
  )
}

export default App