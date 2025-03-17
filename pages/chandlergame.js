import React, { useState } from 'react';
import Menu from "../components/menu";

const style = {
    container: {
        textAlign: 'center',
        backgroundColor: '#FFEB3B', // Jaune léger pour une meilleure lecture
        fontFamily: "'Arial', sans-serif",
        height: '100vh',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        overflow: 'hidden',
    },
    title: {
        fontSize: '3em',
        color: '#3e3e3e',
        marginBottom: '20px',
        fontWeight: 'bold',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        animation: 'fadeIn 1s ease-in-out',
    },
    rules: {
        fontSize: '1.1em',
        color: '#333',
        marginBottom: '40px',
        padding: '0 10px',
        fontWeight: 'bold',
        lineHeight: '1.5',
        animation: 'fadeIn 1s ease-in-out',
    },
    question: {
        fontSize: '1.6em',
        marginBottom: '20px',
        color: '#444',
        fontStyle: 'italic',
        animation: 'fadeIn 1.5s ease-in-out',
    },
    choices: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    choiceButton: {
        padding: '15px 25px',
        backgroundColor: '#FF9800', // Orange vif pour plus de visibilité
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: '#fff',
        width: '250px',
        transition: 'transform 0.3s, background-color 0.3s',
    },
    choiceButtonHover: {
        transform: 'scale(1.1)',
        backgroundColor: '#FF5722', // Couleur plus chaude au survol
    },
    result: {
        marginTop: '30px',
        fontSize: '1.4em',
        color: '#388E3C', // Vert pour une réponse positive
        fontWeight: 'bold',
    },
};

const questions = [
    // Niveau 1 - Facile
    {
        question: "Could I BE any more ____?",
        choices: ["funny", "tired", "awesome", "annoying"],
        answer: "annoying",
    },
    {
        question: "I'm not great at the advice. Can I interest you in a ____?",
        choices: ["joke", "sarcastic comment", "sandwich", "hug"],
        answer: "sarcastic comment",
    },
    {
        question: "I'm sorry, we don’t have your ____.",
        choices: ["sweater", "sandwich", "sheep", "coffee"],
        answer: "sheep",
    },
    // Niveau 2 - Moyen
    {
        question: "It’s not that I’m not interested in your life, it’s just that I don’t ____.",
        choices: ["care", "have time", "understand", "want to talk"],
        answer: "care",
    },
    {
        question: "I'm really not a 'food' person. I mean, I don’t even ____ my pizza.",
        choices: ["eat", "like", "share", "know how to cut"],
        answer: "share",
    },
    {
        question: "Oh, I’m sorry. Did my back hurt your ____?",
        choices: ["feelings", "sandwich", "shoulder", "ego"],
        answer: "ego",
    },
    // Niveau 3 - Difficile
    {
        question: "Could I BE wearing any more ____?",
        choices: ["clothes", "sweaters", "hats", "leather"],
        answer: "leather",
    },
    {
        question: "Well, maybe I don’t want to be ____!",
        choices: ["rich", "famous", "married", "happy"],
        answer: "happy",
    },
    {
        question: "This is not a date. It’s just a way for me to ____.",
        choices: ["get over my ex", "avoid talking", "get free food", "have some fun"],
        answer: "get free food",
    },
];

function ChandlerGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [resultMessage, setResultMessage] = useState("");
    const [hoveredChoice, setHoveredChoice] = useState(null);

    const handleChoice = (choice) => {
        if (choice === questions[currentQuestion].answer) {
            setScore(score + 1);
            setResultMessage("Bravo! Vous avez choisi la bonne réponse.");
        } else {
            setResultMessage(`Dommage, la bonne réponse était : ${questions[currentQuestion].answer}.`);
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setResultMessage("");
            } else {
                setResultMessage(`Fin du jeu! Vous avez marqué ${score} point(s).`);
            }
        }, 1500);
    };

    return (
        <div style={style.container}>
            <Menu />
            <h1 style={style.title}>Chandler's Catchphrase Builder</h1>
            <p style={style.rules}>
                The goal of this game is to complete Chandler’s famous catchphrases from the Friends series. Select the word that best completes the phrase and test your knowledge of this iconic character!
            </p>
            <p style={style.question}>{questions[currentQuestion].question}</p>
            <div style={style.choices}>
                {questions[currentQuestion].choices.map((choice, index) => (
                    <button
                        key={index}
                        style={hoveredChoice === index ? {...style.choiceButton, ...style.choiceButtonHover} : style.choiceButton}
                        onClick={() => handleChoice(choice)}
                        onMouseEnter={() => setHoveredChoice(index)}
                        onMouseLeave={() => setHoveredChoice(null)}
                    >
                        {choice}
                    </button>
                ))}
            </div>
            {resultMessage && <p style={style.result}>{resultMessage}</p>}
        </div>
    );
}

export default ChandlerGame;
