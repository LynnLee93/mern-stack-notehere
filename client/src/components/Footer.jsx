import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer-container">
    <div className="footer-wrap">
    <footer>
      <a href="https://github.com/LynnLee93" target="_blank" rel="noreferrer"><i className="footer-logo fab fa-md fa-github"></i></a>
      <a href="https://www.linkedin.com/in/hellolynnlee/" target="_blank" rel="noreferrer"><i className="footer-logo fab fa-md fa-linkedin"></i></a>
      <a href="mailto:linglynn1221@gmail.com"><i className="footer-logo fas fa-md fa-envelope"></i></a>
      <p>Copyright ⓒ {year}</p>
    </footer>
    </div>
    </div>
  );
}

export default Footer;
