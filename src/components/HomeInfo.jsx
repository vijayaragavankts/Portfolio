import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1) {
    return (
      <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
        Hi, I'm
        <span className="font-semibold mx-2 text-white">Vijayaragavan</span>
        👋
        <br />A Software Developer from India
      </h1>
    );
  }

  if (currentStage === 2) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Passionate about full-stack projects and acquiring valuable hands-on
          skills.
        </p>
        <Link to="/about" className="neo-brutalism-white neo-btn">
          Learn More
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Executed multiple projects to fruition.
          <br />
          Eager to delve deeper?
        </p>
        <Link to="/projects" className="neo-brutalism-white neo-btn">
          View Projects
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Looking for a dev?
          <br />
          I'm just a few keystrokes away
        </p>
        <Link to="/contact" className="neo-brutalism-white neo-btn">
          Let's talk
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }
  return null;
};

export default HomeInfo;
