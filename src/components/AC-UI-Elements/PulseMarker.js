import React from "react"
import "./PulseMarker.css"

function pulseMarker() {
  return (
    <div className="wrapper">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xlinkHref="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 23 21"
      >
        <g id="marker">
          <circle className="core" cx="11.3" cy="10.5" r="3" />
          <circle
            className="ring"
            fill="none"
            stroke="#000000"
            strokeMiterlimit="10"
            cx="11.3"
            cy="10.5"
            r="6"
          />
        </g>
      </svg>
    </div>
  )
}

export default pulseMarker
