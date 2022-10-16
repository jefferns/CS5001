import React, { useState, useEffect } from 'react';
import { transferPlayback } from '../api';

function Player({token, track}) {

  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [media_player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [device_id, setDeviceId] = useState('');


  // This useEffect is pulled from Spotify's Developer Documentaion Examples
  // https://developer.spotify.com/documentation/web-playback-sdk/guide/#react-components
  useEffect(() => {
    if(!token) return;
    if(!track.name) return;
    if(media_player) return;
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      if(!player) {
        console.log('something went wrong with player initialization...');
        return;
      }

      player.addListener('ready', ({ device_id }) => {
        console.log('id', device_id);
        setDeviceId(device_id);
        setActive(true);
      });

      player.addListener('not_ready', () => {
        setActive(false);
      });

      player.addListener('player_state_changed', ( state => {
        if (!state) return;
        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then( state => { 
          (!state) ? setActive(false) : setActive(true) 
        });
      }));

      player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
          setPlayer(player);
        }
      })
    };
  }, [track]);

  useEffect(() => {
    if (!device_id) return;
    transferPlayback(token, device_id);
  }, [device_id])


  return (
    <div className="container">
      {is_active ? 
      <div className="main-wrapper">
        <img src={current_track.album.images[0].url} 
            className="now-playing__cover" alt="" 
        />
        <div className="now-playing__side">
          <div className="now-playing__name">
            {current_track.name}
          </div>
          <div className="now-playing__artist">
            {current_track.artists[0].name}
          </div>
        </div>

        <div className="playback-wrapper">
          <button className="btn-spotify" onClick={() => { media_player.previousTrack() }} >
            &lt;&lt;
          </button>
          <button className="btn-spotify" onClick={() => { media_player.togglePlay() }} >
            { is_paused ? "PLAY" : "PAUSE" }
          </button>
          <button className="btn-spotify" onClick={() => { media_player.nextTrack() }} >
            &gt;&gt;
          </button>
        </div>
      </div>
      : <div className='container'>
          <b> No Spotify Player instance </b>
        </div>
      }
    </div>
  );
}

export default Player