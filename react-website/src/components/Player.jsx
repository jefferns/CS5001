import React, { useEffect, useRef, useState } from 'react';
import './player.css';

function Player({
  track, 
  settings, 
  setSettings
}) {
  const imgRef = useRef(null);

  let isDragging = false;
  let startX, startY = 0;


  const handleVolumeChange = (event) => {
    setSettings({...settings, volume:(event.target.volume * 100)});
  };

  const handleMouseDown = (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
  };

  const handleMouseMove = (event) => {
    if(!isDragging) return;
    if(!imgRef) return;
    var deltaX = event.clientX - startX;
    var deltaY = event.clientY - startY;
    var angle = deltaX / 10;

    imgRef.current.style.transform = 'rotateZ(' + angle + 'deg)';
  };

  const handleMouseUp = (event) => {
    isDragging = false;
    if(imgRef.current.style.transform) imgRef.current.style.removeProperty('transform');
  }

  useEffect(()=>{
    let player = document.getElementById('player');
    let source = document.getElementById('source');
    source.src = track.preview_url;

    player.volume = settings.volume / 100;
    player.load();
    player.play();
  }, [track.preview_url, settings.volume]);

  useEffect(()=>{
    // Add event listeners for handling drag/tilt animations
    document.getElementById('album-art').addEventListener('dragstart', handleMouseDown);
    document.getElementById('album-art').addEventListener('drag', handleMouseMove);
    document.getElementById('album-art').addEventListener('dragend', handleMouseUp);

  }, []);


  return (
    <div className='player-wrapper'>
      <div className='player-album'>
        <img
          src={track.album.images[1].url}
          id='album-art'
          alt='Album art not available'
          // draggable='false'
          style={{'height':'300px', 'width':'300px'}}
          className='album-art'
          ref={imgRef}
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
      <audio id='player' autoPlay controls onVolumeChange={handleVolumeChange}>
        <source id='source' src={track.preview_url} type='audio/mpeg' width='250px'/>
      </audio>
    </div>
  );
}

export default Player