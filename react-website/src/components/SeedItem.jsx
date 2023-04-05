import React, {useEffect} from 'react';
import './seedingItem.css';


const SeedItem = ({id, seed, handleRemove}) => {
  useEffect(() => {
    let seeds = document.getElementsByClassName('remove');
    seeds[0].style = 'border-top-right-radius: 9px';
    seeds[seeds.length-1].style = 'border-bottom-right-radius: 9px';
    if(seeds.length === 1) seeds[0].style = 'border-top-right-radius: 9px border-bottom-right-radius: 9px';
  }, [handleRemove]);

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