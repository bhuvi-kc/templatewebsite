import React from "react";
import Lanyard from "../component/Lanyard";

const Home = () => {
  return (
    <div className="h-screen w-full">

      <Lanyard
        position={[0,0,24]}
        gravity={[0,-40,0]}
        frontImage="/canva-logo.png"
      />

    </div>
  );
};

export default Home;