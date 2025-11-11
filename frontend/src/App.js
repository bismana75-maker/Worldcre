import React, { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import "./App.css";

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bars = [];
    for (let i = 0; i < 150; i++) {
      bars.push({
        x: i * 12,
        height: Math.random() * 180 + 80,
        speed: Math.random() * 0.03 + 0.01,
      });
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bars.forEach((bar, i) => {
        const h = bar.height + Math.sin(t * bar.speed + i) * 25;
        const y = canvas.height / 2 - h / 2;
        const grad = ctx.createLinearGradient(0, y, 0, y + h);
        grad.addColorStop(0, "rgba(0, 200, 255, 0.25)");
        grad.addColorStop(1, "rgba(0, 100, 200, 0.10)");
        ctx.fillStyle = grad;
        ctx.fillRect(bar.x, y, 6, h);
      });
      requestAnimationFrame(draw);
    };
    draw(0);
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-brand">WorldCreation</h1>
          <div className="nav-menu">
            <a href="#about">À Propos</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#blog">Blog</a>
            <a href="#contact" className="contact-btn">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-center">
          <div className="hero-text">
            <h1 className="animated-title">World Creation</h1>
            <h2>Créateur d'Expériences Web</h2>
            <p className="tagline">Par le Peuple, Pour le Peuple</p>
            <p className="desc">
              Transformez vos idées en sites web exceptionnels et durables.
            </p>
            <div className="hero-buttons">
              <a href="#portfolio" className="btn btn-primary">
                Voir mes réalisations
              </a>
              <a href="#contact" className="btn btn-secondary">
                Démarrer un projet
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=1000&h=800&fit=crop"
              alt="World Creation workspace"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="container">
          <h2>À Propos</h2>
          <p>
            Passionné par la création digitale, je conçois des sites web et
            applications sur mesure qui reflètent l'identité unique de chaque
            projet.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <h2>Mes Services</h2>
          <p>
            De la conception à la mise en ligne, je vous accompagne à chaque
            étape de votre projet digital.
          </p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <h2>Portfolio</h2>
          <p>Découvrez mes réalisations récentes.</p>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="blog-section">
        <div className="container">
          <h2>Blog</h2>
          <p>Actualités, conseils et tendances du développement web.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Contact</h2>
          <p>Discutons de votre projet dès aujourd’hui.</p>
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 World Creation. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
