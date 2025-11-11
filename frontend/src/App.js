import React, { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import "./App.css";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Taille du canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Animation "audio waves"
    let animationId;
    const waves = [];
    for (let i = 0; i < 100; i++) {
      waves.push({
        x: i * 15,
        amplitude: Math.random() * 200 + 50,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const animate = (time) => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 10;

      const centerY = canvas.height / 2;
      waves.forEach((wave) => {
        ctx.beginPath();
        const h = Math.sin(time * wave.frequency + wave.phase) * wave.amplitude;
        ctx.moveTo(wave.x, centerY - h);
        ctx.lineTo(wave.x, centerY + h);
        ctx.stroke();
        wave.phase += 0.02;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="app">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Header Navigation */}
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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Worldcreation</h1>
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
            src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=800&h=600&fit=crop"
            alt="Workspace WorldCreation"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>À Propos</h2>
              <p>
                Passionné par la création digitale, je conçois des sites web et applications sur mesure
                qui reflètent l'identité unique de chaque projet. Avec WorldCreation, donnez vie à vos
                ambitions numériques.
              </p>

              <div className="contact-info">
                <div className="contact-item">
                  <span className="icon">📍</span>
                  <span>Île-de-France, France</span>
                </div>
                <div className="contact-item">
                  <span className="icon">✉️</span>
                  <a href="mailto:contact@worldcreation.fr">contact@worldcreation.fr</a>
                </div>
                <div className="contact-item">
                  <span className="icon">✅</span>
                  <span className="status">Disponible pour nouveaux projets</span>
                </div>
              </div>
            </div>

            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1502810190503-8303352d0dd1?w=600&h=400&fit=crop"
                alt="À propos WorldCreation"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projets Réalisés</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">30+</div>
              <div className="stat-label">Clients Satisfaits</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Années d'Expérience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Projets Livrés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Mes Services</h2>
            <p>Je vous accompagne dans tous vos projets web, de la conception à la mise en ligne.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Création de Sites Web</h3>
              <p>Sites vitrines élégants et performants pour valoriser votre activité en ligne.</p>
              <ul>
                <li>Design responsive</li>
                <li>SEO optimisé</li>
                <li>Interface intuitive</li>
                <li>Performance élevée</li>
              </ul>
              <div className="service-price">
                <span className="price">À partir de 800€</span>
                <button className="btn btn-service">Demander un devis</button>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Applications Web</h3>
              <p>Solutions sur mesure adaptées à vos besoins métier spécifiques.</p>
              <ul>
                <li>Développement custom</li>
                <li>Interface moderne</li>
                <li>Sécurité renforcée</li>
                <li>Évolutivité</li>
              </ul>
              <div className="service-price">
                <span className="price">Sur devis</span>
                <button className="btn btn-service">Demander un devis</button>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">🛒</div>
              <h3>E-commerce</h3>
              <p>Boutiques en ligne complètes avec système de paiement intégré.</p>
              <ul>
                <li>Catalogue produits</li>
                <li>Paiement sécurisé</li>
                <li>Gestion commandes</li>
                <li>Analytics</li>
              </ul>
              <div className="service-price">
                <span className="price">À partir de 1200€</span>
                <button className="btn btn-service">Demander un devis</button>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Maintenance & Support</h3>
              <p>Accompagnement continu pour maintenir votre site à jour et performant.</p>
              <ul>
                <li>Mises à jour</li>
                <li>Sauvegardes</li>
                <li>Support technique</li>
                <li>Monitoring</li>
              </ul>
              <div className="service-price">
                <span className="price">À partir de 50€/mois</span>
                <button className="btn btn-service">Demander un devis</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2>Portfolio</h2>
            <p>Découvrez mes dernières créations et projets réalisés pour mes clients.</p>
          </div>

          <div className="portfolio-grid">
            {/* … tes cartes portfolio … */}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blog-section">
        <div className="container">
          <div className="section-header">
            <h2>Blog</h2>
            <p>Actualités, conseils et tendances du développement web.</p>
          </div>

          <div className="blog-grid">
            {/* … tes articles … */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Démarrons Votre Projet</h2>
            <p>Prêt à créer quelque chose d'exceptionnel ensemble ?</p>
          </div>

          <div className="contact-grid">
            <div className="contact-form-container">
              <h3>Parlons de votre projet</h3>
              {/* Formulaire branché sur /api/contact */}
              <ContactForm />
            </div>

            <div className="contact-info-container">
              <div className="contact-info-card">
                <h3>Mes coordonnées</h3>
                <div className="contact-details">
                  <div className="contact-detail">
                    <span className="icon">✉️</span>
                    <a href="mailto:contact@worldcreation.fr">contact@worldcreation.fr</a>
                  </div>
                  <div className="contact-detail">
                    <span className="icon">📞</span>
                    <span>07 71 48 20 25</span>
                  </div>
                  <div className="contact-detail">
                    <span className="icon">📍</span>
                    <span>Île-de-France, France</span>
                  </div>
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
                    "Worldcreation a créé un site web magnifique qui reflète parfaitement l'élégance de notre restaurant.
                    Nos réservations ont augmenté de 40% depuis le lancement !"
                  </p>
                </div>

                <div className="testimonial">
                  <div className="testimonial-header">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      alt="Thomas Martin"
                    />
                    <div>
                      <h4>Thomas Martin</h4>
                      <p>Fondateur - STYLE MINIMAL</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    "Un travail remarquable ! Le site e-commerce développé par WorldCreation a dépassé toutes nos attentes.
                    Design impeccable et fonctionnalités parfaites."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>WorldCreation</h3>
              <p>Créateur d'Expériences Web</p>
            </div>

            <div className="footer-contacts">
              <a href="mailto:contact@worldcreation.fr">contact@worldcreation.fr</a>
              <span></span>
              <span>07 71 48 20 25</span>
              <span></span>
              <span>Île-de-France, France</span>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2024 WorldCreation. Tous droits réservés.</p>
            <p className="footer-credit">
              Développé par <strong>WORLD CREATION</strong>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
