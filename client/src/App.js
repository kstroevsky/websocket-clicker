import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GamePage from './pages/gamePage';
import NewGamePage from './pages/newGamePage';
import Rooms from './pages/Rooms';

function App() {
	return (
		<Router>
			<>
				<Routes>
					<Route
						path="/game/:roomId/:userName/:roomLimit"
						element={<GamePage/>}
					/>
					<Route path="/" element={<NewGamePage/>}/>
					<Route path="/rooms" element={<Rooms/>}/>
				</Routes>
			</>
		</Router>
	);
}

export default App;
