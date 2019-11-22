import React from "react";
import "../Background.css";

function Background() {
  return (
    <div className="bg-boxes">
      <svg width="300px" height="100%" id="col1">
        <rect
          width="150px"
          height="150px"
          x="75px"
          y="75px"
          className="bubble"
          id="bub1"
        />
      </svg>
      <svg width="200px" height="100%" id="col2">
        <rect
          width="100px"
          height="100px"
          x="50px"
          y="50px"
          className="bubble"
          id="bub2"
        />
      </svg>
      <svg width="260px" height="100%" id="col3">
        <rect
          width="130px"
          height="130px"
          x="65px"
          y="65px"
          className="bubble"
          id="bub3"
        />
      </svg>
      <svg width="160px" height="100%" id="col4">
        <rect
          width="80px"
          height="80px"
          x="40px"
          y="40px"
          className="bubble"
          id="bub4"
        />
      </svg>
      <svg width="240px" height="100%" id="col5">
        <rect
          width="120px"
          height="120px"
          x="60px"
          y="60px"
          className="bubble"
          id="bub5"
        />
      </svg>
      <svg width="200px" height="100%" id="col6">
        <polygon points="50,150 100,50 150,150" className="bubble" id="bub6" />
      </svg>
      <svg width="200px" height="100%" id="col7">
        <rect
          width="100px"
          height="100px"
          x="50px"
          y="50px"
          className="bubble"
          id="bub7"
        />
      </svg>
      <svg width="200px" height="100%" id="col8">
        <rect
          width="100px"
          height="100px"
          x="50px"
          y="50px"
          className="bubble"
          id="bub8"
        />
      </svg>
      <svg width="200px" height="100%" id="col9">
        <rect
          width="100px"
          height="100px"
          x="50px"
          y="50px"
          className="bubble"
          id="bub9"
        />
      </svg>
      <svg width="200px" height="100%" id="col10">
        <rect
          width="100px"
          height="100px"
          x="50px"
          y="50px"
          className="bubble"
          id="bub10"
        />
      </svg>
      <svg width="100px" height="100%" id="col11">
        <rect
          width="50px"
          height="50px"
          x="25px"
          y="25px"
          className="bubble"
          id="bub11"
        />
      </svg>
    </div>
  );
}

export default Background;
