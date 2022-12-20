import React, { useEffect, useState } from 'react';
import { addTracksToPlaylist, createPlaylist, getMe, getRecommendations } from '../api';
import Player from './Player';
import List from './List';
import './discovery.css';


const Discovery = ({
  currentTrack,
  recommendations,
  token,
  seeds,
  seed_type,
  setCurrentTrack,
  setDiscoveryMode,
  setRecommendations,
}) => {
  const [matches, setMatches] = useState([]);
  const [id, setId] = useState('');

  const addToMatches = () => {
    setMatches([...matches, currentTrack])
  }

  const addMatchesToPlaylist = (id) => {
    let uris = []
    matches.forEach((song) => {
      uris.push(song.uri)
    })
    addTracksToPlaylist(token, id, uris)
    .then(response => response.json())
    .then(response => {

    })
  }

  const allowDrop = (event) => {
    event.preventDefault();
    let new_style = '';
    event.target.id === 'left'
      ? new_style = 'background-image: linear-gradient(to left, rgba(255,78,78,1), rgba(255,107,107,0.9), rgba(255,255,255,0))'
      : new_style = 'background-image: linear-gradient(to right, rgba(94,177,93,1), rgba(94,177,93,1), rgba(255,255,255,0))';
    event.target.style = new_style;
  };

  const handleClick = () => {
    if(!id) return;
    // create playlist
    createPlaylist(token, id, 'spotify-speed-dating')
    .then(response => response.json())
    .then(response => {
      let playlist_id = response.id;
      if(!playlist_id) return;
      if(!matches) return;
      // add each song to the new playlist
      addMatchesToPlaylist(playlist_id);
    })

  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.target.style.removeProperty('background-image');
    if(event.target.id === 'right') addToMatches(currentTrack);
    changeSong();
  };

  const handleDragLeave = (event) => {
    event.target.style.removeProperty('background-image');
  }

  const changeSong = () => {
    const currentIndex = recommendations.indexOf(currentTrack);
    if (currentIndex + 1 === recommendations.length){
      getRecommendations(token, seeds, seed_type)
      .then(response => response.json())
      .then(response => {
        let tracks = response.tracks.filter((track) => !!track.preview_url?.length);
        setRecommendations(tracks);
        setCurrentTrack(tracks[0]);
      });
    }
    setCurrentTrack(recommendations[currentIndex + 1]);
  };

  useEffect(() => {
    getMe(token)
    .then(response => response.json())
    .then(response => {
      setId(response.id);
    })
  }, []);


  return (
    <div className="discovery-wrapper">
      <div className="discovery-container">
        <div className="left">
          <div id='left' className="drop-area" 
            onDrop={handleDrop}
            onDragOver={allowDrop}
            onDragLeave={handleDragLeave}
          />
          <Player changeSong={changeSong} track={currentTrack}/>
          <div id='right' className="drop-area"
            onDrop={handleDrop}
            onDragOver={allowDrop}
            onDragLeave={handleDragLeave}
          />
        </div>
        <div className="right">
          <List
            title={'Matches'}
            items={matches}
            show={true}
          />
          {matches.length
            ? <button className="export-btn" onClick={handleClick}>
                <div className="text-wrapper">
                  <div className="export-text">
                    Export Playlist 
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{'margin':'auto', 'marginLeft':'0'}} width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
                  </svg>
                </div>
              </button>
            : null
          }
        </div>
      </div>
    </div>
  );
}
 
export default Discovery;