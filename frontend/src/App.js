import React, { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm";
import axios from "axios";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    const waves = [];

    for (let i = 0; i < 100; i++) {
      waves.push({
        x: i * 15,
        amplitude: Math.random() * 180 + 40,
        frequency: Math.random() * 0.018 + 0.008,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const animate = (time) => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(0, 255, 255, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(0, 255, 255, 0.4)";
      ctx.shadowBlur = 6;

      waves.forEach((wave) => {
        ctx.beginPath();
        const centerY = canvas.height / 2;
        const waveHeight = Math.sin(time * wave.frequency + wave.phase) * wave.amplitude;

        ctx.moveTo(wave.x, centerY - waveHeight);
        ctx.lineTo(wave.x, centerY + waveHeight);
        ctx.stroke();

        wave.phase += 0.02;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="app">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <h1>WorldCreation</h1>
          </div>
          <div className="nav-menu">
            <a href="#about" className="nav-link">À Propos</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#contact" className="nav-link contact-btn">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-center">
          <div className="hero-text">
            <h1 className="hero-title">WorldCreation</h1>
            <h2 className="hero-subtitle">Créateur d'Expériences Web</h2>
            <p className="hero-tagline">Par le Peuple, Pour le Peuple</p>
            <p className="hero-description">
              Transformez vos idées en sites web exceptionnels.
            </p>
            <div className="hero-buttons">
              <a href="#portfolio" className="btn btn-primary">Voir mes réalisations</a>
              <a href="#contact" className="btn btn-secondary">Démarrer un projet</a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=1000&h=800&fit=crop"
              alt="Workspace WorldCreation"
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section">
        <div className="container">
          <h2>À Propos</h2>
          <p>
            Passionné par la création digitale, je conçois des sites web et applications sur mesure
            qui reflètent l'identité unique de chaque projet.
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="services-section">
        <div className="container">
          <h2>Mes Services</h2>
          <p>De la conception à la mise en ligne, je vous accompagne dans chaque étape.</p>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2>Portfolio</h2>
            <p>Quelques réalisations récentes.</p>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section id="blog" className="blog-section">
        <div className="container">
          <div className="section-header">
            <h2>Blog</h2>
            <p>Actualités, conseils et tendances du développement web.</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Démarrons Votre Projet</h2>
            <p>Prêt à créer quelque chose d'exceptionnel ensemble ?</p>
          </div>

          <div className="contact-grid">
            <div className="contact-form-container">
              <h3>Parlons de votre projet</h3>
              <ContactForm />
            </div>

            <div className="contact-info-container">
              <h3>Mes coordonnées</h3>
              <div className="contact-details">
                <div><span className="icon">✉️</span> contact@worldcreation.fr</div>
                <div><span className="icon">📞</span> 07 71 48 20 25</div>
                <div><span className="icon">📍</span> Île-de-France, France</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <h3>WorldCreation</h3>
              <p>Créateur d'Expériences Web</p>
            </div>
            <p>&copy; 2024 WorldCreation. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
