import { useState, useEffect } from 'react';
import './App.css';
import { Banner } from './components/banner.jsx';
import { MainContent } from './components/main-content.jsx';
import { useFetchedGifs } from './components/fetch-api.jsx';

function App() {
  const [query, setQuery] = useState('cats');
  const gifs = useFetchedGifs(query);

  const handleNewQueryOnClick = (newQuery) => {
    setQuery(newQuery);
  }

  return (
    <div className='app'>
      <Banner handleNewQueryOnClick={handleNewQueryOnClick}/>
      <MainContent gifs={gifs}/>
    </div>
  )
}

export default App