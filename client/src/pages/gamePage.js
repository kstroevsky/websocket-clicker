import { useEffect, useState } from "react";
import { useParams } from "react-router";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import OpponentCounter from "../oponentCounter/index";

let socket;

function GamePage() {
  const navigate = useNavigate();
  const { roomId, userName, roomLimit } = useParams();

  const [count, setCount] = useState(0);
  const [roomUsers, setRoomUsers] = useState([]);
  const [data, setData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  useEffect(() => {
    if (timeLeft === 0 && gameStarted === true) {
      setGameStarted(false);

      return;
    }

    console.log(roomLimit, roomUsers.length);

    if (+roomLimit === roomUsers.length) {
      const intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (gameStarted === false && timeLeft === 0) {
        setGameStarted(true);
        setTimeLeft(10);
      }

      return () => clearInterval(intervalId);
    }
  }, [roomUsers, timeLeft]);

  useEffect(() => {
    socket = io("http://localhost:4000", { transports: ["websocket"] });
    const handler = (msg) => setData((prev) => [...prev, msg]);
    socket.on("message", handler);

    socket.emit("joinRoom", { roomId, userName, roomLimit });

    socket.on("roomUsers", ({ room, users }) => {
      setRoomUsers(users);
      console.log(users, room);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const countHandler = () => {
    socket.emit("userMsg", count);
    setCount((prev) => prev + 1);
  };

  return (
    <div className={styles.gameWrapper}>
      <div style={{ dislplay: "flex" }}>
        <button title="COPY" className={styles.buttonEnterName} onClick={copy}>
          &#128464;
        </button>
        <button
          title="GO HOME"
          className={styles.buttonEnterName}
          onClick={() => navigate("/")}
        >
          &#8962;
        </button>
      </div>
      <div className={gameStarted ? styles.startGame : styles.startGameHidden}>
        GO
      </div>
      <div>
        <div className={styles.playerInfo}>
          <button
            className={styles.addButton}
            disabled={!gameStarted}
            onClick={countHandler}
          >
            {gameStarted ? "Add Count" : "Waiting Players"}
          </button>
          <div className={styles.userName}>
            {userName}: {count}
          </div>
        </div>

        <div className={styles.oponentsWrapper}>
          {roomUsers.map((i, index) => (
            <OpponentCounter key={index} i={i} data={data} />
          ))}
        </div>

        <div className={styles.timeLeft}>
          {timeLeft > 0 ? timeLeft : "Game Over"}
        </div>
        {gameStarted ? (
          <div>
            Current Leader{" "}
            {
              data.reduce(
                (prev, current) => (prev.text > current.text ? prev : current),
                {}
              )?.userName
            }
          </div>
        ) : (
          <div className={styles.winnerTitle}>
            {timeLeft === 0 &&
              !gameStarted &&
              `Player ${
                data.reduce(
                  (prev, current) =>
                    prev.text > current.text ? prev : current,
                  {}
                )?.userName
              } WIN`}
          </div>
        )}
      </div>
    </div>
  );
}

export default GamePage;
