import React, { useState } from 'react';

const style = {

    container: {
        textAlign: 'center',
        backgroundColor: 'yellow',
        fontFamily: "'Arial', sans-serif",
        height: '100vh',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {

        fontSize: '2.5em',
        color: '#3e3e3e',

    },
    question: {
        fontSize: '1.5em',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1.2em',
        backgroundColor: '#f4a300',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    choices: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    choiceButton: {
        padding: '10px 20px',
        backgroundColor: '#ffcb00',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.2em',
    },
    result: {
        marginTop: '20px',
        fontSize: '1.5em',
        color: 'green',
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
            <h1 style={style.title}>Chandler's Catchphrase Builder</h1>
            <p style={style.question}>{questions[currentQuestion].question}</p>
            <div style={style.choices}>
                {questions[currentQuestion].choices.map((choice, index) => (
                    <button
                        key={index}
                        style={style.choiceButton}
                        onClick={() => handleChoice(choice)}
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
