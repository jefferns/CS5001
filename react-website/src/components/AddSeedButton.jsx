import React from 'react';
import { useState } from 'react';
import { Container, InputGroup, FormControl } from 'react-bootstrap';



const AddSeedButton = ({category, handleSearch}) => {
  
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="add-seed-item">
    { showSearch
      ? <Container>
        <InputGroup>
            <FormControl
              placeholder={`Search for ${category}`}
              type="input"
              onKeyPress={event => {
                if (event.key === 'Enter'){
                  handleSearch(searchInput);
                  setShowSearch(false);
                }
              }}
              onChange={event => setSearchInput(event.target.value)}
            />
          </InputGroup>
      </Container> 
      : <button className="add-seed-item" onClick={() => setShowSearch(true)}>
          +
        </button>
    }
    </div>
   );
}
 
export default AddSeedButton;