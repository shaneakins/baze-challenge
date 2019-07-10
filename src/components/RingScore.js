import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";

export default function RingScore({ score, short, reset }) {
  const { configData, detailsActive, getRange } = useContext(AppContext);

  const [progress, setProgress] = useState(0);
  const [range, setRange] = useState(null);
  const radius = 30;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  let circleRef = useRef(null);

  // Animate ring after delay
  useEffect(() => {
    if (configData) {
      const timer = setTimeout(() => {
        // Normalize invalid or missinc scores
        const adjScore = score === undefined ? 0 : Math.floor(score);
        setProgress(adjScore);

        // Determine which range the score falls in
        setRange(getRange(adjScore));
        clearTimeout(timer);
      }, 500);
    }
  }, [configData, score]);

  return (
    <div className="comp-ringscore">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${radius *2} ${radius * 2}`}>
        <circle stroke="#dddddd" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
        <circle
          className="progressring"
          ref={circleRef}
          stroke={range && range.color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* <text x="50%" y="50%" textAnchor="middle" dy=".3em">{(progress > 0) && `${progress}%`}</text> */}
        <text x="50%" y="50%" textAnchor="middle" dy="0.3em">
          {short}
        </text>
      </svg>
    </div>
  );
}
