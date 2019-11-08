import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { withDeviceOrientation } from "react-fns";

import "./App.css";

const Xcoef = 0.8;
const Ycoef = -0.8;

const computeRatioX = distance => distance * 0.1;
const computeRatioY = distance => distance * 0.2;

const transform = distance => (x, y) =>
  `translate3d(${x * Xcoef * computeRatioX(distance)}px,${y *
    Ycoef *
    computeRatioY(distance)}px,0)`;

const App = ({ alpha, beta, gamma }) => {
  const [ props, set ] = useSpring(() => ({
    xy: [ 0, 0 ],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  useEffect(
    () => {
      //alpha: range: -30, 30
      // beta: range: 60, 120
      // temp
      if (alpha > 30) {
        alpha = 30;
      }
      if (alpha < -30) {
        alpha = -30;
      }

      if (beta < 60) {
        beta = 60;
      }
      if (beta > 120) {
        beta = 120;
      }

      set({ xy: [ alpha, beta - 90 ] });
    },
    [ alpha, beta ]
  );

  return (
    <div className="page">
      <div>{`alpha: ${alpha}`}</div>
      <div>{`beta: ${beta}`}</div>
      <div>{`gamma: ${gamma}`}</div>
      <div className="parallax">
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
};

export default withDeviceOrientation(App);
