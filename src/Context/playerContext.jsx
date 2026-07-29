import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track,setTrack] = useState(songsData[0])
  const [playStatus, setPlayStatus] = useState(false)
  const [time,setTime] = useState({
    currentTime:{
      second:0,
      minute:0
    },
    totalTime:{
      second:0,
      minute:0
    }
  })

  const updateSeekBar = () => {
    const audio = audioRef.current;
    const bar = seekBar.current;

    if (!audio || !bar) return;

    const current = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    const percent = duration > 0 ? (current / duration) * 100 : 0;

    bar.style.width = `${Math.min(percent, 100)}%`;
  };

  const play = async () =>{
    const audio = audioRef.current;

    if (audio) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio play failed:", error);
        return;
      }
    }

    setPlayStatus(true)
    updateSeekBar();
  }

  const pause = () =>{
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setPlayStatus(false)
  }

  const selectTrack = async (nextTrack, shouldPlay = false) => {
    if (!nextTrack) return;

    setTrack(nextTrack);
    setTime({
      currentTime: { second: 0, minute: 0 },
      totalTime: { second: 0, minute: 0 },
    });

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = nextTrack.file;
      audio.load();

      if (shouldPlay) {
        try {
          await audio.play();
        } catch (error) {
          console.error("Audio play failed:", error);
        }
      }
    }

    setPlayStatus(shouldPlay);
    updateSeekBar();
  };

  const nextTrack = async () => {
    const currentIndex = songsData.findIndex((song) => song.id === track.id);
    const nextIndex = (currentIndex + 1) % songsData.length;
    await selectTrack(songsData[nextIndex], playStatus);
  };

  const previousTrack = async () => {
    const currentIndex = songsData.findIndex((song) => song.id === track.id);
    const previousIndex = (currentIndex - 1 + songsData.length) % songsData.length;
    await selectTrack(songsData[previousIndex], playStatus);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const current = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
      const duration = Number.isFinite(audio.duration) ? audio.duration : 0;

      setTime({
        currentTime: {
          second: Math.floor(current % 60),
          minute: Math.floor(current / 60),
        },
        totalTime: {
          second: Math.floor(duration % 60),
          minute: Math.floor(duration / 60),
        },
      });

      updateSeekBar();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("play", updateSeekBar);
    audio.addEventListener("playing", updateSeekBar);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("play", updateSeekBar);
      audio.removeEventListener("playing", updateSeekBar);
    };
  }, []);

   const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,setTrack,
    playStatus,setPlayStatus,
    time,setTime,
    play,pause,nextTrack,previousTrack
  };

  return (
             <PlayerContext.Provider value={contextValue}>
              {props.children} 
              </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;
