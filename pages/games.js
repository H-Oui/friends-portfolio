import React from "react";
import Scene3D from "../components/MonicaAppartement";

export default function IndexPage() {
    return (
        <div style={styles.container}>
            <div style={styles.sceneWrapper}>
                <Scene3D />
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: "100%",
        height: "100vh",  // Assure que le conteneur prend toute la hauteur de l'écran
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",  // Tu peux changer la couleur du fond si besoin
    },
    sceneWrapper: {
        width: "100%",
        height: "100%",  // Prend toute la hauteur du conteneur
    }
};
