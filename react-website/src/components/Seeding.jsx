import { useEffect, useState } from 'react';
import { getTopItems, searchSpotify } from '../api';
import { getRecommendations } from '../api';
import AddSeedButton from './AddSeedButton';
import SeedingSelect from './SeedingSelect';
import SeedItem from './SeedItem';
import './seeding.css';


const seedingOptions = [
  {value: 'track', text: 'Songs'},
  {value: 'artist', text: 'Artist'},
  // {value: 'genre', text: 'Genres'},
  {value: 'top-tracks', text: 'Your Top Songs'},
  {value: 'top-artists', text: 'Your Top Artists'},
];

const Seeding = ({
  token,
  seeds,
  seed_type,
  setSeeds,
  settings,
  setSeedType,
  setCurrentTrack, 
  setDisplayingRecs, 
  setRecommendations 
}) => {
  const [selected, setSelected] = useState(seedingOptions[0].value);
  const [search_results, setSearchResults] = useState([]);

  const handleChange = event => {
    setSeeds([]);
    setRecommendations([]);
    setSelected(event.target.value);
    setSeedType(event.target.value);
  };

  const handleClick = () => {
    if(!seeds.length) return;
    getRecommendations(token, seeds, seed_type)
    .then(response => response.json())
    .then(response => {
      let tracks = response.tracks.filter((track) => !!track.preview_url?.length);
      setRecommendations(tracks);
      setCurrentTrack(tracks[0]);
      setDisplayingRecs(true);
    });
  };

  const handleSearch = (searchInput) => {
    searchSpotify(token, selected, searchInput, 5)
    .then(response => response.json())
    .then(response => {
      let results = [];
      if(selected === 'track') results = response.tracks.items;
      else if(selected === 'artist') results = response.artists.items;
      setSearchResults(results);
    })
  };

  const handleSelect = event => {
    const result = search_results.find(element => element.id === event.target.value);
    setSeeds([...seeds, result]);
    setSearchResults([]);
  }

  const handleRemove = (id) => {
    setSeeds(seeds.filter((seed) => seed.id !== id) || []);
    if (!seeds.length) setDisplayingRecs(false);
  };

  const seedWithTopItems = () => {
    const type = selected.substring(4);
    getTopItems(token, type, settings.time_range)
    .then(response => response.json())
    .then(response => {
      if(!response.items) return; 
      setSeeds(response.items);
    });
  };

  useEffect(() => {
    if(selected.indexOf('top') === -1) return;
    seedWithTopItems();
  }, [selected, settings]);

  useEffect(() => {
    if(!seeds.length) return;
    let bottom_seed = document.getElementsByClassName('seed-item')[seeds.length-1];
    bottom_seed.style = 'border-bottom: 0px solid rgb(0, 0, 0)';
  }, [seeds]);


  return (
    <>
      <div className='seeding-container'>
        <h3>Seeding Selection:</h3>
        <SeedingSelect
          options={seedingOptions}
          selected={selected}
          handleChange={handleChange}
        />
        {selected.indexOf('top-') !== -1
         ? <>
            <h3> Seeds Based on Top Items: </h3>
            <div className='seed-wrapper'>
              {seeds.map((seed) => {
                return <SeedItem
                  id={seed.id}
                  key={seed.id}
                  seed={seed}
                  handleRemove={handleRemove}
                />
              })}
            </div>
           </>
         : <>
          {seeds.length ? <h3>Seeds:</h3> : <h3>Click + to add a seed</h3>}
          <div className="seed-wrapper">
            {seeds.map((seed) => {
              return <SeedItem
                id={seed.id}
                key={seed.id}
                seed={seed}
                handleRemove={handleRemove}
              />
            })}
          </div>
          {(seeds.length < 5) 
            ? <>
                {search_results.length
                ?<select title='search-results' onChange={handleSelect}>
                  <option value='' default>Select a result to add a seed</option>
                  {search_results.map(result => 
                    <option key={result.id} value={result.id}>
                      {result.name + (selected === 'track' ? ` - ${result.artists[0].name}` : '')}
                    </option>
                    )} 
                </select>
                : null
                }
                <AddSeedButton 
                  category={selected}
                  handleSearch={handleSearch}
                />
              </>
            : null
            } 
          </>
        }
        {seeds.length
          ? <button 
              className='btn' 
              style={{marginTop:'10px'}} 
              type='button' 
              onClick={handleClick}
            >
              Get Recommendations
            </button>
          : null
        }
      </div>
    </>
  );
};

export default Seeding;