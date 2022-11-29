import React, { useState } from 'react';
import Player from './Player';
import Seeding from './Seeding';
import Recommendations from './Recommendations';
import './dashboard.css';


export default function Dashboard({ token }) {
  // const [seeds, setSeeds] = useState([]);
  // const [seed_type, setSeedType] = useState('tracks');
  const [recommendations, setRecommendations] = useState([])
  const [displayRecs, setDisplayingRecs] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(
    {
      name: '',
      album: { images: [{url:''}]},
      artists: [{name:''}]
    }
  );



  return (
    <div className="dashboard-container">
      <div className='upper-dash'>
        <Seeding
          token={token}
          setRecommendations={setRecommendations}
          setDisplayingRecs={setDisplayingRecs}
          setCurrentTrack={setCurrentTrack}
        />
        {displayRecs ? <div style={{flexGrow: '1', maxWidth:'200px'}}/> : null }
        <Recommendations
          recommendations={recommendations}
          displayRecs={displayRecs}
        />
      </div>
      <div className='lower-dash'>
        {displayRecs 
          ? <Player
              token={token}
              track={currentTrack}
            />
          : null
        }
      </div>
    </div>
  );
}