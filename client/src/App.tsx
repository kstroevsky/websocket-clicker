import { observer } from "mobx-react-lite";
import GamePage from 'pages/GamePage';
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PageWrapper } from "./components/PageWrapper";
import appStore from "./stores/appStore";
import { Game } from "./types/gameTypes";

const Error404 = React.lazy(() => import('./pages/Error404/Error404'));
const Rooms = React.lazy(() => import("./components/Rooms/Rooms"));
const Keyboard = React.lazy(() => import("./pages/Keyboard"));
const CreateGamePage = React.lazy(() => import("./pages/CreateGamePage"));
const EnterNamePage = React.lazy(() => import("./pages/EnterNamePage"));

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
