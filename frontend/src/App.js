import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ContactForm from "./ContactForm";

export default function App() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("");

  // === Animation du fond "audio wave" ===
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
      ctx.strokeStyle = "rgba(0, 255, 255, 0.65)";
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

  // === Suppression définitive du badge Emergent ===
  useEffect(() => {
    const badge = document.getElementById("emergent-badge");
    if (badge) badge.remove();
  }, []);

  return (
    <div className="app">
      {/* CANVAS */}
      <canvas ref={canvasRef} className="background-canvas" />

      {/* NAVBAR */}
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
          <h1 className="hero-title">WorldCreation</h1>
          <h2 className="hero-subtitle">Créateur d'Expériences Web</h2>
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
            src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=1200&h=900&fit=crop"
            alt="Workspace WorldCreation"
          />
        </div>
      </section>

      {/* À PROPOS */}
      <section id="about" className="about-section section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>À Propos</h2>
              <p>
                Passionné par la création digitale, je conçois des sites web et applications sur mesure
                qui reflètent l'identité unique de chaque projet.
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

          <div className="stats-grid">
            <div className="stat-item"><div className="stat-number">50+</div><div className="stat-label">Projets</div></div>
            <div className="stat-item"><div className="stat-number">30+</div><div className="stat-label">Clients</div></div>
            <div className="stat-item"><div className="stat-number">3+</div><div className="stat-label">Années</div></div>
            <div className="stat-item"><div className="stat-number">100%</div><div className="stat-label">Livrés</div></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section section">
        <div className="container">
          <div className="section-header">
            <h2>Mes Services</h2>
            <p>Je vous accompagne de la conception à la mise en ligne.</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Création de Sites Web</h3>
              <p>Sites vitrines élégants et performants.</p>
              <ul><li>Responsive</li><li>SEO</li><li>UI intuitive</li><li>Performance</li></ul>
            </div>
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Applications Web</h3>
              <p>Solutions sur mesure pour votre métier.</p>
              <ul><li>Dév. custom</li><li>UI moderne</li><li>Sécurité</li><li>Évolutif</li></ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🛒</div>
              <h3>E-commerce</h3>
              <p>Boutiques complètes avec paiement sécurisé.</p>
              <ul><li>Catalogue</li><li>Paiement</li><li>Commandes</li><li>Analytics</li></ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Maintenance & Support</h3>
              <p>Suivi continu pour garder votre site au top.</p>
              <ul><li>Mises à jour</li><li>Sauvegardes</li><li>Support</li><li>Monitoring</li></ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="portfolio-section section">
        <div className="container">
          <div className="section-header">
            <h2>Portfolio</h2>
            <p>Découvrez mes dernières créations.</p>
          </div>

          <div className="portfolio-grid">
            <div className="portfolio-item">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop" alt="Restaurant Le Gourmet" />
              <h3>Restaurant Le Gourmet</h3>
              <p>Site vitrine avec réservation en ligne.</p>
            </div>
            <div className="portfolio-item">
              <img src="https://images.unsplash.com/photo-1712898825439-3a18654c67d3?w=800&h=500&fit=crop" alt="Style Minimal" />
              <h3>Style Minimal Boutique</h3>
              <p>Boutique e-commerce moderne et fluide.</p>
            </div>
            <div className="portfolio-item">
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop" alt="Fit Coach" />
              <h3>Fit Coach Personal</h3>
              <p>Site professionnel pour coach sportif.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="blog-section section">
        <div className="container">
          <div className="section-header">
            <h2>Blog</h2>
            <p>Actualités, conseils et tendances du web.</p>
          </div>
          <div className="blog-grid">
            <article className="blog-item">
              <img src="https://images.unsplash.com/photo-1519217651866-847339e674d4?w=600&h=300&fit=crop" alt="Tendances Web 2024" />
              <h3>Les Tendances du Web Design 2024</h3>
              <p>De la simplicité à l’IA générative.</p>
            </article>
            <article className="blog-item">
              <img src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&h=300&fit=crop" alt="React vs Vue.js" />
              <h3>React vs Vue.js : Quel Framework ?</h3>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section section">
        <div className="container">
          <div className="section-header">
            <h2>Démarrons Votre Projet</h2>
            <p>Prêt à créer quelque chose d'exceptionnel ?</p>
          </div>
          <div className="contact-grid">
            <div className="contact-form-container">
              <h3>Parlons de votre projet</h3>
              <ContactForm />
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
