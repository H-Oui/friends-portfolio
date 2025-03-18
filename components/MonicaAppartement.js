import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

function Appartement() {
    const { scene } = useGLTF("/models/monica_geller_apartment.glb");
    const groupRef = useRef();
    const [clickCount, setClickCount] = useState(0);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const router = useRouter();

    const handleClick = (event) => {
        if (isRedirecting) return;

        if (event.intersections.length > 0) {
            const object = event.intersections[0].object;

            console.log("Objet cliqué :", object.name);

            setClickCount((prev) => {
                const newCount = prev + 1;

                if (newCount >= 7) {
                    setIsRedirecting(true);
                    const games = ["/chandlergame", "/monicagame", "/joeygame", "/phoebegame", "/rachelgame", "/rossgame", "/generalquiz"];
                    const randomGame = games[Math.floor(Math.random() * games.length)];

                    router.push(randomGame);
                    return 0;
                }

                return newCount;
            });
        }
    };


    return (
        <group ref={groupRef} onClick={handleClick}>
            <primitive object={scene} scale={1} position={[10, 0, 5]} />
        </group>
    );
}

export default function MonicaAppartement() {
    return (
        <Canvas style={{ height: "100vh", width: "100%" }} camera={{ position: [6, 4, 0] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <Appartement />
            <OrbitControls />
        </Canvas>
    );
}
