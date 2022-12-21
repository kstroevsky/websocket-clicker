import {observer} from "mobx-react-lite";
import {Error404} from "pages/Error404/Error404";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GamePage from 'pages/GamePage';
import {Rooms} from 'components/Rooms/Rooms';
import { Keyboard } from "./pages/Keyboard";
import { CreateGamePage } from "./pages/CreateGamePage";

export const App = observer(() => (
    <Router>
        <Routes>
            <Route
                path="/clicker/:roomId/:userName/:roomLimit/:gameDuration"
                element={<GamePage/>}
            />
            <Route
                path="/keyboard/:roomId/:userName/:roomLimit/:gameDuration"
                element={<Keyboard/>}
            />
            <Route path="/" element={<CreateGamePage/>}/>
            <Route path="/rooms" element={<Rooms/>}/>
            <Route path="/keyboard" element={<Keyboard/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    </Router>
))
