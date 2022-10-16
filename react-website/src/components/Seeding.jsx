import { useState } from 'react';
import AddSeedButton from './AddSeedButton';
import SeedingSelect from './SeedingSelect';
import SeedItem from './SeedItem';
import { Container } from 'react-bootstrap';


const Seeding = ({setCurrentTrack}) => {
  const seedingOptions = [
    {value: 'songs', text: 'Songs'},
    {value: 'artist', text: 'Artist'},
    {value: 'genres', text: 'Genres'},
    {value: 'personal', text: 'Your Top Songs'}
  ];

  const [selected, setSelected] = useState(seedingOptions[0].value);
  const [seeds, setSeeds] = useState([]);

  const handleChange = event => {
    setSelected(event.target.value);
  };
  const handleSearch = (searchInput) => {
    const new_seed = {'text': searchInput, 'id': seeds[seeds.length-1]?.id + 1 || 0};
    setSeeds([...seeds, new_seed]);
    setCurrentTrack(    {
      name: 'test',
      album: { images: [{url:'test'}]},
      artists: [{name:'test'}]
    })
  };
  const handleRemove = (id) => {
    setSeeds(seeds.filter((seed) => seed.id !== id) || []);
  };

  return (
    <Container>
      <div className="seeding-container">
        <h3>Seeding Selection:</h3>
        <SeedingSelect
          options={seedingOptions}
          selected={selected}
          handleChange={handleChange}
        />
        {seeds.length ? <h3>Seeds:</h3> : <h3>Click + to add a seed</h3>}
        { seeds.map((seed) => {
            return <SeedItem
              id={seed.id}
              key={seed.id}
              seed={seed}
              handleRemove={handleRemove}
            />
          })
        }
        {(seeds.length < 5 && selected !== 'personal') 
          ? <AddSeedButton 
              category={selected}
              handleSearch={handleSearch}
            /> 
          : null
        }
      </div> 
    </Container>
  );
};

export default Seeding;