import React from "react";
import "./TalismanStone.css";
import { skills } from "../constants/index";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, World!
        <br />
        I'm
        <span className="blue-gradient_text font-semibold drop-shadow">
          {" "}
          Vijayaragavan
        </span>{" "}
        👋
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Budding Software Engineer, specializing in technical education through
          hands-on learning and building applications.
        </p>
      </div>
      <div className="py-10">
        <h3 className="subhead-text">My Skills</h3>
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <div className="talisman-stone shadow-card" key={index}>
              <div className="octagon">
                <div className="inside">
                  <img
                    className="skill"
                    src={skill.imageUrl}
                    alt={skill.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />

      <CTA />
    </section>
  );
};

export default About;
