import React, { useState, useEffect } from "react";
import Scene3D from "../components/MonicaAppartement";
import Menu from "../components/menu";

export default function IndexPage() {
    const [showPopup, setShowPopup] = useState(true);
    const [sceneEnabled, setSceneEnabled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const popupDismissed = localStorage.getItem("popupDismissed");
        if (popupDismissed) {
            setShowPopup(false);
            setSceneEnabled(true);
        }
        setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
        setSceneEnabled(true);
        localStorage.setItem("popupDismissed", "true");
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
        setSceneEnabled(false);
    };

    return (
        <div style={styles.container}>
            <Menu />
            <button style={styles.infoButton} onClick={handleOpenPopup}>ℹ️</button>
            {showPopup && (
                <div style={styles.popup}>
                    <h2 style={styles.title}>Welcome to Monica's Apartment!</h2>
                    <p style={styles.text}>
                        This is a 3D representation of Monica Geller's apartment.
                        You can explore the scene by using:
                    </p>
                    {isMobile ? (
                        <ul style={styles.list}>
                            <li>📱 Swipe to rotate the view</li>
                            <li>✌️ Use two fingers to move the scene</li>
                            <li>🔍 Pinch to zoom in and out</li>
                            <li>✨ Tap on some objects to find surprises!</li>
                        </ul>
                    ) : (
                        <ul style={styles.list}>
                            <li>🔄 Left-click to rotate the view</li>
                            <li>🖱 Right-click to move the scene</li>
                            <li>🔍 Scroll to zoom in and out</li>
                            <li>✨ Click on some objects to find surprises!</li>
                        </ul>
                    )}
                    <button style={styles.button} onClick={handleClosePopup}>Got it!</button>
                </div>
            )}
            <div style={styles.sceneWrapper}>
                {sceneEnabled ? <Scene3D /> : null}
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        position: "relative",
    },
    sceneWrapper: {
        width: "100%",
        height: "100%",
    },
    popup: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#f5c518",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        fontFamily: "'Friends', sans-serif",
        color: "#000",
        zIndex: 10,
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
    },
    text: {
        fontSize: "16px",
        marginBottom: "10px",
    },
    list: {
        textAlign: "left",
        paddingLeft: "20px",
        fontSize: "14px",
    },
    button: {
        marginTop: "15px",
        padding: "10px 20px",
        border: "none",
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
        borderRadius: "5px",
    },
    infoButton: {
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "#fff",
        zIndex: 10,
    }
};
