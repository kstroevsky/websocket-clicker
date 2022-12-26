import TelegramButton from 'components/Auth/Telegram/TelegramButton';
import { FC, useState } from 'react';
import { AddForm } from "../components/GameDetails/AddForm";
import { PageWrapper } from "../components/PageWrapper";
import appStore from "../stores/appStore";
import { START_GAME_LABEL } from "../utils/constants";
import classes from './enterName.module.scss';

export const EnterNamePage: FC = () => {
    const { setName, user, setUrlGame } = appStore;
    const [nameUser, setNameUser] = useState(user.userName);

    const saveName = () => {
        setName(nameUser);
        setUrlGame(window.location.href)
    };

    return (
        <PageWrapper center>
            <div className={classes.auth_container}>
                <AddForm
                    onChangeText={setNameUser}
                    placeholder={'Enter your name'}
                    value={nameUser}
                    disabledBtn={!nameUser}
                    clickHandler={saveName}
                    titleBtn={START_GAME_LABEL}
                />
                <TelegramButton />
            </div>
        </PageWrapper>
    );
};

export default EnterNamePage;