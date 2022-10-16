import React from 'react';
import Player from './Player';
import Seeding from './Seeding';
// import SpotifyWebApi from 'spotify-web-api-node';
import { useEffect } from 'react';
import { useState } from 'react';


// const spotifyApi = new SpotifyWebApi({
//   clientId: "534b84117d9849018758b2f1688ea8fa",
// });

export default function Dashboard({ token }) {
  // const accessToken = useAuth(code);
  const [currentTrack, setCurrentTrack] = useState(
    {
      name: '',
      album: { images: [{url:''}]},
      artists: [{name:''}]
    }
  );

  // useEffect(() => {
  //   if(!accessToken) return;
  //   spotifyApi.setAccessToken(accessToken);
  //   console.log('token set');
  // }, [accessToken]);


  return (
    <div className="dashboard-container">
      <Seeding
        setCurrentTrack={setCurrentTrack}
      />
      <Player
        token={token}
        track={currentTrack}
      />
    </div>
  );
}