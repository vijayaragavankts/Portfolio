import React from "react";
import resumePDF from "../assets/resume/Vijayaragavan.pdf";
import { FaDownload } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="cta">
      <p className="cta-text" style={{ color: "whitesmoke" }}>
        Ready to hire me?
        <br className="sm:block hidden" style={{ color: "whitesmoke" }} />
        Delve into my resume and let's get started!
      </p>
      <a href={resumePDF} download="Vijayaragavan.pdf" className="btn">
        <FaDownload className="inline-block w-4 h-4 mr-2" /> Resume
      </a>
    </section>
  );
};

export default CTA;
