import './App.css';
import { Banner } from './components/banner.jsx';
import { MainContent } from './components/main-content.jsx';

function App() {
  return (
    <div className='app'>
      <Banner />
      <MainContent />
    </div>
  )
}

export default App