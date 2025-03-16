import React, { useState, useEffect } from "react";

export default function KitchenRush() {
    const dishes = ["lasagna", "pizza", "pasta", "burger", "salad", "soup", "taco", "sushi"];
    const gameDuration = 30; // Durée du jeu en secondes
    const initialTimePerDish = 5; // Temps de base par plat
    const hardModeTime = 3; // Temps par plat en mode difficile

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
            setTimeLeft(hardModeTime); // Augmente la difficulté après 15s
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
            {!isPlaying ? (
                <>
                    <h1 style={styles.title}>Monica’s Kitchen Rush</h1>
                    <p style={styles.description}>
                        Tapez le maximum de plats **en 30 secondes** ! ⏳<br />
                        Chaque bonne réponse donne **+10 points**.<br />
                        À **15s**, le temps pour répondre **diminue** ! ⚡<br />
                        <strong>Prêt(e) ? Cliquez sur "Start Game" !</strong>
                    </p>
                    {gameOver ? (
                        <div style={styles.gameOverContainer}>
                            <h2>Game Over!</h2>
                            <h3>Score final: {score}</h3>
                            <h3>Erreurs: {errors}</h3>
                            <button onClick={restartGame} style={styles.button}>Rejouer</button>
                        </div>
                    ) : (
                        <button onClick={() => setIsPlaying(true)} style={styles.button}>Start Game</button>
                    )}
                </>
            ) : (
                <>
                    <h2 style={styles.dish}>Dish: {currentDish}</h2>
                    <h3>Temps restant: {globalTimeLeft}s</h3>
                    <h3>Temps pour répondre: {timeLeft}s</h3>
                    <h3>Score: {score}</h3>
                    <h3>Erreurs: {errors}</h3>
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
        backgroundColor: "#C62828", // Rouge Monica
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
    },
    description: {
        fontSize: "18px",
        marginBottom: "20px",
        maxWidth: "500px",
        lineHeight: "1.5",
    },
    dish: {
        fontSize: "24px",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#FF9800", // Orange Friends
        color: "#FFF",
        padding: "10px 20px",
        fontSize: "18px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },
    input: {
        padding: "10px",
        fontSize: "18px",
        border: "2px solid #FFF",
        borderRadius: "5px",
        textAlign: "center",
        marginTop: "10px",
    },
    gameOverContainer: {
        backgroundColor: "#000",
        padding: "20px",
        borderRadius: "10px",
    },
};
