import React from "react";
import "./TypeWriter.css";

const Typewriter = ({text}) => {
  return (
    <div className="bg-white/80 h-[100vh] w-[100vw] flex justify-center items-center fixed left-0 top-0 z-90">
      <div>
        <div class="typewriter">
        <div class="slide">
          <i></i>
        </div>
        <div class="paper"></div>
        <div class="keyboard"></div>
      </div>
      {text && <div className="text-center mt-3 text-primary font-semibold">
        <p>{text}</p>
      </div>}
      </div>
    </div>
  );
};

export default Typewriter;
