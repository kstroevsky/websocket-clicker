import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamePage from 'pages/GamePage';
import NewGamePage from 'pages/NewGamePage';
import { Rooms } from 'components/Rooms/Rooms';

function App() {
	return (
		<Router>
			<>
				<Routes>
					<Route
						path="/game/:roomId/:userName/:roomLimit/:gameDuration"
						element={<GamePage />}
					/>
					<Route path="/" element={<NewGamePage />} />
					<Route path="/rooms" element={<Rooms />} />
				</Routes>
			</>
		</Router>
	);
}

export default App;
