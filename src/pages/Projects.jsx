import React from "react";
import { projects } from "../constants";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import CTA from "../components/CTA";
import StarsCanvas from "../models/Stars";

const Projects = () => {
  return (
    <div className="relative z-0 ">
      <section className="max-container">
        <StarsCanvas />
        <h1 className="head-text" style={{ color: "whitesmoke" }}>
          My{" "}
          <span className="blue-gradient_text drop-shadow font-semibold">
            Projects
          </span>
        </h1>
        <p className="mt-5" style={{ color: "#ECFFE8", textAlign: "justify" }}>
          I've embarked on several projects that hold a special place in my
          heart, each representing a significant milestone in my journey.I've
          gained valuable insights and honed my skills through hands-on
          experience and continuous learning.
        </p>

        <div className="flex flex-wrap my-20 gap-16">
          {projects.map((project, index) => {
            return (
              <div className="lg:w-[400px] w-full" key={index}>
                <div className="block-container w-12 h-12">
                  <div className={`btn-back rounded-xl ${project.theme}`} />
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img
                      src={project.iconUrl}
                      alt="project"
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col">
                  <h4
                    className="text-2xl font-poppins font-semibold"
                    style={{ color: "#ECFFE8" }}
                  >
                    {project.name}
                  </h4>
                  <p
                    className="mt-2 text-slate-500"
                    style={{ color: "#ECFFE8" }}
                  >
                    {project.description}
                  </p>
                  <div className="mt-5 flex itmes-center gap-2 font-poppins">
                    <Link
                      to={project.link}
                      target="_blank"
                      // ref="noopener noreferrer"
                      className="font-semibold text-blue-600"
                    >
                      Live Link
                    </Link>

                    <img
                      src={arrow}
                      alt="arrow"
                      className="w-4 h-4 object-contain mt-1 "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <hr className="border-slate-200" />

        <CTA />
      </section>
    </div>
  );
};

export default Projects;
