import React, { useState, useEffect } from "react";
import Menu from "../components/menu";

// Central Perk Memory Game
export default function CentralPerkMemory() {
    const commandsList = ["☕ Café", "🍵 Tea", "🥛 Latte", "🍫 Hot Chocolate", "🧋 Bubble Tea"];
    const [commands, setCommands] = useState([]);
    const [input, setInput] = useState([]);
    const [showCommands, setShowCommands] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState(3);
    const [showRules, setShowRules] = useState(true); // Add state for showing rules

    useEffect(() => {
        startNewRound();
    }, []);

    const startNewRound = (reset = false) => {
        setGameOver(false);
        setShowCommands(true);

        if (reset) {
            setScore(0);
            setDifficulty(3); // Reset difficulty to 3

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
            setDifficulty(Math.min(difficulty + 1, 7)); // Increase difficulty up to 7
            startNewRound();
        } else {
            setGameOver(true);
        }
    };

    const handleSelect = (cmd) => {
        setInput([...input, cmd]);
    };

    const handleStartGame = () => {
        setShowRules(false); // Hide rules when game starts
        startNewRound();
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8c0d5", minHeight: "100vh", color: "#333", fontFamily: "Arial, sans-serif" }}>
           <Menu/>
            <h1 style={{ fontSize: "2.5em", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", color: "#FF5E5B" }}>Rachel's Memory Game ☕</h1>
            <h2 style={{ marginBottom: "20px", fontSize: "1.5em" }}>Score: {score}</h2>

            {showRules && (
                <div style={{ background: "rgba(255,255,255,0.7)", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}>
                    <h3 style={{ fontSize: "1.8em", color: "#FF5E5B" }}>Game Rules</h3>
                    <ul style={{ textAlign: "left", fontSize: "1.2em", color: "#333" }}>
                        <li>1. Memorize the sequence of commands shown.</li>
                        <li>2. After the sequence disappears, repeat the commands in the same order.</li>
                        <li>3. If you get the order correct, you earn points and the difficulty increases.</li>
                        <li>4. If you make a mistake, the game ends.</li>
                        <li>5. Difficulty starts at 3 commands and increases with each round.</li>
                    </ul>
                    <button onClick={handleStartGame} style={{
                        padding: "12px", backgroundColor: "#FF4500", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1.2em", fontWeight: "bold", boxShadow: "2px 2px 5px rgba(0,0,0,0.3)", transition: "transform 0.2s"
                    }}
                            onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                            onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
                        Start Game
                    </button>
                </div>
            )}

            {showCommands && !showRules ? (
                <div style={{ animation: "flash 1s alternate infinite", fontSize: "1.5em", background: "rgba(255,255,255,0.5)", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
                    <h3>Remember this order:</h3>
                    <p>{commands.join(" - ")}</p>
                </div>
            ) : (
                <div>
                    <h3>Enter the commands in the correct order:</h3>
                    <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", marginTop: "20px" }}>
                        {commandsList.map((cmd, index) => (
                            <button key={index} onClick={() => handleSelect(cmd)} style={{
                                padding: "15px", fontSize: "18px", cursor: "pointer", borderRadius: "8px", backgroundColor: "#FF9B7F", border: "none", boxShadow: "2px 2px 5px rgba(0,0,0,0.3)", transition: "transform 0.2s", fontWeight: "bold"
                            }}
                                    onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
                                {cmd}
                            </button>
                        ))}
                    </div>
                    <p style={{ marginTop: "15px", fontSize: "1.2em" }}>Your input: {input.join(" - ")}</p>
                    <button onClick={handleSubmit} style={{
                        padding: "12px", marginTop: "15px", backgroundColor: "#FF5E5B", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1.2em", fontWeight: "bold", boxShadow: "2px 2px 5px rgba(0,0,0,0.3)", transition: "transform 0.2s"
                    }}
                            onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                            onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
                        Validate
                    </button>
                </div>
            )}

            {gameOver && (
                <div>
                    <h3 style={{ color: "#FFFAE3", fontSize: "1.5em" }}><strong>"Rachel, this is not a career!"</strong></h3>
                    <button onClick={() => startNewRound(true)} style={{
                        padding: "12px", backgroundColor: "#FF4500", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1.2em", fontWeight: "bold", boxShadow: "2px 2px 5px rgba(0,0,0,0.3)", transition: "transform 0.2s"
                    }}
                            onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                            onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
                        Restart
                    </button>
                </div>
            )}
        </div>
    );
}
