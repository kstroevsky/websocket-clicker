import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Suspense } from "react";
import appStore from "./stores/appStore";
import { Game } from "./types/gameTypes";
import { PageWrapper } from "./components/PageWrapper";

const Error404 = React.lazy(() => import('./pages/Error404'));
const Rooms = React.lazy(() => import("./components/Rooms/Rooms"));
const Keyboard = React.lazy(() => import("./pages/Keyboard"));
const CreateGamePage = React.lazy(() => import("./pages/CreateGamePage"));
const EnterNamePage = React.lazy(() => import("./pages/EnterNamePage"));
const GamePage = React.lazy(() => import("./pages/GamePage"));
const WordsGamePage = React.lazy(() => import("./pages/WordsGamePage"));

export const App = observer(() => {
    const { user } = appStore;

    return (
        <Router>
            <Suspense fallback={<PageWrapper center>Завантаження...</PageWrapper>}>
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
                        <Route
                            path={`/${Game.WordsGame}/:roomId/:userName/:roomLimit/:gameDuration`}
                            element={<WordsGamePage/>}
                        />
                        <Route path="/" element={<CreateGamePage/>}/>
                        <Route path="/rooms" element={<Rooms/>}/>
                        <Route path="*" element={<Error404/>}/>
                    </Routes>
                ) : (
                    <EnterNamePage/>
                )}
            </Suspense>
        </Router>
);
})
