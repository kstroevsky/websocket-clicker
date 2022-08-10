import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

function NewGamePage() {
  const roomId = uuid();

  const [user, setUser] = useState("");
  const [joinUrl, setJoinUrl] = useState("");
  const [roomLimit, setRoomLimit] = useState(2);
  const [nameEntered, setNameEntered] = useState(false);

  let navigate = useNavigate();

  const createGame = () => {
    setUser("");
    navigate(`/game/${roomId}/${user}/${roomLimit}`);
  };

  const joinGame = () => {
    navigate(`/game/${joinUrl.split("/")[4]}/${user}/${joinUrl.split("/")[6]}`);
    setUser("");
  };

  console.log(user);

  return (
    <div className={styles.newGamePageWrapper}>
      <h1 className="font-effect-fire-animation">C L I C K E R</h1>

      {!nameEntered ? (
        <>
          <div className={styles.nameInput}>
            <input
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter The name"
              value={user}
              type="text"
            />
          </div>
          <button
            onClick={() => setNameEntered((prev) => !prev)}
            disabled={user === ""}
            className={styles.buttonEnterName}
          >
            &#9876;
          </button>
        </>
      ) : (
        <div className={styles.inputsWrapper}>
          <div className={styles.inputs}>
            <h3 className={styles.titleForInput}>CREATE THE GAME</h3>

            <div className={styles.nameInput}>
              <input
                onChange={(e) => {
                  if (e.target.value < 2) {
                    setRoomLimit(2);
                  } else if (e.target.value > 5) {
                    setRoomLimit(5);
                  } else {
                    setRoomLimit(e.target.value);
                  }
                }}
                placeholder="Enter The Max players"
                value={roomLimit}
                type="number"
                min={2}
                max={5}
              />
              <button
                className={styles.buttonEnterName}
                disabled={user === ""}
                onClick={createGame}
              >
                &#9876;
              </button>
            </div>
          </div>
          <div className={styles.inputs}>
            <h3 className={styles.titleForInput}>JOIN THE GAME</h3>
            <div className={styles.nameInput}>
              <input
                onChange={(e) => setJoinUrl(e.target.value)}
                placeholder="ADD HTTP"
                value={joinUrl}
                type="text"
              />
              <button
                className={styles.buttonEnterName}
                disabled={joinUrl === ""}
                onClick={joinGame}
              >
                &#9876;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewGamePage;
