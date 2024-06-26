import React, { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Fox from "../models/Fox.jsx";
import StarsCanvas from "../models/Stars.jsx";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { showAlert, alert, hideAlert } = useAlert();
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm((currForm) => {
      return { ...currForm, [name]: value };
    });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");
    emailjs
      .send(
        "service_59payva",
        "template_wte6iu9",
        {
          from_name: form.name,
          to_name: "Vijayaragavan",
          from_email: form.email,
          to_email: "vijayaragavankts@gmail.com",
          message: form.message,
        },
        "Te3VLj2v179L0p9Ch"
      )
      .then(() => {
        setLoading(false);
        showAlert({
          show: true,
          text: "Thank you for your message",
          type: "success",
        });
        setTimeout(() => {
          hideAlert(false);
          setCurrentAnimation("idle");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        setCurrentAnimation("idle");
        console.log(error);
        showAlert({
          show: true,
          text: "I didn't received your message",
          type: "danger",
        });
      });
  };

  return (
    <div className="relative z-0 ">
      <StarsCanvas />
      <section className="relative flex lg:flex-row flex-col max-container">
        {alert.show && <Alert {...alert} />}

        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1 className="head-text" style={{ color: "white" }}>
            Get in Touch
          </h1>

          <form
            className="w-full flex flex-col gap-7 mt-14"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <label
              className="text-black-500 font-semibold"
              style={{ color: "white" }}
            >
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Jack"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label
              className="text-black-500 font-semibold"
              style={{ color: "white" }}
            >
              Email
              <input
                type="email"
                name="email"
                className="input"
                placeholder="jack@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label
              className="text-black-500 font-semibold"
              style={{ color: "white" }}
            >
              Your Message
              <textarea
                type="text"
                name="message"
                rows="4"
                className="textarea"
                placeholder="Write your thoughts here..."
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000,
            }}
          >
            <directionalLight position={[0, 0, 1]} intensity={2.5} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 10, 0]} intensity={2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />

            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.629, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </div>
  );
};

export default Contact;
