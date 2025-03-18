import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Menu from "../components/menu";

export default function RossGame() {
    const [dinoPosition, setDinoPosition] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [obstacles, setObstacles] = useState([]);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [speed, setSpeed] = useState(1);


    const obstacleTypes = ["📚", "🥪", "🎹", "🛋️"];

    useEffect(() => {
        if (!isPlaying) return;


        const interval = setInterval(() => {
            const randomObstacle = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
            setObstacles((prevObstacles) => [
                ...prevObstacles,
                { id: Date.now(), x: -10, y: 0, type: randomObstacle }
            ]);
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying]);


    const handleJump = () => {
        if (isJumping) return;
        setIsJumping(true);
        setDinoPosition(100);


        const rossPivotSound = '/ross.mp3';
        new Audio(rossPivotSound).play();

        setTimeout(() => {
            setDinoPosition(0);
            setIsJumping(false);
        }, 800);
    };


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === " " || e.key === "ArrowUp") {
                handleJump();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isJumping]);


    useEffect(() => {
        if (!isPlaying) return;


        const speedInterval = setInterval(() => {
            setSpeed((prevSpeed) => prevSpeed + 0.10);
        }, 3000);

        const obstacleInterval = setInterval(() => {
            setObstacles((prevObstacles) =>
                prevObstacles.map((obs) => ({ ...obs, x: obs.x + speed }))
            );
            setScore((prevScore) => prevScore + 1);
        }, 20);

        return () => {
            clearInterval(speedInterval);
            clearInterval(obstacleInterval);
        };
    }, [isPlaying, speed]);


    useEffect(() => {
        const checkCollisions = () => {
            for (const obs of obstacles) {

                if (obs.x >= 80 && obs.x <= 90 && dinoPosition === 0) {
                    setGameOver(true);
                    setIsPlaying(false);
                }
            }
        };

        if (isPlaying) checkCollisions();
    }, [obstacles, dinoPosition, isPlaying]);

    return (
        <div
            className="dino-game-container"
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                backgroundColor: "#f7e300",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                flexDirection: "column",
            }}
        >

            <Menu/>
            {/* Écran de démarrage */}
            {!isPlaying && !gameOver && (
                <div style={{ textAlign: "center", padding: "20px", color: "#333" }}>
                    <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Game Rules</h2>
                    <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
                        Tap or click on the Dino to make it jump!<br />
                        Avoid the obstacles coming from the left. If you hit an obstacle, the game is over!
                    </p>
                    <button
                        onClick={() => setIsPlaying(true)}
                        style={{
                            backgroundColor: "#f07c00",
                            color: "#fff",
                            fontSize: "1.5rem",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            border: "none",
                            transition: "all 0.3s ease-in-out",
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#e66a00"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#f07c00"}
                    >
                        Start Game
                    </button>
                </div>
            )}

            {/* Écran de fin de jeu */}
            {gameOver && (
                <div style={{ textAlign: "center", padding: "20px", color: "#333" }}>
                    <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Game Over! Your Score: {score}</h2>
                    <button
                        onClick={() => {
                            setIsPlaying(true);
                            setObstacles([]);
                            setScore(0);
                            setGameOver(false);
                            setSpeed(1);
                        }}
                        style={{
                            backgroundColor: "#f07c00",
                            color: "#fff",
                            fontSize: "1.5rem",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            border: "none",
                            transition: "all 0.3s ease-in-out",
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#e66a00"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#f07c00"}
                    >
                        Play Again
                    </button>


                    <div style={{ marginTop: "20px" }}>
                        <video width="200" controls autoPlay>
                            <source src="/fineRoss.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}

            {isPlaying && (
                <>
                    <div style={{ position: "absolute", top: "10px", left: "10px", color: "#333" }}>
                        <h3>Score: {score}</h3>
                    </div>


                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            width: "80%",
                            height: "150px",
                            transform: "translateY(-50%)",
                            left: "10%",
                            overflow: "hidden",
                        }}
                    >
                        {/* Dino */}
                        <motion.div
                            className="dino"
                            style={{
                                position: "absolute",
                                bottom: `${dinoPosition}%`,
                                right: "10%",
                                fontSize: "3rem",
                                transform: "translateX(50%)",
                                cursor: "pointer",
                            }}
                            onClick={handleJump}
                        >
                            🦖
                        </motion.div>

                        {/* Obstacles */}
                        {obstacles.map((obstacle) => (
                            <motion.div
                                key={obstacle.id}
                                className="obstacle"
                                style={{
                                    position: "absolute",
                                    bottom: "0",
                                    left: `${obstacle.x}%`,
                                    fontSize: "3rem",
                                }}
                            >
                                {obstacle.type} {/* Affiche le type d'obstacle */}
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
