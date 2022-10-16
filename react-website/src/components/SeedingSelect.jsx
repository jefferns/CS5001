import React from 'react';


const SeedingSelect = ({options, handleChange, selected}) => {
  return (
    <div>
      <select title='seed-select' value={selected} onChange={handleChange}>
        <option key='default' value='default' disabled={true}> Choose an option </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
 
export default SeedingSelect;