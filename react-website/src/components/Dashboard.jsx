import React, { useState } from 'react';
import Player from './Player';
import Seeding from './Seeding';
import Recommendations from './Recommendations';


export default function Dashboard({ token }) {
  const [seeds, setSeeds] = useState([]);
  const [seed_type, setSeedType] = useState('tracks');
  const [recommendations, setRecommendations] = useState([])
  const [currentTrack, setCurrentTrack] = useState(
    {
      name: '',
      album: { images: [{url:''}]},
      artists: [{name:''}]
    }
  );



  return (
    <div className="dashboard-container">
      <Seeding
        token={token}
        seeds={seeds}
        seed_type={seed_type}
        setSeeds={setSeeds}
        setSeedType={setSeedType}
      />
      <Recommendations
        token={token}
        recommendations={recommendations}
        setRecommendations={setRecommendations}
        seeds={seeds}
        seed_type={seed_type}
      />
      <Player
        token={token}
        track={currentTrack}
      />
    </div>
  );
}