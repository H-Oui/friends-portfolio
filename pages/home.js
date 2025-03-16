import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CharactersScroll() {
    const [isCleaning, setIsCleaning] = useState(false);
    const [showStain, setShowStain] = useState(false);
    const [clickCountMonica, setClickCountMonica] = useState(0);
    const [clickCountRoss, setClickCountRoss] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isProtectingFood, setIsProtectingFood] = useState(false);
    const [showText, setShowText] = useState(false);
    const [foodItems, setFoodItems] = useState([]);
    const [showBlackScreen, setShowBlackScreen] = useState(false);
    const [showJoeyText, setShowJoeyText] = useState(false);
    const [isPlayingGuitar, setIsPlayingGuitar] = useState(false);
    const [catPosition, setCatPosition] = useState({ x: 50, y: 50 });
    const [clickCount, setClickCount] = useState(0);
    const [showSmellyCatText, setShowSmellyCatText] = useState(false);
    const [isShoppingExplosion, setIsShoppingExplosion] = useState(false);
    const [showRachelText, setShowRachelText] = useState(false);
    const [isPoussinVisible, setIsPoussinVisible] = useState(true);
    const [isCanardClicked, setIsCanardClicked] = useState(false);
    const [isPoussinMoving, setIsPoussinMoving] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showAnimals, setShowAnimals] = useState(false);

    const handleClean = () => {
        setShowStain(true);
        setIsCleaning(true);
        const spongeSound = '/monica.mp3';
        new Audio(spongeSound).play();  // Jouer le son de l'éponge
        setTimeout(() => {
            setIsCleaning(false);
            setShowStain(false);
        }, 3000);
    };

    const handleSandwichClick = () => {
        setIsProtectingFood(true);

        // Afficher les aliments un par un
        setFoodItems([
            { id: 1, name: "🍕", x: Math.random() * 200, y: Math.random() * 80, moving: false },
            { id: 2, name: "🍔", x: Math.random() * 150, y: Math.random() * 80, moving: false },
            { id: 3, name: "🍟", x: Math.random() * 200, y: Math.random() * 80, moving: false },
            { id: 4, name: "🥗", x: Math.random() * 150, y: Math.random() * 80, moving: false },
        ]);

        setShowText(true);
        setShowJoeyText(true);

        // Après 1 seconde, commencer à animer les aliments
        setTimeout(() => {
            setFoodItems(prevItems =>
                prevItems.map(item => ({
                    ...item,
                    moving: true,
                }))
            );
            const joeyFoodSound = '/joey.mp3';
            new Audio(joeyFoodSound).play();
            setTimeout(() => {
                setFoodItems(prevItems =>
                    prevItems.map(item => ({
                        ...item,
                        x: 10,
                        y: 50,
                        shrinking: true,
                    }))
                );

                setTimeout(() => {
                    setFoodItems([]);
                    setIsProtectingFood(false);
                    setShowJoeyText(false);
                }, 1000);

            }, 3200);

        }, 2500);
    };

    const handleCouchClickRoss = () => {
        setClickCountRoss((prev) => (prev + 1) % 3);
        setRotation((prev) => {
            if (prev === 0) return 15;
            if (prev === 15) return -15;
            return 0;
        });
        const rossPivotSound = '/ross.mp3';
        new Audio(rossPivotSound).play(); // Jouer le son "Pivot!"
    };

    const handleCouchClickChandler = () => {
        setShowAnimals(true);
        const chickSound = '/short-chick-sound-171389.mp3';
        new Audio(chickSound).play();  // Jouer le son des poussins et canards
        const duckSound = '/duck-quack-112941.mp3';
        new Audio(duckSound).play();  // Jouer le son des poussins et canards
        setTimeout(() => {
            setShowAnimals(false);
        }, 3000); // Cache les animaux après 3 secondes
    };

    const handleGuitarClick = () => {
        setIsPlayingGuitar(true);
        const smellyCatSound = '/smelly-cat.mp3';
        new Audio(smellyCatSound).play();  // Jouer la chanson "Smelly Cat"
        setTimeout(() => setIsPlayingGuitar(false), 1000);
    };

    const handleCatClick = () => {
        setShowSmellyCatText(true);
        setCatPosition({
            x: Math.random() * 80 + 10, // Déplacement aléatoire en %
            y: Math.random() * 80 + 10
        });

        setTimeout(() => setShowSmellyCatText(false), 3000); // Cache le texte après 3s
    };

    const handleBagClick = () => {
        setIsShoppingExplosion(true);
        setShowRachelText(true);
        const shoppingSound = '/rachel.mp3';
        new Audio(shoppingSound).play();  // Jouer un son de shopping
        setTimeout(() => {
            setIsShoppingExplosion(false);
        }, 2000);

        setTimeout(() => {
            setShowRachelText(false);
        }, 2500);
    };

    return (
        <div style={{ transform: `rotate(${rotation}deg)` }}>

            {/* Monica */}
            <div className="character-container">
                <div className="character-content">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        id="monica-card"
                        className="character-card red"
                    >
                        <motion.div
                            className="sponge"
                            onClick={handleClean}
                            animate={isCleaning ? {
                                x: [0, 20, -20, 30, -30, 10, -10, 0],
                                y: [0, -5, 5, -5, 10, -10, 0],
                            } : {}}
                            transition={{ duration: 1.5, ease: "easeInOut", repeat: 1 }}
                        >
                            🧽
                        </motion.div>

                        <h2 className="character-title">Monica Geller</h2>
                        {showStain && <span className="stain"></span>}
                        <img src="/images/Monica.png" alt="Monica Geller" className="character-image" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="character-description"
                    >
                        <h2 className="character-quote" style={{ color: `rgb(233, 30, 35)` }}>Welcome to the real world! It sucks. You're gonna love it.</h2>
                        <p className="character-text">
                            Monica Geller is one of the most iconic characters from the hit TV show Friends. She is known for her obsessive-compulsive personality, love for cleanliness, and strong desire for control. As a chef, Monica is passionate about cooking and often takes charge of organizing events and gatherings for her friends. Despite her perfectionism, Monica is incredibly caring and loyal, always going out of her way to support her friends, especially when they need her the most. Her competitive nature is both a source of humor and admiration, as she constantly strives to be the best at everything she does.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Joey */}
            <div className="character-container">
                <div className="character-content">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        id="joey-card"
                        className="character-card blue"
                    >
                        <motion.div
                            className="sponge"
                            onClick={handleSandwichClick}
                        >
                            🥪
                        </motion.div>
                        {showBlackScreen && (
                            <div className="black-screen">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="black-screen-content"
                                >
                                    <div className="scrolling-text-container">
                                        <div className="scrolling-text space" >
                                            <span>Joey doesn't share food! </span><span>Joey doesn't share food! </span><span>Joey doesn't share food! </span>
                                        </div>
                                        <br/><br/>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                        <h2 className="character-title">Joey Tribbiani</h2>
                        {showJoeyText && <div className="joey-warning">Joey doesn't share food!</div>}
                        {foodItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="food-item"
                                style={{ top: `${item.y}%`, left: `${item.x}%` }}
                                initial={{ opacity: 0, scale: 0.4 }}
                                animate={{
                                    opacity: 1,
                                    scale: item.shrinking ? 0.1 : 1, // Rétrécissement avant de disparaître
                                    top: item.moving ? "50%" : `${item.y}%`, // Déplace vers le centre
                                    left: item.moving ? "50%" : `${item.x}%`,
                                    transition: { delay: index * 0.5, duration: 0.8 },
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                            >
                                {item.name}
                            </motion.div>
                        ))}

                        <img src="/images/Joey.png" alt="Joey Tribbiani" className="character-image" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="character-description"
                    >
                        <h2 className="character-quote" style={{ color: `rgb(2, 178, 231)` }}>How you doin'?</h2>
                        <p className="character-text">
                            Joey Tribbiani is the lovable, but often clueless, actor from the TV show *Friends*. Known for his charm and his famous catchphrase, "How you doin'?", Joey often finds himself in hilarious situations, especially in matters of romance. Despite his not-so-bright moments, he has a heart of gold and is always there for his friends. Joey has a deep love for food, acting, and, of course, his best friends.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Ross */}
            <div className="character-container">
                <div className="character-content">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        id="ross-card"
                        className="character-card yellow"
                    >
                        <motion.div
                            className="couch"
                            onClick={handleCouchClickRoss}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            🛋️
                        </motion.div>

                        <h2 className="character-title">Ross Geller</h2>
                        {showStain && <span className="stain"></span>}
                        <img src="/images/ross.png" alt="Ross Geller" className="character-image" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="character-description"
                    >
                        <h2 className="character-quote" style={{ color: `rgb(250, 188, 22)` }}>We were on a break !!!</h2>
                        <p className="character-text">
                            Ross Geller, one of the six friends in the popular TV show *Friends*, is known for his romantic escapades, awkwardness, and deep love for dinosaurs. He is Monica’s older brother and is often caught up in complicated love triangles. Despite his many failed relationships, he remains a loyal and supportive friend. His journey through the ups and downs of life provides plenty of comedic moments, especially his frequent missteps in the dating world.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Rachel */}
            <div className="character-container">
                <div className="character-content">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="character-card red"
                    >
                        {/* Sac de shopping interactif */}
                        <motion.div
                            className="shopping-bag"
                            onClick={handleBagClick}
                            whileHover={{ scale: 1.1 }}
                        >
                            🛍️
                        </motion.div>

                        {/* Explosion d'achats */}
                        {isShoppingExplosion && (
                            <div className="shopping-items">
                                <motion.div className="item" animate={{ x: 40, y: -10, opacity: 1 }}>👗</motion.div>
                                <motion.div className="item" animate={{ x: 60, y: 20, opacity: 1 }}>👜</motion.div>
                                <motion.div className="item" animate={{ x: 0, y: 40, opacity: 1 }}>👠</motion.div>
                            </div>
                        )}

                        {/* Texte qui apparaît après le clic */}
                        {showRachelText && (
                            <motion.div
                                className="rachel-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                "It's not that much!"
                            </motion.div>
                        )}

                        <h2 className="character-title red">Rachel Green</h2>
                        <img src="/images/rachel.jpg" alt="Rachel Green" className="character-image" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="character-description"
                    >
                        <h2 className="character-quote" style={{ color: `rgb(233, 30, 35)` }}>"It's like all my life everyone’s told me, ‘You’re a shoe!’"</h2>
                        <p className="character-text">
                            Rachel Green is the fashion-loving, sometimes spoiled but incredibly ambitious character from *Friends*.
                            She starts as a runaway bride and grows into a successful businesswoman in the fashion industry.
                            Her journey from being financially dependent on her parents to becoming self-sufficient is one of the most inspiring aspects of her character.
                            She’s known for her on-again, off-again relationship with Ross, her iconic hairstyles, and of course, her love for shopping.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Chandler */}
            <div className="character-container">
                <div className="character-content">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="character-card yellow"
                    >
                        {/* Fauteuil interactif */}
                        <motion.div
                            className="couch"
                            onClick={handleCouchClickChandler}
                            whileHover={{ scale: 1.1 }}
                        >
                            💻
                        </motion.div>

                        {/* Poussin & Canard apparaissant après clic */}
                        {showAnimals && (
                            <div className="animals">
                                <motion.div
                                    className="chick"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                >
                                    🐣
                                </motion.div>
                                <motion.div
                                    className="duck"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                                >
                                    🦆
                                </motion.div>
                            </div>
                        )}

                        <h2 className="character-title">Chandler Bing</h2>
                        <img src="/images/chandler.png" alt="Chandler Bing" className="character-image" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="character-description"
                    >
                        <h2 className="character-quote" style={{ color: `rgb(250, 188, 22)` }}>Could you BE any more...?</h2>
                        <p className="character-text">
                            Chandler Bing est connu pour son humour sarcastique et ses blagues légendaires.
                            Mais surtout, son fauteuil préféré est un endroit sacré... enfin, jusqu'à ce que
                            le poussin et le canard en prennent possession !
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Phoebe */}
            <div className="character-container">
                <div className="character-content">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        id="phoebe-card"
                        className="character-card blue"
                    >
                        {/* Guitare interactive */}
                        <motion.div
                            className="guitar"
                            onClick={() => {
                                handleGuitarClick();
                                handleCatClick();
                            }}
                            animate={isPlayingGuitar ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        >
                            🎸
                        </motion.div>

                        <h2 className="character-title">Phoebe Buffay</h2>
                        <img src="/images/phoebe.jpg" alt="Phoebe Buffay" className="character-image" />
                    </motion.div>

                    {/* Texte Smelly Cat */}
                    {showSmellyCatText && (
                        <motion.div
                            className="smelly-cat-text"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            🎶 Smelly Cat, Smelly Cat, what are they feeding you? 🎶
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="character-description"
                    >
                        <h2 className="character-quote" style={{ color: `rgb(2, 178, 231)` }}>Smelly Cat, Smelly Cat...</h2>
                        <p className="character-text">
                            Phoebe Buffay est l'âme libre et excentrique du groupe. Avec sa guitare et ses chansons iconiques, elle apporte une touche unique et imprévisible. Son humour décalé et son passé mystérieux font d'elle un personnage fascinant.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}