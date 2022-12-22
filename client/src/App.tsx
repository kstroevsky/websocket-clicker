import { observer } from "mobx-react-lite";
import { Error404 } from "pages/Error404/Error404";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamePage from 'pages/GamePage';
import { Rooms } from 'components/Rooms/Rooms';
import { Keyboard } from "./pages/Keyboard";
import { CreateGamePage } from "./pages/CreateGamePage";
import React from "react";
import appStore from "./stores/appStore";
import { EnterNamePage } from "./pages/EnterNamePage";
import { Game } from "./types/gameTypes";

export const App = observer(() => {
    const { user } = appStore;

    return (
        <Router>
            {!!user.userName ? (
                <Routes>
                    <Route
                        path={`/${Game.Clicker}/:roomId/:userName/:roomLimit/:gameDuration`}
                        element={<GamePage/>}
                    />
                    <Route
                        path={`/${Game.Keyboard}/:roomId/:userName/:roomLimit/:gameDuration`}
                        element={<Keyboard/>}
                    />
                    <Route path="/" element={<CreateGamePage/>}/>
                    <Route path="/rooms" element={<Rooms/>}/>
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            ) : (
                <EnterNamePage/>
            )}
        </Router>
    );
})
