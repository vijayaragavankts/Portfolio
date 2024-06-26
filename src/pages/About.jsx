import React, { useState } from "react";
import "./TalismanStone.css";
import { skills } from "../constants/index";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import StarsCanvas from "../models/Stars";
import {
  rabbit,
  rat,
  dragon,
  pig,
  baffalo,
  dog,
  cock,
  horse,
  monkey,
  snake,
  sheep,
  tiger,
} from "../assets/images/index";
import {
  api,
  css,
  express,
  github,
  gitnew,
  html,
  java,
  javascript,
  jwt,
  mongodb,
  nodejs,
  python,
  react,
  redux,
  typescript,
} from "../assets/icons";

const skillData = [
  { image: cock, skill: javascript },
  { image: baffalo, skill: java },
  { image: snake, skill: react },
  { image: sheep, skill: nodejs },
  { image: rabbit, skill: express },
  { image: dragon, skill: mongodb },
  { image: rat, skill: python },
  { image: horse, skill: api },
  { image: monkey, skill: html },
  { image: dog, skill: css },
  { image: pig, skill: redux },
  { image: tiger, skill: jwt },
];

const About = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  const handleSkillClick = (index) => {
    setActiveSkill(index === activeSkill ? null : index);
  };
  return (
    <div className="relative z-0 ">
      <section className="max-container">
        <StarsCanvas />
        <h1 className="head-text" style={{ color: "whitesmoke" }}>
          Hello, World!
          <br />
          I'm
          <span className="blue-gradient_text font-semibold drop-shadow">
            {" "}
            Vijayaragavan
          </span>{" "}
          👋
        </h1>
        <div
          className="mt-5 flex flex-col gap-3 text-slate-500"
          style={{ color: "#F6F6F6" }}
        >
          <p>
            Budding Software Engineer, specializing in technical education
            through hands-on learning and building applications.
          </p>
        </div>
        <div className="py-10">
          <h3 className="subhead-text" style={{ color: "whitesmoke" }}>
            My Skills
          </h3>
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 hover14">
            {skillData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSkillClick(index)}
                className="grid-item "
              >
                <figure>
                  <img
                    src={item.image}
                    alt={item.skill}
                    className={index === activeSkill ? "active" : "norm"}
                    loading="lazy"
                  />
                  <div>
                    <img
                      src={item.skill}
                      alt={item.skill}
                      className="skill-text"
                      loading="lazy"
                    />
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-200" />

        <CTA />
      </section>
    </div>
  );
};

export default About;
