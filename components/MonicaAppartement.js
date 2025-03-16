import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

function Appartement() {
    const { scene } = useGLTF("/models/monica_geller_apartment.glb");

    return <primitive object={scene} scale={1} />;
}

export default function MonicaAppartement() {
    return (
        <Canvas camera={{ position: [0, 2, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <Appartement />
            <OrbitControls />
        </Canvas>
    );
}
