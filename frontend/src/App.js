import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ContactForm from "./ContactForm";

export default function App() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("");

  // === Fond animé audio ===
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 110;
    const bars = new Array(N).fill(0).map((_, i) => ({
      x: (i / N) * c.width,
      amp: 35 + Math.random() * 85,
      f: 0.0015 + Math.random() * 0.0015,
      ph: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = (t) => {
      ctx.fillStyle = "rgba(0, 20, 20, 0.08)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.save();
      ctx.strokeStyle = "rgba(0, 255, 255, 0.55)";
      ctx.lineWidth = 2;
      const mid = c.height / 2;
      bars.forEach((b) => {
        const x = (b.x / N) * c.width;
        const h = Math.sin(t * b.f + b.ph) * b.amp;
        ctx.beginPath();
        ctx.moveTo(x, mid - Math.abs(h));
        ctx.lineTo(x, mid + Math.abs(h));
        ctx.stroke();
        b.ph += 0.012;
      });
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // === Suppression Emergent ===
  useEffect(() => {
    const badge = document.getElementById("emergent-badge");
    if (badge) badge.remove();
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="background-canvas" />

      {/* NAV */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand"><h1>WorldCreation</h1></div>
          <div className="nav-menu">
            <a href="#about" className="nav-link">À Propos</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#contact" className="nav-link contact-btn">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">WorldCreation</h1>
          <h2 className="hero-subtitle">Créateur d'Expériences Web</h2>
          <p className="hero-description">Transformez vos idées en sites web exceptionnels.</p>
          <div className="hero-buttons">
            <a href="#portfolio" className="btn btn-primary">Voir mes réalisations</a>
            <a href="#contact" className="btn btn-secondary">Démarrer un projet</a>
          </div>
        </div>
      </section>

      {/* À PROPOS */}
      <section id="about" className="about-section section">
        <div className="container">
          <h2>À Propos</h2>
          <p>Passionné par la création digitale, je conçois des sites web et applications sur mesure.</p>
          <div className="contact-info">
            <p>📍 Île-de-France, France</p>
            <p>✉️ <a href="mailto:contact@worldcreation.fr">contact@worldcreation.fr</a></p>
            <p>📞 07 71 48 20 25</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section section">
        <div className="container">
          <h2>Mes Services</h2>
          <div className="services-grid">
            <div><h3>🌐 Création de sites web</h3><p>Sites vitrines modernes et performants.</p></div>
            <div><h3>⚡ Applications web</h3><p>Développement sur mesure.</p></div>
            <div><h3>🛒 E-commerce</h3><p>Boutiques avec paiement sécurisé.</p></div>
            <div><h3>🔧 Maintenance</h3><p>Suivi et support technique.</p></div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="portfolio-section section">
        <div className="container">
          <h2>Portfolio</h2>
          <div className="portfolio-grid">
            <div>
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800" alt="Le Gourmet" />
              <h3>Restaurant Le Gourmet</h3>
              <p>“Site magnifique, nos réservations ont bondi de 40% !” — Marie Dubois</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1712898825439-3a18654c67d3?w=800" alt="STYLE MINIMAL" />
              <h3>STYLE MINIMAL</h3>
              <p>“E-commerce au-delà de nos attentes. Design + fonctionnalités au top.” — Thomas Martin</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800" alt="FIT COACH" />
              <h3>FIT COACH Personal</h3>
              <p>Site dynamique pour coach sportif.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="blog-section section">
        <div className="container">
          <h2>Blog</h2>
          <div className="blog-grid">
            <div><h3>Les tendances du Web 2024</h3><p>De la simplicité à l’IA générative.</p></div>
            <div><h3>React vs Vue.js</h3><p>Comparatif entre frameworks modernes.</p></div>
            <div><h3>Optimiser la performance</h3><p>Conseils pour accélérer vos sites.</p></div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section section">
        <div className="container">
          <h2>Démarrons Votre Projet</h2>
          <ContactForm />
          <div className="contact-info">
            <p>✉️ contact@worldcreation.fr</p>
            <p>📞 07 71 48 20 25</p>
            <p>📍 Île-de-France, France</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 WorldCreation — Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
