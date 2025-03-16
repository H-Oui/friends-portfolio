import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function JoeyFoodGame() {
    const [joeyPosition, setJoeyPosition] = useState(50); // Position en %
    const [foods, setFoods] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30); // Durée du jeu
    const [isPlaying, setIsPlaying] = useState(false);
    const [endMessage, setEndMessage] = useState("");

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setFoods((prevFoods) => [
                ...prevFoods,
                { id: Date.now(), x: Math.random() * 90, type: getRandomFood() }
            ]);
        }, 1000); // Un aliment toutes les secondes

        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        const moveJoey = (e) => {
            if (e.key === "ArrowLeft") {
                setJoeyPosition((prev) => Math.max(0, prev - 5));
            } else if (e.key === "ArrowRight") {
                setJoeyPosition((prev) => Math.min(90, prev + 5));
            }
        };

        window.addEventListener("keydown", moveJoey);
        return () => window.removeEventListener("keydown", moveJoey);
    }, []);

    useEffect(() => {
        if (!isPlaying || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsPlaying(false);
                    setFoods([]); // Vide les aliments
                    // Déterminer le message en fonction du score
                    if (score >= 300) {
                        setEndMessage("🔥 Tu es une machine, tu es plus accro a la nourriture que Joey !");
                    } else if (score >= 200) {
                        setEndMessage("🔥 Incroyable, Joey serait fier de toi !");
                    } else if (score >= 50) {
                        setEndMessage("😋 Bien joué ! Joey partage presque sa nourriture avec toi !");
                    } else {
                        setEndMessage("😢 Joey pleure... Tu dois manger plus !");
                    }
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, score]);

    const getRandomFood = () => {
        const foodItems = ["🍕", "🍔", "🍟", "🥪", "🍗", "🥗"];
        return foodItems[Math.floor(Math.random() * foodItems.length)];
    };

    const handleTouchMove = (e) => {
        const touchX = e.touches[0].clientX;
        const screenWidth = window.innerWidth;
        const newPosition = (touchX / screenWidth) * 100;
        setJoeyPosition(Math.min(90, Math.max(0, newPosition)));
    };

    return (
        <div
            onTouchMove={handleTouchMove}
            className="joey-game-container"
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                backgroundColor: "rgb(2, 178, 231)",
                overflow: "hidden",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* Bouton Start avant le début du jeu */}
            {!isPlaying && !endMessage && (
                <div>
                <p>
                    Utilisez les fleches pour jouer
                </p>
                <button onClick={() => setIsPlaying(true)} className="start-button">
                    🎮 Start
                </button>
                </div>
            )}

            {/* Message de fin quand le jeu est terminé */}
            {!isPlaying && endMessage && (
                <div className="end-message">
                    <h2>{endMessage}</h2>
                    <button onClick={() => {
                        setScore(0);
                        setTimeLeft(30);
                        setEndMessage("");
                        setIsPlaying(true);
                    }}>
                        🔄 Rejouer
                    </button>
                </div>
            )}

            {isPlaying && (
                <>
                    <div className="game-info" style={
                        {
                            position: "absolute",
                            top : "10px",
                            left : "10px",

                        }
                    }>
                        <h3>Score: {score}</h3>
                        <h3>Time Left: {timeLeft}s</h3>
                    </div>

                    {/* Joey */}
                    <motion.div
                        className="joey-character"
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: `${joeyPosition}%`,
                            transform: "translateX(-50%)",
                            fontSize: "2rem",
                        }}
                    >
                        🧑‍🦱
                    </motion.div>

                    {/* Aliments qui tombent */}
                    {foods.map((food) => (
                        <motion.div
                            key={food.id}
                            className="food-item"
                            style={{
                                position: "absolute",
                                top: "0%",
                                left: `${food.x}%`,
                                fontSize: "2rem",
                            }}
                            animate={{ top: "90%" }} // Fait descendre jusqu'à presque en bas
                            transition={{ duration: 3, ease: "linear" }}
                            onAnimationComplete={() => {
                                const joeyLeft = joeyPosition; // Position actuelle de Joey

                                // Vérifie si l'aliment tombe dans la zone de Joey
                                if (Math.abs(food.x - joeyLeft) < 10) {
                                    setScore((prevScore) => prevScore + 10);
                                }

                                // Supprime l'aliment après la chute
                                setFoods((prevFoods) => prevFoods.filter((f) => f.id !== food.id));
                            }}
                        >
                            {food.type}
                        </motion.div>
                    ))}
                </>
            )}
        </div>
    );
}
