import { useMemo } from 'react';
import '../styles/main-content.css';

export function MainContent() {
  return (
    <div className="main-content">
      <Scores />
      <PictureSection />
    </div>
  )
}

function Scores () {
  return (
    <div className="scores-section">
      <p>Current Score: </p>
      <p>Best: </p>
    </div>
  )
}

function PictureSection () {
  return (
    <div className='pictures-section'>
      
    </div>
  )
}

function ButtonImages ({url, alt}) {
  const rotation = useMemo(() => {
    const sign = Math.random() < 0.5 ? "-" : "";
    const deg = Math.floor(Math.random() * 4);
    return `${sign}${deg}`;
  }, []);
  
  const caption = alt.slice(11);

  return (
    <button className='img-btn' type='button'>
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