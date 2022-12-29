import React, { FC, useState } from 'react'
import appStore from "../../stores/appStore";
import { PageWrapper } from "../../components/PageWrapper";
import { AddForm } from "../../components/GameDetails/AddForm";
import { START_GAME_LABEL } from "../../utils/constants";

export const EnterNamePage: FC = () => {
    const { setName, user, setUrlGame } = appStore;
    const [nameUser, setNameUser] = useState(user.userName);

    const saveName = () => {
        setName(nameUser);
        setUrlGame(window.location.href)
    };

    return (
        <PageWrapper center>
            <AddForm
                onChangeText={setNameUser}
                placeholder={'Enter your name'}
                value={nameUser}
                disabledBtn={!nameUser}
                clickHandler={saveName}
                titleBtn={START_GAME_LABEL}
            />
        </PageWrapper>
    );
};