import React, { useState, useEffect, useRef } from "react";

function PianoTilesGame() {
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [soundPlayed, setSoundPlayed] = useState(false); // Gérer si le son a été joué
    const tileSpeed = 3; // Vitesse de chute des notes

    const keys = ["Q", "S", "D", "F", "G", "H", "J", "K"];
    const audioRef = useRef(null); // Référence pour le son de Smelly Cat
    const targetZoneY = 80; // Position de la zone où l'utilisateur doit cliquer

    // Jouer le son uniquement après une interaction avec l'utilisateur
    const playSound = () => {
        if (audioRef.current && !soundPlayed) {
            audioRef.current.play();
            setSoundPlayed(true);
        }
    };

    // Arrêter le son quand la note est ratée
    const stopSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Réinitialise le son
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            audioRef.current = new Audio("/piano-cat.mp3");
        }
    }, []);

    useEffect(() => {
        if (!gameOver) {
            const interval = setInterval(() => {
                setTiles((prevTiles) => [
                    ...prevTiles,
                    { key: keys[Math.floor(Math.random() * keys.length)], y: 0, id: Date.now() },
                ]);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameOver]);

    useEffect(() => {
        if (!gameOver) {
            const moveInterval = setInterval(() => {
                setTiles((prevTiles) => {
                    const newTiles = prevTiles.map((tile) => ({ ...tile, y: tile.y + tileSpeed }));
                    if (newTiles.some((tile) => tile.y > 90)) {
                        setGameOver(true);
                        stopSound(); // Arrêter le son quand une note échappe
                    }
                    return newTiles.filter((tile) => tile.y <= 100);
                });
            }, 100);
            return () => clearInterval(moveInterval);
        }
    }, [gameOver]);

    const handleKeyPress = (e) => {
        const key = e.key.toUpperCase();
        if (keys.includes(key)) {
            playSound(); // Joue le son quand une touche est pressée
            const tileIndex = tiles.findIndex((tile) => tile.key === key && tile.y > 70 && tile.y < 90);
            if (tileIndex !== -1) {
                setScore((prev) => prev + 1);
                const newTiles = [...tiles];
                newTiles.splice(tileIndex, 1);
                setTiles(newTiles);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [tiles]);

    return (
        <div className="game-container">
            <h1>Piano Tiles - Smelly Cat Edition 🎵</h1>
            <h2>Score: {score}</h2>
            {gameOver && <h3>Game Over! Press F5 to restart.</h3>}

            <div className="game-board">
                {/* Zone de la cible à atteindre */}
                <div className="target-zone" style={{ top: `${targetZoneY}%` }}></div>

                {tiles.map((tile) => (
                    <div
                        key={tile.id}
                        className="tile"
                        style={{
                            left: `${keys.indexOf(tile.key) * 12.5}%`,
                            top: `${tile.y}%`,
                        }}
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

            <style>{`
        .game-container {
          text-align: center;
          font-family: Arial, sans-serif;
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
          background: rgba(255, 255, 0, 0.5); /* Zone de cible semi-transparente */
          top: 80%; /* Zone où les notes doivent arriver */
        }
      `}</style>
        </div>
    );
}

export default PianoTilesGame;
