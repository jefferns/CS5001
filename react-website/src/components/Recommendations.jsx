import React, { useState } from 'react';
import { useEffect } from 'react';
import { getRecommendations } from '../api';


const Reccomendations = ({
  token,
  recommendations,
  setRecommendations,
  seeds,
  seed_type
}) => {
  const [display_recs, setDisplayingRecs] = useState(false);

  const handleClick = () => {
    if(!seeds.length) return;
    getRecommendations(token, seeds, seed_type)
    .then(response => response.json())
    .then(response => {
      setRecommendations(response.tracks);
      setDisplayingRecs(true);
      console.log(response.tracks);
    });
  };


  return(
  <>
    {seeds.length
     ? <button onClick={handleClick}>
      Show Recommendations
     </button>
    : null
    }
    {recommendations.length && display_recs
    ? <div className="rec-container">
        <h3>Reccomendations: </h3>
        {recommendations.map(recommendation => 
          <div className='rec-item' key={recommendation.id} id={recommendation.id}>
            {recommendation.name + ' - ' + recommendation.artists[0].name}
          </div>
        )}
      </div>
    : null
    }
  </>
  )
}
 
export default Reccomendations;