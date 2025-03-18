import React, { useState, useEffect } from "react";
import Menu from "../components/menu";

export default function KitchenRush() {
    const dishes = ["lasagna", "pizza", "pasta", "burger", "salad", "soup", "taco", "sushi"];
    const gameDuration = 30;
    const initialTimePerDish = 5;
    const hardModeTime = 3;

    const [currentDish, setCurrentDish] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [timeLeft, setTimeLeft] = useState(initialTimePerDish);
    const [globalTimeLeft, setGlobalTimeLeft] = useState(gameDuration);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [difficultyIncreased, setDifficultyIncreased] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            setNextDish();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying || globalTimeLeft <= 0) return;

        const timer = setInterval(() => {
            setGlobalTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, globalTimeLeft]);

    useEffect(() => {
        if (globalTimeLeft === 0) {
            setGameOver(true);
            setIsPlaying(false);
        }

        if (globalTimeLeft === 15 && !difficultyIncreased) {
            setDifficultyIncreased(true);
            setTimeLeft(hardModeTime);
        }
    }, [globalTimeLeft, difficultyIncreased]);

    useEffect(() => {
        if (!isPlaying || timeLeft <= 0 || gameOver) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, gameOver]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleIncorrect();
        }
    }, [timeLeft]);

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        setInputValue(value);

        if (value === currentDish) {
            setScore((prev) => prev + 10);
            nextRound();
        }
    };

    const handleIncorrect = () => {
        setErrors((prev) => prev + 1);
        nextRound();
    };

    const nextRound = () => {
        setNextDish();
        setInputValue("");
        setTimeLeft(difficultyIncreased ? hardModeTime : initialTimePerDish);
    };

    const setNextDish = () => {
        setCurrentDish(dishes[Math.floor(Math.random() * dishes.length)]);
    };

    const restartGame = () => {
        setScore(0);
        setErrors(0);
        setTimeLeft(initialTimePerDish);
        setGlobalTimeLeft(gameDuration);
        setGameOver(false);
        setIsPlaying(true);
        setDifficultyIncreased(false);
    };

    return (
        <div style={styles.container}>
            <Menu />
            {!isPlaying ? (
                <>
                    <h1 style={styles.title}>Monica’s Kitchen Rush</h1>
                    <p style={styles.description}>
                        Type as many dishes as you can in 30 seconds! ⏳<br />
                        Each correct answer gives +10 points.<br />
                        After 15 seconds, the time to answer shortens! ⚡<br />
                        <strong>Ready? Click "Start Game"!</strong>
                    </p>
                    {gameOver ? (
                        <div style={styles.gameOverContainer}>
                            <h2>Game Over!</h2>
                            <h3>Final Score: {score}</h3>
                            <h3>Errors: {errors}</h3>
                            <button onClick={restartGame} style={styles.button}>Play Again</button>
                        </div>
                    ) : (
                        <button onClick={() => setIsPlaying(true)} style={styles.button}>Start Game</button>
                    )}
                </>
            ) : (
                <>
                    <h2 style={styles.dish}>Dish: {currentDish}</h2>
                    <h3>Time Left: {globalTimeLeft}s</h3>
                    <h3>Time to Answer: {timeLeft}s</h3>
                    <h3>Score: {score}</h3>
                    <h3>Errors: {errors}</h3>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type the dish..."
                        autoFocus
                        style={styles.input}
                    />
                </>
            )}
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#C62828",
        color: "#FFF",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "15px",
        textTransform: "uppercase",
        letterSpacing: "2px",
    },
    description: {
        fontSize: "18px",
        marginBottom: "20px",
        maxWidth: "600px",
        lineHeight: "1.6",
        fontFamily: "'Arial', sans-serif",
    },
    dish: {
        fontSize: "24px",
        fontWeight: "bold",
        marginTop: "10px",
    },
    button: {
        backgroundColor: "#FF9800",
        color: "#FFF",
        padding: "12px 24px",
        fontSize: "20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginTop: "20px",
        transition: "background-color 0.3s",
    },
    input: {
        padding: "12px",
        fontSize: "18px",
        border: "2px solid #FFF",
        borderRadius: "8px",
        textAlign: "center",
        marginTop: "15px",
        width: "80%",
        maxWidth: "350px",
    },
    gameOverContainer: {
        backgroundColor: "#000",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    },
};
