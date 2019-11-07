import React from "react";
import { useSpring, animated } from "react-spring";

import "./App.css";

const Xcoef = 0.1;
const Ycoef = -0.1;

const computeRatioX = distance => distance * 0.1;
const computeRatioY = distance => distance * 0.2;

const transform = distance => (x, y) =>
  `translate3d(${x * Xcoef * computeRatioX(distance)}px,${y *
    Ycoef *
    computeRatioY(distance)}px,0)`;

const calc = (x, y) => [
  x - window.innerWidth / 2,
  y - window.innerHeight / 2
];

function App() {
  const [ props, set ] = useSpring(() => ({
    xy: [ 0, 0 ],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  return (
    <div className="page">
      <div
        className="parallax"
        onMouseMove={({ clientX: x, clientY: y }) => {
          set({ xy: calc(x, y) });
        }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <animated.div
            key={index}
            className={`card${index + 1}`}
            style={{ transform: props.xy.interpolate(transform(index + 1)) }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
