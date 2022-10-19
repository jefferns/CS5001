import React from 'react';


const SeedItem = ({id, seed, handleRemove}) => {
  return ( 
    <div className="seed-item" id={id}>
      {seed.name}
      <button title="remove-seed" onClick={() => handleRemove(id)}>
        x
      </button>
    </div>
   );
}
 
export default SeedItem;