import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ContactForm from "./ContactForm";

export default function App() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("");

  // === Fond "audio wave" adouci ===
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
      amp: 35 + Math.random() * 85,           // amplitude plus douce
      f: 0.0015 + Math.random() * 0.0015,     // vitesse plus lente
      ph: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = (t) => {
      // légère “traînée” sombre, moins agressive
      ctx.fillStyle = "rgba(0, 20, 20, 0.08)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.save();
      ctx.strokeStyle = "rgba(0, 255, 255, 0.65)"; // cyan moins vif
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(0, 255, 255, 0.35)";
      ctx.shadowBlur = 4;

      const mid = c.height / 2;
      bars.forEach((b, i) => {
        const x = (i / N) * c.width;
        const h = Math.sin(t * b.f + b.ph) * b.amp;

        ctx.beginPath();
        ctx.moveTo(x, mid - Math.abs(h));
        ctx.lineTo(x, mid + Math.abs(h));
        ctx.stroke();

        b.ph += 0.012; // phase plus lente
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

  // === Suppression du badge Emergent ===
  useEffect(() => {
    const badge = document.getElementById("emergent-badge");
    if (badge) badge.remove();
  }, []);

  return (
    <div className="app">
      {/* Canvas en fond */}
      <canvas ref={canvasRef} className="background-canvas" />

      {/* NAV */}
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

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">worldcreation</h1>
          <h2 className="hero-subtitle">Créateur d'Expériences Web</h2>
          <p className="hero-description">
            Transformez vos idées en sites web exceptionnels
          </p>
          <div className="hero-buttons">
            <a href="#portfolio" className="btn btn-primary">Voir mes réalisations</a>
            <a href="#contact" className="btn btn-secondary">Démarrer un projet</a>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=1200&h=900&fit=crop"
            alt="Workspace WorldCreation"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>À Propos</h2>
              <p>
                Passionné par la création digitale, je conçois des sites web et
                applications sur mesure qui reflètent l'identité unique de
                chaque projet.
              </p>

              <div className="contact-info">
                <div className="contact-item">📍 Île-de-France, France</div>
                <div className="contact-item">
                  ✉️ <a href="mailto:contact@worldcreation.fr">contact@worldcreation.fr</a>
                </div>
                <div className="contact-item">✅ Disponible pour nouveaux projets</div>
              </div>
            </div>

            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1502810190503-8303352d0dd1?w=1200&h=800&fit=crop"
                alt="À propos WorldCreation"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-item"><div className="stat-number">50+</div><div className="stat-label">Projets</div></div>
            <div className="stat-item"><div className="stat-number">30+</div><div className="stat-label">Clients</div></div>
            <div className="stat-item"><div className="stat-number">3+</div><div className="stat-label">Années</div></div>
            <div className="stat-item"><div className="stat-number">100%</div><div className="stat-label">Livrés</div></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      {/* (le reste de ton code inchangé) */}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3>WorldCreation</h3>
            <p>Créateur d'Expériences Web</p>
          </div>
          <div className="footer-contacts">
            <a href="mailto:contact@worldcreation.fr">contact@worldcreation.fr</a>
            <span>•</span>
            <span>07 71 48 20 25</span>
            <span>•</span>
            <span>Île-de-France, France</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 WorldCreation — Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
