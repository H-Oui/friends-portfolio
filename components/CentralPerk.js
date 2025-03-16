import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function Canape() {
    const { scene } = useGLTF("/models/central_perk.glb");
    const ref = useRef();

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.015;  // Rotation continue autour de l'axe Y
        }
    });

    return <primitive object={scene} ref={ref} scale={0.8} position={[0, -2, 0]} />;
}

export default function Scene3D() {
    return (
        <Canvas camera={{ position: [0, 1.5, 3] }} style={{ background: 'transparent' }}>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 2]} />
            <Canape />
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}
