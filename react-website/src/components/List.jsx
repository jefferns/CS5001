import React from 'react';
import ListItem from './ListItem';
import './recommendations.css';


const List = ({
  title,
  items,
  show
}) => {

  return(
    <>
      {show
      ? <div className="list-container">
          <h3>{title}: </h3>
          <div className='list-body'>
            {items.map(recommendation => 
              // <div className='rec-item' key={recommendation.id} id={recommendation.id}>
              //   {recommendation.name + ' - ' + recommendation.artists[0].name}
              // </div>
              <ListItem data={recommendation} key={recommendation.id}/>
            )}
          </div>
        </div>
      : null
      }
    </>
  )
}
 
export default List;