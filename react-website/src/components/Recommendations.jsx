import React from 'react';
import RecommendationCard from './RecommendationCard';
import './recommendations.css';


const Recommendations = ({
  recommendations,
  displayRecs
}) => {

  return(
    <>
      {recommendations.length && displayRecs
      ? <div className="rec-container">
          <h3>Recommendations: </h3>
          <div className='rec-body'>
            {recommendations.map(recommendation => 
              // <div className='rec-item' key={recommendation.id} id={recommendation.id}>
              //   {recommendation.name + ' - ' + recommendation.artists[0].name}
              // </div>
              <RecommendationCard data={recommendation} key={recommendation.id}/>
            )}
          </div>
        </div>
      : null
      }
    </>
  )
}
 
export default Recommendations;