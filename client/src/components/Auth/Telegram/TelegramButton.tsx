import React, { memo, useCallback } from "react";
import { TLoginButton, TLoginButtonSize, TUser } from "react-telegram-auth";
import appStore from "stores/appStore";

export const TelegramButton: React.FC = () => {
  const { setName } = appStore;

  const onSignIn = useCallback((user: TUser) => {
    setName(user.first_name);
  }, [setName]);

  return (
    <TLoginButton
      botName={"WebsocketClickerBot"}
      buttonSize={TLoginButtonSize.Large}
      lang="en"
      usePic={true}
      cornerRadius={20}
      onAuthCallback={onSignIn}
      requestAccess={'write'}
    />
  );
}

export default memo(TelegramButton);
