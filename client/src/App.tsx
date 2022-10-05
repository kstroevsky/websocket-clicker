import {observer} from "mobx-react-lite";
import {Error404} from "pages/Error404/Error404";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GamePage from 'pages/GamePage';
import {NewGamePage} from 'pages/NewGamePage';
import {Rooms} from 'components/Rooms/Rooms';

export const App = observer(() => (
    <Router>
        <Routes>
            <Route
                path="/game/:roomId/:userName/:roomLimit/:gameDuration"
                element={<GamePage/>}
            />
            <Route path="/" element={<NewGamePage/>}/>
            <Route path="/rooms" element={<Rooms/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    </Router>
))
