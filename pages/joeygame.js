import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Menu from "../components/menu";

export default function JoeyFoodGame() {
    const [joeyPosition, setJoeyPosition] = useState(50);
    const [foods, setFoods] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [endMessage, setEndMessage] = useState("");

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setFoods((prevFoods) => [
                ...prevFoods,
                { id: Date.now(), x: Math.random() * 90, type: getRandomFood() }
            ]);
        }, 1000);

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
                    setFoods([]);

                    if (score >= 300) {
                        setEndMessage("🔥 You're a food machine, more obsessed than Joey!");
                    } else if (score >= 200) {
                        setEndMessage("🔥 Incredible, Joey would be proud!");
                    } else if (score >= 50) {
                        setEndMessage("😋 Well done! Joey almost shares food with you!");
                    } else {
                        setEndMessage("😢 Joey is crying... You need to eat more!");
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
                color: "white",
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <Menu />
            {/* Start button before game begins */}
            {!isPlaying && !endMessage && (
                <div>
                    <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Ready to catch Joey's food?</h2>
                    <p style={{ fontSize: "1.2rem", fontStyle: "italic" }}>Use the left and right arrows or swipe to move Joey!</p>
                    <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Catch as much food as you can to score big!</p>
                    <button
                        onClick={() => setIsPlaying(true)}
                        className="start-button"
                        style={{
                            padding: "10px 20px",
                            fontSize: "1.5rem",
                            backgroundColor: "yellow",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}
                    >
                        🎮 Start Game
                    </button>
                </div>
            )}

            {/* End message after the game finishes */}
            {!isPlaying && endMessage && (
                <div className="end-message" style={{ padding: "20px", backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "10px", width: "80%" }}>
                    <h2 style={{ fontSize: "2rem", color: "white" }}>{endMessage}</h2>
                    <button
                        onClick={() => {
                            setScore(0);
                            setTimeLeft(30);
                            setEndMessage("");
                            setIsPlaying(true);
                        }}
                        style={{
                            padding: "10px 20px",
                            fontSize: "1.5rem",
                            backgroundColor: "yellow",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}
                    >
                        🔄 Play Again
                    </button>
                </div>
            )}

            {isPlaying && (
                <>
                    <div className="game-info" style={{ position: "absolute", top: "10px", left: "10px", fontSize: "1.5rem" }}>
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

                    {/* Falling foods */}
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
                            animate={{ top: "90%" }}
                            transition={{ duration: 3, ease: "linear" }}
                            onAnimationComplete={() => {
                                const joeyLeft = joeyPosition;

                                if (Math.abs(food.x - joeyLeft) < 10) {
                                    setScore((prevScore) => prevScore + 10);
                                }


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
