import React, { useState, useEffect } from "react";
import Menu from "../components/menu";

const questions = [
    {
        question: "What is the name of Ross and Carol's son?",
        answers: ["Ben", "Emma", "Jack", "Joshua"],
        correctAnswer: "Ben",
    },
    {
        question: "What is the name of the character who plays 'Smelly Cat'?",
        answers: ["Monica", "Rachel", "Phoebe", "Chandler"],
        correctAnswer: "Phoebe",
    },
    {
        question: "What is Chandler's middle name?",
        answers: ["Muriel", "Monica", "Joseph", "Henry"],
        correctAnswer: "Muriel",
    },
    {
        question: "Which character was originally supposed to be a member of the band 'The Rembrandts'?",
        answers: ["Chandler", "Phoebe", "Ross", "Joey"],
        correctAnswer: "Phoebe",
    },
    {
        question: "What was the name of Ross and Monica's dog when they were kids?",
        answers: ["Chi-Chi", "Frank", "Samantha", "Mickey"],
        correctAnswer: "Chi-Chi",
    },
    {
        question: "Who was the last person to find out that Monica and Chandler were married?",
        answers: ["Phoebe", "Rachel", "Ross", "Joey"],
        correctAnswer: "Phoebe",
    },
    {
        question: "What was the name of Joey's stuffed penguin?",
        answers: ["Waddle", "Hugsy", "Pip", "Chester"],
        correctAnswer: "Hugsy",
    },
    {
        question: "What is the name of the coffee shop where the group hangs out?",
        answers: ["Central Perk", "Café Central", "The Coffee House", "Central Café"],
        correctAnswer: "Central Perk",
    },
    {
        question: "What was the name of Ross's second wife?",
        answers: ["Emily", "Carol", "Susan", "Rachel"],
        correctAnswer: "Emily",
    },
    {
        question: "Who does Monica marry?",
        answers: ["Joey", "Chandler", "Ross", "Phoebe"],
        correctAnswer: "Chandler",
    },
    {
        question: "What was the name of Phoebe's most famous song?",
        answers: ["Smelly Cat", "My Humps", "Sticky Shoes", "New York City"],
        correctAnswer: "Smelly Cat",
    },
    {
        question: "What is the name of Rachel's daughter?",
        answers: ["Emma", "Sophie", "Maddie", "Lily"],
        correctAnswer: "Emma",
    },
    {
        question: "What was the name of the building where Ross lived after his divorce from Carol?",
        answers: ["The Plaza", "The Apartments", "The Loft", "The Village"],
        correctAnswer: "The Village",
    },
    {
        question: "What was the name of Chandler’s father’s drag show?",
        answers: ["Viva Las Vegas", "The Geller Girls", "The Cocktail Lounge", "The Fabulous Chipper"],
        correctAnswer: "Viva Las Vegas",
    },
    {
        question: "What was the name of the character Joey played on 'Days of Our Lives'?",
        answers: ["Dr. Drake Ramoray", "Dr. Jack Drake", "Dr. Roy Ramoray", "Dr. David Ramoray"],
        correctAnswer: "Dr. Drake Ramoray",
    },
];

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerFeedback, setAnswerFeedback] = useState("");
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        const storedScore = localStorage.getItem("quizScore");
        if (storedScore) {
            setScore(parseInt(storedScore, 10));
        }
    }, []);

    const handleAnswer = (answer) => {
        if (answer === questions[currentQuestion].correctAnswer) {
            setScore((prevScore) => prevScore + 1);
            setAnswerFeedback("Bravo! Correct answer!");
        } else {
            setAnswerFeedback(`Wrong answer! The correct answer is: ${questions[currentQuestion].correctAnswer}`);
        }

        setSelectedAnswer(answer);

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setAnswerFeedback(""); // Reset feedback for next question
            } else {
                setQuizFinished(true);
                localStorage.setItem("quizScore", score + (answer === questions[currentQuestion].correctAnswer ? 1 : 0));
            }
        }, 1500); // Delay to allow feedback to show before moving to next question
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
        localStorage.removeItem("quizScore");
    };

    return (
        <div className="quiz-container">
            <Menu />
            <h1>Friends Quiz - How big of a fan are you?</h1>
            {!quizFinished ? (
                <div>
                    <h2>{questions[currentQuestion].question}</h2>
                    <div className="answers">
                        {questions[currentQuestion].answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`answer-btn ${selectedAnswer === answer ? "selected" : ""}`}
                                onClick={() => handleAnswer(answer)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    {answerFeedback && <p>{answerFeedback}</p>} {/* Show feedback */}
                </div>
            ) : (
                <div>
                    <h2>Congratulations! You finished the quiz.</h2>
                    <h3>Your score: {score} / {questions.length}</h3>
                    <button onClick={restartQuiz}>Restart Quiz</button>
                </div>
            )}
            <style jsx>{`
                .quiz-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    font-family: 'Arial', sans-serif;
                    background-color: black;
                    color: white;
                    height: 100vh;
                    padding: 20px;
                }
                h1 {
                    font-family: 'Friends', sans-serif;
                    font-size: 3rem;
                    color: #ff8c00;
                    margin-bottom: 20px;
                }
                h2 {
                    font-size: 1.5rem;
                    margin-bottom: 10px;
                }
                h3 {
                    font-size: 1.2rem;
                    margin-top: 10px;
                }
                .answers {
                    margin-top: 20px;
                }
                .answer-btn {
                    background-color: #444;
                    color: white;
                    padding: 12px 24px;
                    margin: 8px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }
                .answer-btn:hover {
                    background-color: #ff8c00;
                }
                .answer-btn.selected {
                    background-color: #ff8c00;
                }
                button {
                    padding: 12px 24px;
                    font-size: 18px;
                    cursor: pointer;
                    border: none;
                    background-color: #007bff;
                    color: white;
                    border-radius: 5px;
                    margin-top: 20px;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #0056b3;
                }
                /* Responsive Design */
                @media screen and (max-width: 768px) {
                    h1 {
                        font-size: 2rem;
                    }
                    .answer-btn {
                        font-size: 14px;
                        padding: 10px 18px;
                    }
                    button {
                        font-size: 16px;
                        padding: 10px 18px;
                    }
                }
            `}</style>
        </div>
    );
}

export default Quiz;
