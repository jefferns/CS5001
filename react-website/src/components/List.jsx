import React from 'react';
import ListItem from './ListItem';
import './list.css';


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
            {items.length ?
              items.map(recommendation => <ListItem data={recommendation} key={recommendation.id}/>)
              : <p>No matches yet</p>
            }
          </div>
        </div>
      : null
      }
    </>
  )
}
 
export default List;