import React, { useState, useEffect } from 'react';

function Player({track}) {


  useEffect(()=>{
    let player = document.getElementById('player');
    let source = document.getElementById('source');
    source.src = track.preview_url;

    player.load();
    player.play();
  }, [track])
  // const handleNext = () => {
  //   console.log('track #1: ', track);
  //   changeSong();
  //   console.log('track #2: ', track)
  // }


  return (
    <div className='player-wrapper'>
      <div className='player-album'>
        <img
          src={track.album.images[1].url}
          alt='Album art not available'
          draggable='true'
          style={{'height':'300px'}}
        />
      </div>
      <div className='player-info'>
        <div className='player-title'>
          {track.name}
        </div>
        <div className='player-artist'>
          {track.artists[0].name}
        </div>
      </div>
      <audio id='player' autoPlay controls volume='0.5'>
      {/* onEnded={handleNext} */}
        <source id='source' src={track.preview_url} type='audio/mpeg' width='250px'/>
      </audio>
    </div>
  );
}

export default Player