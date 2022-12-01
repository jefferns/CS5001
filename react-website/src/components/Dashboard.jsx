import React, { useState } from 'react';
import Seeding from './Seeding';
import List from './List';
import GoButton from './GoButton';
import Discovery from './Discovery';
import './dashboard.css';
import { useEffect } from 'react';


export default function Dashboard({ token }) {
  const [seeds, setSeeds] = useState([]);
  const [seed_type, setSeedType] = useState('tracks');
  const [discoveryMode, setDiscoveryMode] = useState(false);
  const [displayRecs, setDisplayingRecs] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(
    {
      preview_url: '',
      name: '',
      album: { images: [{url:''}]},
      artists: [{name:''}]
    }
  );

  useEffect(()=>{
    if(!recommendations.length) setDisplayingRecs(false);
  }, [recommendations])


  return (
    <>
    {discoveryMode
     ? <Discovery
        currentTrack={currentTrack}
        recommendations={recommendations}
        setCurrentTrack={setCurrentTrack}
        setDiscoveryMode={setDiscoveryMode}
       />
     : <div className="dashboard-container">
        <div className='upper-dash'>
          <Seeding
            token={token}
            seeds={seeds}
            seed_type={seed_type}
            setSeeds={setSeeds}
            setSeedType={setSeedType}
            setCurrentTrack={setCurrentTrack}
            setDisplayingRecs={setDisplayingRecs}
            setRecommendations={setRecommendations}
          />
          {displayRecs ? <div style={{flexGrow: '1', maxWidth:'200px'}}/> : null }
          <List
            title={'Recommendations'}
            items={recommendations}
            show={displayRecs}
          />
        </div>
        <div className='lower-dash'>
          {displayRecs ?
            <GoButton setDiscoveryMode={setDiscoveryMode}/>
            : null
          }
        </div>
      </div>
    }
    </>
  );
}