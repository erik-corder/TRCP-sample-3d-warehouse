/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  Grid,
  OrbitControls,
  PerspectiveCamera,
  PivotControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC, Suspense } from "react";

interface ThreeDPlaneProps {}

const ThreeDPlane: FC<ThreeDPlaneProps> = ({}) => {
  return (
    <Suspense fallback={null}>
      <Canvas
        shadows={true}
        style={{ width: 900, height: 600, backgroundColor: "white" }}
      >
        <Grid infiniteGrid={true} cellColor={'green'} sectionColor={'#bc94f2'} />
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
        <PivotControls activeAxes={[true, true, true]}>
          <mesh position={[1, 1, 3]} >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </PivotControls>
      </Canvas>
    </Suspense>
  );
};

export default ThreeDPlane;
