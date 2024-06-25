import React from "react";
import { socialLinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <footer className="footer font-poppins">
      <hr className="border-slate-200" />
      <div className="footer-container" style={{ color: "whitesmoke" }}>
        <p>
          &copy; 2024 <strong>Vijayaragavan</strong>. All rights reserved.
        </p>
        <div className="flex gap-3 justify-center items-center">
          {socialLinks.map((link, index) => {
            if (link.name === "Contact") {
              return (
                <button key={index} onClick={() => navigate(link.links)}>
                  <img
                    src={link.iconUrl}
                    alt={link.name}
                    className="w-12 h-12 object-contain"
                  />
                </button>
              );
            } else {
              return (
                <Link key={index} to={link.links} target="_blank">
                  <img
                    src={link.iconUrl}
                    alt={link.name}
                    className="w-12 h-12 object-contain"
                  />
                </Link>
              );
            }
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
