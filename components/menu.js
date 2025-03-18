import React, { useState } from 'react';


const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>
            <nav className={`menu ${isOpen ? 'open' : ''}`}>
                <ul className="menu-list">
                    <li><a href="/" className="red">Home</a></li>
                    <li><a href="/home" className="blue">Characters</a></li>
                    <li><a href="/games" className="red">Appartment</a></li>
                    <li><a href="/allgames" className="yellow">Games</a></li>
                    <li><a href="/mentions" className="blue">Mentions</a></li>
                </ul>
            </nav>
        </>
    );
};

export default Menu;
