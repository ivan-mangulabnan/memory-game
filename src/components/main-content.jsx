import { useMemo, useState } from 'react';
import '../styles/main-content.css';

export function MainContent({gifs}) {

  const [game, setGame] = useState({currentScore: 0, bestScore: 0, IDsClicked: new Set(), shuffle: false});

  const handleClick = (id) => {
    setGame(prev => {
      if (prev.IDsClicked.has(id)) {
        return {currentScore: 0, bestScore: Math.max(prev.currentScore, prev.bestScore), IDsClicked: new Set(), shuffle: true};
      }

      const newIDs = new Set(prev.IDsClicked);
      newIDs.add(id);

      return {...prev, currentScore: prev.currentScore + 1, IDsClicked: newIDs, shuffle: true}
    })
  }

  function fisherYatesShuffle(array) {
    let m = array.length, i, temp;

    while (m > 0) {
      i = Math.floor(Math.random() * m--);

      temp = array[m];
      array[m] = array[i];
      array[i] = temp;
    }

    return array;
  }

  const newGif = game.shuffle ? fisherYatesShuffle(gifs.data) : gifs.data;

  let ComponentToShow;
  switch (gifs.status) {
    case 'success':
      ComponentToShow = (
        <>
          <Scores currentScore={game.currentScore} bestScore={game.bestScore}/>
          <PictureSection gifs={newGif} handleClick={handleClick}/>
        </>
      )
      break;
    case 'loading':
      ComponentToShow = <Loader />;
      break;
    case 'error':
      ComponentToShow = <Error />;
      break;
    case 'empty':
      ComponentToShow = <Empty />;
      break;
  }

  return (
    <div className="main-content">
      { ComponentToShow }
    </div>
  )
}

function Scores ({currentScore = 0, bestScore = 0}) {
  return (
    <div className="scores-section">
      <p>Current Score: <span>{currentScore}</span></p>
      <p>Best: <span>{bestScore}</span></p>
    </div>
  )
}

function PictureSection ({gifs, handleClick}) {
  return (
    <div className='pictures-section'>
      { gifs.map(gif => <ButtonImages key={gif.id} url={gif.images.original.url} alt={gif['alt_text']} handleClick={() => handleClick(gif.id)}/>) }
    </div>
  )
}

function ButtonImages ({url, alt, handleClick}) {
  const rotation = useMemo(() => {
    const sign = Math.random() < 0.5 ? "-" : "";
    const deg = Math.floor(Math.random() * 4);
    return `${sign}${deg}`;
  }, []);
  
  let caption;

  switch (true) {
    case alt.startsWith('V'):
      caption = alt.slice(11);
      break;
    case alt.startsWith('Digital c'):
      caption = alt.slice(25);
      break;
    case alt.startsWith('Digital i'):
      caption = alt.slice(26);
      break;
    default:
      caption = 'No description :(';
  }

  return (
    <button className='img-btn' type='button' onClick={handleClick}>
      <div className='gif-wrapper' style={{transform: `rotate(${rotation}deg)`}}>
        <img src={url} alt={alt} />
      </div>
      <div className='caption-wrapper'>
        <p className='caption'>{caption}</p>
      </div>
    </button>
  )
}

function Loader () {
  return (
    <div className='loader'>
      <p>
        Loading
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </p>
    </div>
  )
}

function Error () {
  return (
    <div className='error-wrapper'>
      <p>There's an error fetching GIFS. Please refresh!</p>
    </div>
  )
}

function Empty () {
  return (
    <div className='empty-wrapper'>
      <p>Returned gifs is less than 12. Please try another!</p>
    </div>
  )
}