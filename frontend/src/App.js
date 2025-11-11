import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ContactForm from "./ContactForm"; // si ton fichier est dans src/ContactForm.jsx

export default function App() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("");

  // ===== Fond "audio wave" adouci & ralenti =====
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 120;
    const bars = new Array(N).fill(0).map((_, i) => ({
      x: (i / (N - 1)) * c.width,
      amp: 50 + Math.random() * 140,            // amplitude un peu plus douce
      f: 0.002 + Math.random() * 0.003,         // fréquence plus lente
      ph: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = (timeMs) => {
      // vitesse plus lente
      const t = timeMs * 0.001;

      // voile très léger au lieu de clearRect pour un effet "smooth"
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, c.width, c.height);

      // style d'onde adouci
      ctx.strokeStyle = "rgba(0, 255, 255, 0.7)";
      ctx.shadowColor = "rgba(0, 255, 255, 0.5)";
      ctx.shadowBlur = 6;
      ctx.lineWidth = 2;

      const mid = c.height / 2;
      bars.forEach((b, i) => {
        const x = (i / (N - 1)) * c.width;
        const h = Math.sin(t * b.f + b.ph) * b.amp;
        ctx.beginPath();
        ctx.moveTo(x, mid - Math.abs(h));
        ctx.lineTo(x, mid + Math.abs(h));
        ctx.stroke();
        b.ph += 0.01; // progression plus lente
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="app">
      {/* Canvas de fond */}
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

      {/* HERO centré */}
      <section className="hero">
        <div className="hero-inner">
          {/* Colonne texte */}
          <div className="hero-content">
            <h1 className="hero-title">worldcreation</h1>
            <h2 className="hero-subtitle">Créateur d'Expériences Web</h2>
            <p className="hero-tagline">Par le Peuple, Pour le Peuple</p>
            <p className="hero-description">
              Transformez vos idées en sites web exceptionnels
            </p>
            <div className="hero-buttons">
              <a href="#portfolio" className="btn btn-primary">Voir mes réalisations</a>
              <a href="#contact" className="btn btn-secondary">Démarrer un projet</a>
            </div>
          </div>

          {/* Colonne image */}
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=1200&h=900&fit=crop"
              alt="Workspace WorldCreation"
            />
          </div>
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
                applications sur mesure qui reflètent l'identité unique de chaque projet.
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
                src="https://images.unsplash.com/photo-1502810190503-8303352d0dd1?w=600&h=400&fit=crop"
                alt="À propos WorldCreation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (résumé) */}
      <section id="services" className="services-section section">
        <div className="container">
          <div className="section-header">
            <h2>Mes Services</h2>
            <p>De la conception à la mise en ligne.</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Création de Sites Web</h3>
              <p>Sites vitrines élégants et performants.</p>
              <ul>
                <li>Design responsive</li>
                <li>SEO optimisé</li>
                <li>Performance élevée</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Applications Web</h3>
              <p>Solutions sur mesure.</p>
              <ul>
                <li>Développement custom</li>
                <li>Sécurité renforcée</li>
                <li>Évolutivité</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🛒</div>
              <h3>E-commerce</h3>
              <p>Boutiques avec paiement sécurisé.</p>
              <ul>
                <li>Catalogue</li>
                <li>Commandes</li>
                <li>Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO (résumé) */}
      <section id="portfolio" className="portfolio-section section">
        <div className="container">
          <div className="section-header">
            <h2>Portfolio</h2>
            <p>Quelques réalisations récentes.</p>
          </div>
          {/* … garde tes cartes détaillées si tu veux, ancres intactes */}
        </div>
      </section>

      {/* BLOG (résumé) */}
      <section id="blog" className="blog-section section">
        <div className="container">
          <div className="section-header">
            <h2>Blog</h2>
            <p>Actualités, conseils et tendances du web.</p>
          </div>
          {/* … */}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section section">
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
              <div className="contact-info-card">
                <h3>Mes coordonnées</h3>
                <div className="contact-details">
                  <div className="contact-detail">✉️ contact@worldcreation.fr</div>
                  <div className="contact-detail">📞 07 71 48 20 25</div>
                  <div className="contact-detail">📍 Île-de-France, France</div>
                </div>
              </div>

              <div className="testimonials">
                <h3>Témoignages</h3>
                <div className="testimonial">
                  <div className="testimonial-header">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face"
                      alt="Marie Dubois"
                    />
                    <div>
                      <h4>Marie Dubois</h4>
                      <p>Propriétaire - Restaurant Le Gourmet</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    "Worldcreation a créé un site web magnifique parfaitement aligné à notre image."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
