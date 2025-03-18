import React from "react";
import { useRouter } from "next/router";
import Menu from "../components/menu";


const games = [
    { id: "monica", title: "Monica’s Kitchen Rush", description: "Type the dish names before time runs out!", path: "/monicagame" },
    { id: "joey", title: "Joey’s Food Chase", description: "Catch Joey’s food before it disappears!", path: "/joeygame" },
    { id: "ross", title: "Ross’s Dino Game", description: "Help Ross escape the dangers of the museum!", path: "/rossgame" },
    { id: "rachel", title: "Rachel’s Memory Order", description: "Memorize and serve the correct coffee order!", path: "/rachelgame" },
    { id: "chandler", title: "Chandler’s Quiz", description: "Complete Chandler’s funniest quotes!", path: "/chandlergame" },
    { id: "phoebe", title: "Phoebe’s Smelly Cat Tiles", description: "Play Smelly Cat on a piano tiles game!", path: "/phoebegame" },
    { id: "friends-quiz", title: "Ultimate Friends Quiz", description: "Test your knowledge on the entire series!", path: "/generalquiz" },
];
export default function MiniGamesPage() {
    const router = useRouter();

    const handleClick = (gamePath) => {
        router.push(gamePath);
    };

    return (
        <div className="allgames-page">

            <Menu />
            <div className="container">
                <h1>Mini-Games Collection</h1>
                <div className="games-grid">
                    {games.map((game, index) => (
                        <div key={game.id} className="game-card">
                            <h2>{game.title}</h2>
                            <p>{game.description}</p>
                            <button className="play-button" onClick={() => handleClick(game.path)}>
                                Play
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
