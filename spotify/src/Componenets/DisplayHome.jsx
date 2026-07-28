import React from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { albumsData } from "../assets/assets";
import { songsData } from "../assets/assets";

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className="m-4">
        <h1 className="my-5 font-bold text-2xl">Featured Chart</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, idx) => (
          <AlbumItem
            key={idx}
            image={item.image}
            name={item.name}
            desc={item.desc}
            id={item.id}
          />
        ))}
        </div>
        
      </div>
      <div className="m-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits </h1>
        <div className="flex overflow-auto">
         {songsData.map((item, idx) => (
          <SongItem
          key={idx}
          image={item.image}
          name={item.name}
          desc={item.desc}
          id={item.id} 
         />
         ))}
 
        </div>
        
      </div>
    </>
  );
};

export default DisplayHome;
