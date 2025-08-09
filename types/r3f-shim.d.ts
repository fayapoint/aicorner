// Temporary shims to avoid TS errors before packages are installed.
// Remove after running `npm i three @react-three/fiber @react-three/drei`.

declare module "@react-three/fiber";
declare module "@react-three/drei";
// three ships types, but this shim avoids red squiggles before install
declare module "three";

declare namespace JSX {
  interface IntrinsicElements {
    group: any;
    mesh: any;
    sphereGeometry: any;
    torusGeometry: any;
    planeGeometry: any;
    meshStandardMaterial: any;
    ambientLight: any;
    directionalLight: any;
    spotLight: any;
    color: any;
    fog: any;
  }
}
