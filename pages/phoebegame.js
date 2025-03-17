import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/menu";

function PianoTilesGame() {
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [audioReady, setAudioReady] = useState(false); // État pour savoir si le son peut être joué
    const tileSpeed = 3;
    const keys = ["Q", "S", "D", "F", "G", "H", "J", "K"];
    const audioRef = useRef(null);
    const targetZoneY = 80;

    const playSound = () => {
        if (audioRef.current && !audioReady) {
            audioRef.current.play();
            setAudioReady(true); // Le son est désormais prêt à être joué
        }
    };

    const stopSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            audioRef.current = new Audio("/piano-cat.mp3");
        }
        setIsClient(true); // S'assurer que le code s'exécute sur le client
    }, []);

    useEffect(() => {
        if (!gameOver && gameStarted) {
            const interval = setInterval(() => {
                setTiles((prevTiles) => [
                    ...prevTiles,
                    { key: keys[Math.floor(Math.random() * keys.length)], y: 0, id: Date.now() },
                ]);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameOver, gameStarted]);

    useEffect(() => {
        if (!gameOver && gameStarted) {
            const moveInterval = setInterval(() => {
                setTiles((prevTiles) => {
                    const newTiles = prevTiles.map((tile) => ({ ...tile, y: tile.y + tileSpeed }));
                    if (newTiles.some((tile) => tile.y > 90)) {
                        setGameOver(true);
                        stopSound();
                    }
                    return newTiles.filter((tile) => tile.y <= 100);
                });
            }, 100);
            return () => clearInterval(moveInterval);
        }
    }, [gameOver, gameStarted]);

    const handleKeyPress = (e) => {
        const key = e.key.toUpperCase();
        if (keys.includes(key)) {
            playSound(); // Assure-toi que le son est joué lors de la première touche
            const tileIndex = tiles.findIndex((tile) => tile.key === key && tile.y > 70 && tile.y < 90);
            if (tileIndex !== -1) {
                setScore((prev) => prev + 1);
                const newTiles = [...tiles];
                newTiles.splice(tileIndex, 1);
                setTiles(newTiles);
            }
        }
    };

    const handleTileClick = (tile) => {
        if (!audioReady) playSound(); // Assure que le son est joué dès le clic
        if (tile.y > 70 && tile.y < 90) {
            setScore((prev) => prev + 1);
            const newTiles = tiles.filter(t => t.id !== tile.id);
            setTiles(newTiles);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [tiles]);

    const startGame = () => {
        setGameStarted(true);
    };

    const restartGame = () => {
        setTiles([]);
        setScore(0);
        setGameOver(false);
        setGameStarted(false);
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="game-container">
            <Menu />
            {!gameStarted ? (
                <div className="rules">
                    <h1>Welcome to Piano Tiles - Smelly Cat Edition 🎵</h1>
                    <p>Get ready to play a special version of Piano Tiles with the iconic *Smelly Cat* song from Phoebe!</p>
                    <p><strong>Rules:</strong></p>
                    <ul>
                        <li>Press the correct keys (Q, S, D, F, G, H, J, K) when the notes fall into the target zone.</li>
                        <li>If you're playing on a computer, use your keyboard to press the keys.</li>
                        <li>If you're playing on a mobile device, touch the notes as they pass through the target zone.</li>
                        <li>Each correct key press earns you a point. Avoid missing the notes, or the game will be over!</li>
                    </ul>
                    <button onClick={startGame}>Start Game</button>
                </div>
            ) : (
                <div className="game-content">
                    <h1>Piano Tiles - Smelly Cat Edition 🎵</h1>
                    <h2>Score: {score}</h2>
                    {gameOver && (
                        <>
                            <h3>Game Over!</h3>
                            <button onClick={restartGame}>Replay</button>
                        </>
                    )}

                    <div className="game-board">
                        <div className="target-zone" style={{ top: `${targetZoneY}%` }}></div>

                        {tiles.map((tile) => (
                            <div
                                key={tile.id}
                                className="tile"
                                style={{
                                    left: `${keys.indexOf(tile.key) * 12.5}%`,
                                    top: `${tile.y}%`,
                                }}
                                onClick={() => handleTileClick(tile)}
                            >
                                {tile.key}
                            </div>
                        ))}
                    </div>
                    <div className="key-row">
                        {keys.map((key) => (
                            <div key={key} className="key">
                                {key}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
                .game-container {
                    text-align: center;
                    font-family: 'Arial', sans-serif;
                     background: blue;
                     height : 100vh;
                     wight : auto;
                       display : flex;
                    justify-content : center;
                    align-items: center;
                }
                .rules {
                    background: #fffbcc;
                    border-radius: 10px;
                    border: 2px solid #ffdb58;
                    width: 80%;
                    font-size: 18px;
                }
                .game-content {
                    text-align: center;
                    font-family: 'Arial', sans-serif;
                }
                .game-board {
                    position: relative;
                    width: 100%;
                    height: 400px;
                    background: #222;
                    border: 2px solid white;
                    overflow: hidden;
                    margin: 20px auto;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-start;
                }
                .tile {
                    position: absolute;
                    width: 12.5%;
                    height: 50px;
                    background: pink;
                    text-align: center;
                    line-height: 50px;
                    font-weight: bold;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .key-row {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 10px;
                }
                .key {
                    width: 12.5%;
                    height: 50px;
                    background: #444;
                    text-align: center;
                    line-height: 50px;
                    font-weight: bold;
                    color: white;
                    border-radius: 5px;
                }
                .target-zone {
                    position: absolute;
                    width: 100%;
                    height: 5px;
                    background: rgba(255, 255, 0, 0.5);
                    top: 80%;
                }
                button {
                    background-color: #ffdb58;
                    color: black;
                    border: none;
                    padding: 10px 20px;
                    font-size: 18px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #ffbb33;
                }
            `}</style>
        </div>
    );
}

export default PianoTilesGame;
