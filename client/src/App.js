import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./pages/gamePage";
import NewGamePage from './pages/newGamePage';

function App() {

  return (
  <Router>
      <>
      <Routes>
        <Route path="/game/:roomId/:userName/:roomLimit" element={ <GamePage />} />          
        <Route path="/" element ={<NewGamePage /> } />         
      </Routes>
      </>
    </Router>
  )
}

export default App;
