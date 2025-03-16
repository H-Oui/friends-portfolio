import React from "react";
import Scene3D from "../components/CentralPerk";

export default function IndexPage() {

    return (
        <div style={styles.container}>
            <div style={styles.sceneWrapper}>
                <Scene3D />
            </div>
            <h1 style={styles.text}>Welcome to the F.R.I.E.N.D.S experience</h1>
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
        padding: 0
    },
    sceneWrapper: {
        width: "100%",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    text: {
        color: "#fff",
        fontSize: "2rem",
        margin: "20px 0",
    },
    button: {
        padding: "10px 20px",
        fontSize: "1.2rem",
        backgroundColor: "#ff9800",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};



