import React from "react";
import Scene3D from "../components/CentralPerk";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function IndexPage() {
    const router = useRouter();
    const [isBlinking, setIsBlinking] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlinking((prev) => !prev);
        }, 500); // Clignotement toutes les 500ms
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.sceneWrapper}>
                <Scene3D />
            </div>
            <h1
                style={{ ...styles.text, opacity: isBlinking ? 1 : 0.5 }}
                onClick={() => router.push("/home")}
            >
                Welcome to the <span style={styles.friendsFont}>F.R.I.E.N.D.S</span> experience
            </h1>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "mediumpurple",
        margin: 0,
        padding: 0,
        textAlign: "center",
    },
    sceneWrapper: {
        width: "100%",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    text: {
        color: "#fff",
        fontSize: "2rem",
        margin: "20px 0",
        cursor: "pointer",
        transition: "opacity 0.5s ease-in-out",
    },
    friendsFont: {
        fontFamily: "'Gabriel Weiss' Friends', sans-serif",
    },
};
