import React, { useEffect } from 'react';
import './player.css';

function Player({track, settings, setSettings}) {

  const handleVolumeChange = (event) => {
    setSettings({...settings, volume:(event.target.volume * 100)});
  }

  useEffect(()=>{
    let player = document.getElementById('player');
    let source = document.getElementById('source');
    source.src = track.preview_url;

    player.volume = settings.volume / 100;
    player.load();
    player.play();
  }, [track.preview_url, settings.volume])


  return (
    <div className='player-wrapper'>
      <div className='player-album'>
        <img
          src={track.album.images[1].url}
          alt='Album art not available'
          draggable='true'
          style={{'height':'300px', 'width':'300px'}}
          className='album-art'
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