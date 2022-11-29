import React from 'react';
import './seedingItem.css';


const SeedItem = ({id, seed, handleRemove}) => {
  return ( 
    <div className="seed-item" id={id}>
      <div className="seed-name">
        {seed.name}
      </div>
      <button className='xout remove' type='button' onClick={() => handleRemove(id)}>
        x
      </button>
    </div>
   );
}
 
export default SeedItem;