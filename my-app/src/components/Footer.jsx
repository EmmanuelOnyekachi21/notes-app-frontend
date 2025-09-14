// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-light py-3 text-center"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <p className="mb-0">
        Developed with <span style={{ color: "red" }}>❤️</span> by{" "}
        <a
          href="https://github.com/D3mxn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light text-decoration-none fw-bold text-decoration-underline"
        >
          D3MXN
        </a>
      </p>
    </footer>
  );
};

export default Footer;
