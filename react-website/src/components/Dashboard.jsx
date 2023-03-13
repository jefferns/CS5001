import React, { useEffect, useState } from 'react';
import Seeding from './Seeding';
import List from './List';
import GoButton from './GoButton';
import Discovery from './Discovery';
import Banner from './Banner';
import SettingsPanel from './SettingsPanel';
import './dashboard.css';


export default function Dashboard({ token }) {
  const [seeds, setSeeds] = useState([]);
  const [seed_type, setSeedType] = useState('tracks');
  const [discoveryMode, setDiscoveryMode] = useState(false);
  const [displayRecs, setDisplayingRecs] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(
    {
      preview_url: '',
      name: '',
      album: { images: [{url:''}]},
      artists: [{name:''}]
    }
  );
  const [settings, setSettings] = useState(
    {
      time_range: 'medium_term',   //'short_term' | 'medium_term' | 'long_term'
      volume: '30',
    }
  );

  useEffect(()=>{
    if(!recommendations.length) setDisplayingRecs(false);
  }, [recommendations])


  return (
    <>
      <Banner 
        discoveryMode={discoveryMode}
        setDiscoveryMode={setDiscoveryMode}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <SettingsPanel
        show={showSettings}
        settings={settings}
        setSettings={setSettings}
        setShowSettings={setShowSettings}
      />
      {discoveryMode
      ? <Discovery
          currentTrack={currentTrack}
          recommendations={recommendations}
          setCurrentTrack={setCurrentTrack}
          setDiscoveryMode={setDiscoveryMode}
          setRecommendations={setRecommendations}
          setSettings={setSettings}
          settings={settings}
          seeds={seeds}
          seed_type={seed_type}
          token={token}
        />
      : <div className="dashboard-container">
          <div className='upper-dash'>
            <Seeding
              token={token}
              seeds={seeds}
              settings={settings}
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