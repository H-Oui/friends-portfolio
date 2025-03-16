import React, { useState, useEffect } from "react";

export default function CentralPerkMemory() {
    const commandsList = ["☕ Café", "🍵 Thé", "🥛 Latte", "🍫 Chocolat chaud", "🧋 Bubble Tea"];
    const [commands, setCommands] = useState([]);
    const [input, setInput] = useState([]);
    const [showCommands, setShowCommands] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState(3);

    useEffect(() => {
        startNewRound();
    }, []);

    const startNewRound = (reset = false) => {
        setGameOver(false);
        setShowCommands(true);

        if (reset) {
            setScore(0);
            setDifficulty(3); // Réinitialise la difficulté à 3

            // Attendre que difficulty soit bien mis à jour avant de générer les nouvelles commandes
            setTimeout(() => {
                const newCommands = Array.from({ length: 3 }, () => commandsList[Math.floor(Math.random() * commandsList.length)]);
                setCommands(newCommands);
                setInput([]);
                setTimeout(() => setShowCommands(false), 2000);
            }, 0);
        } else {
            const newCommands = Array.from({ length: difficulty }, () => commandsList[Math.floor(Math.random() * commandsList.length)]);
            setCommands(newCommands);
            setInput([]);
            setTimeout(() => setShowCommands(false), 2000);
        }
    };




    const handleSubmit = () => {
        if (JSON.stringify(input) === JSON.stringify(commands)) {
            setScore(score + 1);
            setDifficulty(Math.min(difficulty + 1, 7)); // Augmente la difficulté jusqu'à 7
            startNewRound();
        } else {
            setGameOver(true);
        }
    };

    const handleSelect = (cmd) => {
        setInput([...input, cmd]);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#8B0000", minHeight: "100vh", color: "white", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ fontSize: "2em", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Central Perk Memory ☕</h1>
            <h2 style={{ marginBottom: "20px" }}>Score: {score}</h2>

            {showCommands ? (
                <div style={{ animation: "flash 1s alternate infinite", fontSize: "1.5em", background: "rgba(255,255,255,0.2)", padding: "15px", borderRadius: "10px" }}>
                    <h3>Retiens cette commande :</h3>
                    <p>{commands.join(" - ")}</p>
                </div>
            ) : (
                <div>
                    <h3>Entre les commandes dans le bon ordre :</h3>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                        {commandsList.map((cmd, index) => (
                            <button key={index} onClick={() => handleSelect(cmd)} style={{ padding: "15px", fontSize: "18px", cursor: "pointer", borderRadius: "8px", backgroundColor: "#FFD700", border: "none", boxShadow: "2px 2px 5px rgba(0,0,0,0.3)", transition: "transform 0.2s", fontWeight: "bold" }}
                                    onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
                                {cmd}
                            </button>
                        ))}
                    </div>
                    <p style={{ marginTop: "15px", fontSize: "1.2em" }}>Votre entrée : {input.join(" - ")}</p>
                    <button onClick={handleSubmit} style={{ padding: "12px", marginTop: "15px", backgroundColor: "#008000", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1.2em", fontWeight: "bold", boxShadow: "2px 2px 5px rgba(0,0,0,0.3)", transition: "transform 0.2s" }}
                            onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                            onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
                        Valider
                    </button>
                </div>
            )}

            {gameOver && (
                <div>
                    <h3 style={{ color: "yellow", fontSize: "1.5em" }}><strong>"Rachel, this is not a career!"</strong></h3>
                    <button onClick={() => startNewRound(true)} style={{ padding: "12px", backgroundColor: "#FF4500", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1.2em", fontWeight: "bold", boxShadow: "2px 2px 5px rgba(0,0,0,0.3)", transition: "transform 0.2s" }}
                            onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                            onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
                        Recommencer
                    </button>


                </div>
            )}
        </div>
    );
}
