import { useState } from 'react';
import './App.css';
import { Banner } from './components/banner.jsx';
import { MainContent } from './components/main-content.jsx';
import { useFetchedGifs } from './components/fetch-api.jsx';

function App() {
  const [query, setQuery] = useState('cute cats');
  const gifs = useFetchedGifs(query);

  const handleNewQueryOnClick = (newQuery) => {
    setQuery(newQuery);
  }

  const gameKey = crypto.randomUUID();

  return (
    <div className='app'>
      <Banner handleNewQueryOnClick={handleNewQueryOnClick}/>
      <MainContent key={gameKey} gifs={gifs}/>
    </div>
  )
}

export default App