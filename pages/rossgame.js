import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Menu from "../components/menu";

export default function RossGame() {
    const [dinoPosition, setDinoPosition] = useState(0); // Position du dino (0 = au sol)
    const [isJumping, setIsJumping] = useState(false); // Si le dino est en train de sauter
    const [obstacles, setObstacles] = useState([]); // Liste des obstacles
    const [score, setScore] = useState(0); // Score du jeu
    const [isPlaying, setIsPlaying] = useState(false); // Si le jeu est en cours
    const [gameOver, setGameOver] = useState(false); // Si le jeu est terminé
    const [speed, setSpeed] = useState(1); // Vitesse de déplacement des obstacles

    // Types d'obstacles en lien avec Ross
    const obstacleTypes = ["📚", "🥪", "🎹", "🛋️"];

    useEffect(() => {
        if (!isPlaying) return;

        // Créer un obstacle toutes les 2 secondes
        const interval = setInterval(() => {
            const randomObstacle = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
            setObstacles((prevObstacles) => [
                ...prevObstacles,
                { id: Date.now(), x: -10, y: 0, type: randomObstacle } // Position initiale à gauche de l'écran
            ]);
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    // Gérer le saut du Dino avec le son de Ross
    const handleJump = () => {
        if (isJumping) return;
        setIsJumping(true);
        setDinoPosition(100); // Saut

        // Jouer l'effet sonore de Ross
        const rossPivotSound = '/ross.mp3';
        new Audio(rossPivotSound).play(); // Assurez-vous que le fichier existe

        setTimeout(() => {
            setDinoPosition(0); // Retour au sol
            setIsJumping(false);
        }, 800); // Temps du saut (augmenté à 800ms pour un saut plus long)
    };

    // Contrôles du jeu
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === " " || e.key === "ArrowUp") {
                handleJump();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isJumping]);

    // Gérer la descente des obstacles (de gauche à droite) avec augmentation progressive de la vitesse
    useEffect(() => {
        if (!isPlaying) return;

        // Augmenter la vitesse tous les 5 secondes
        const speedInterval = setInterval(() => {
            setSpeed((prevSpeed) => prevSpeed + 0.10); // Augmente la vitesse de 2% toutes les 5 secondes
        }, 3000);

        const obstacleInterval = setInterval(() => {
            setObstacles((prevObstacles) =>
                prevObstacles.map((obs) => ({ ...obs, x: obs.x + speed })) // Déplacement des obstacles avec la vitesse dynamique
            );
            setScore((prevScore) => prevScore + 1); // Augmente le score
        }, 20); // Intervalle de 20ms pour la descente des obstacles

        return () => {
            clearInterval(speedInterval);
            clearInterval(obstacleInterval);
        };
    }, [isPlaying, speed]);

    // Vérifier les collisions
    useEffect(() => {
        const checkCollisions = () => {
            for (const obs of obstacles) {
                // Si l'obstacle touche le Dino (en tenant compte de la position en hauteur du dino pendant le saut)
                if (obs.x >= 80 && obs.x <= 90 && dinoPosition === 0) { // Ajuster la position du Dino à droite
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
                backgroundColor: "#f7e300", // Fond jaune
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center", // Centrage du contenu
                borderRadius: "10px",
                flexDirection: "column", // Contenu en colonne
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
                            setSpeed(1); // Réinitialiser la vitesse
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

                    {/* Afficher la vidéo de Ross */}
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

                    {/* Piste au centre sans fond gris */}
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            width: "80%",
                            height: "150px",
                            transform: "translateY(-50%)", // Centrer verticalement
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
                                right: "10%", // Le Dino est maintenant à droite
                                fontSize: "3rem",
                                transform: "translateX(50%)", // Centrer le Dino par rapport à la position droite
                                cursor: "pointer", // Ajout du curseur pour cliquer sur le dino
                            }}
                            onClick={handleJump} // Permet de sauter en cliquant
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
