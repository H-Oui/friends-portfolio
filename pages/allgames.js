import React, { useState } from "react";
import { useRouter } from "next/router";

export default function MiniGamesPage() {
    const [clickCount, setClickCount] = useState(0);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const router = useRouter();

    const handleClick = (gamePath) => {
        if (isRedirecting) return; // Empêche les redirections multiples

        setClickCount((prev) => {
            const newCount = prev + 1;

            if (newCount >= 3) { // Par exemple, redirection après 3 clics
                setIsRedirecting(true);
                router.push(gamePath);
                return 0; // Reset du compteur après redirection
            }

            return newCount;
        });
    };

    return (
        <div className="mini-games-page" style={{ backgroundColor: "#f7e300", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 0" }}>
            <h1 style={{ fontSize: "3rem", fontFamily: "'Friends', sans-serif", color: "#ff6347", marginBottom: "20px" }}>
                Mini-Games Collection
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#333", fontFamily: "'Friends', sans-serif", marginBottom: "30px", textAlign: "center" }}>
                Dive into the fun world of *Friends* with our mini-games! Play the games based on your favorite characters and relive iconic moments. Challenge yourself with the trivia quiz and much more!
            </p>

            {/* Liste des mini-jeux */}
            <div className="games-list" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {/* Jeu de Monica */}
                <div className="game-card" style={{ width: "250px", backgroundColor: "#ffb6c1", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", textAlign: "center" }}>
                    <img src="" alt="Monica’s Kitchen Rush" style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }} />
                    <h3 style={{ fontSize: "1.5rem", color: "#333", fontFamily: "'Friends', sans-serif" }}>Monica’s Kitchen Rush</h3>
                    <p style={{ fontSize: "1rem", color: "#555", fontFamily: "'Friends', sans-serif", marginBottom: "15px" }}>
                        Help Monica in the kitchen! Type the name of the dish before time runs out. But beware, the orders come faster each time!
                    </p>
                    <button
                        className="play-button"
                        style={buttonStyle}
                        onClick={() => handleClick("/monicagame")}
                    >
                        Play
                    </button>
                </div>

                {/* Jeu de Chandler */}
                <div className="game-card" style={{ width: "250px", backgroundColor: "#ffd700", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", textAlign: "center" }}>
                    <img src="" alt="Chandler’s Quiz" style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }} />
                    <h3 style={{ fontSize: "1.5rem", color: "#333", fontFamily: "'Friends', sans-serif" }}>Chandler’s Quiz</h3>
                    <p style={{ fontSize: "1rem", color: "#555", fontFamily: "'Friends', sans-serif", marginBottom: "15px" }}>
                        Test your knowledge of Chandler’s funniest quotes and see if you can guess who said it!
                    </p>
                    <button
                        className="play-button"
                        style={buttonStyle}
                        onClick={() => handleClick("/chandlergame")}
                    >
                        Play
                    </button>
                </div>

                {/* Autres jeux ... */}
            </div>
        </div>
    );
}

// Style commun pour les boutons
const buttonStyle = {
    backgroundColor: "#f07c00",
    color: "#fff",
    fontSize: "1.2rem",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease-in-out",
    marginTop: "10px",
    textDecoration: "none",
};
