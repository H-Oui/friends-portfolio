import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [noteSpeed, setNoteSpeed] = useState(2000); // Vitesse de la note
    const [notesFalling, setNotesFalling] = useState([]);
    const audioRef = useRef(new Audio('/smelly-cat.mp3'));

    const notes = ['A', 'S', 'D', 'F']; // Les touches à jouer

    // Commencer le jeu
    const startGame = () => {
        setGameStarted(true);
        audioRef.current.play();
    };

    // Générer des notes
    const generateNotes = () => {
        setInterval(() => {
            let newNote = {
                key: notes[Math.floor(Math.random() * notes.length)],
                left: `${Math.random() * 80}%`,
                id: Date.now(),
            };
            setNotesFalling((prevNotes) => [...prevNotes, newNote]);
        }, noteSpeed);
    };

    // Gérer l'appui sur une touche
    const handleKeyPress = (e) => {
        const pressedKey = e.key.toUpperCase();
        if (notes.includes(pressedKey)) {
            let noteToRemove = notesFalling.find(
                (note) => note.key === pressedKey
            );
            if (noteToRemove) {
                setScore(score + 1);
                setNotesFalling((prevNotes) =>
                    prevNotes.filter((note) => note.id !== noteToRemove.id)
                );
            }
        }
    };

    // Lancer la génération des notes au démarrage du jeu
    useEffect(() => {
        if (gameStarted) {
            generateNotes();
            document.addEventListener('keydown', handleKeyPress);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [gameStarted, notesFalling, score]);

    // Animation des notes qui tombent
    const fallingNotes = notesFalling.map((note) => (
        <div
            key={note.id}
            className="note"
            style={{
                left: note.left,
                animation: 'fall 2s linear infinite',
            }}
        >
            {note.key}
        </div>
    ));

    return (
        <div className="App">
            {!gameStarted ? (
                <div className="start-screen">
                    <h1>Smelly Cat Guitar Hero</h1>
                    <button onClick={startGame}>Start Game</button>
                </div>
            ) : (
                <div className="game-screen">
                    <div className="notes-container">{fallingNotes}</div>
                    <div className="score">
                        <h2>Score: {score}</h2>
                    </div>
                </div>
            )}

            <style>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #ffeb3b;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .App {
                    text-align: center;
                }

                .start-screen h1 {
                    font-size: 2.5rem;
                    color: #ff4081;
                }

                button {
                    padding: 10px 20px;
                    background-color: #ff4081;
                    color: white;
                    border: none;
                    font-size: 1rem;
                    cursor: pointer;
                    border-radius: 5px;
                    margin-top: 20px;
                }

                button:hover {
                    background-color: #e6005c;
                }

                .game-screen {
                    position: relative;
                    width: 80%;
                    height: 60%;
                }

                .notes-container {
                    position: relative;
                    height: 100%;
                    overflow: hidden;
                }

                .note {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    background-color: #ff4081;
                    color: white;
                    font-size: 20px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: fall 2s linear infinite;
                }

                @keyframes fall {
                    0% {
                        top: -100px;
                    }
                    100% {
                        top: 100%;
                    }
                }

                .score {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    font-size: 1.5rem;
                    color: #ff4081;
                }
            `}</style>
        </div>
    );
}

export default App;
