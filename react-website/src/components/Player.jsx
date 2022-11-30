import React, { useState, useEffect } from 'react';

function Player({track}) {
  console.log(track);
  return (
    <div className="player-wrapper">
      <audio autoPlay controls>
        <source src={track.preview_url} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Player