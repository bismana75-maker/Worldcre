import React, { useEffect, useRef } from 'react';
import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Audio wave animation
    let animationId;
    const waves = [];

    // Create wave data
    for (let i = 0; i < 100; i++) {
      waves.push({
        x: i * 15,
        amplitude: Math.random() * 200 + 50,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const animate = (time) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw audio waves
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 10;

      waves.forEach((wave) => {
        ctx.beginPath();
        const centerY = canvas.height / 2;
        const waveHeight = Math.sin(time * wave.frequency + wave.phase) * wave.amplitude;

        ctx.moveTo(wave.x, centerY - waveHeight);
        ctx.lineTo(wave.x, centerY + waveHeight);
        ctx.stroke();

        // Update wave properties for animation
        wave.phase += 0.02;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
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
                Passionné par la création digitale, je conçois des sites web et applications sur mesure qui reflètent l'identité unique de chaque projet. Avec WorldCreation, donnez vie à vos ambitions numériques.
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
            <div className="portfolio-item">
              <div className="portfolio-image">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop"
                  alt="Restaurant Le Gourmet"
                />
                <div className="portfolio-overlay">
                  <button className="btn btn-view">Voir les détails</button>
                </div>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category">Site Vitrine Premium</span>
                <h3>Restaurant Le Gourmet</h3>
                <p>
                  Site web élégant pour restaurant gastronomique avec système de réservation en ligne, menu interactif et galerie photos.
                  Design luxueux rouge/or/noir.
                </p>
                <div className="portfolio-footer">
                  <div className="portfolio-tech">
                    <span>React</span>
                    <span>CSS3</span>
                    <span>JavaScript</span>
                  </div>
                  <span className="portfolio-year">2024</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item">
              <div className="portfolio-image">
                <img
                  src="https://images.unsplash.com/photo-1712898825439-3a18654c67d3?w=800&h=500&fit=crop"
                  alt="STYLE MINIMAL Boutique"
                />
                <div className="portfolio-overlay">
                  <button className="btn btn-view">Voir les détails</button>
                </div>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category">E-commerce</span>
                <h3>STYLE MINIMAL Boutique</h3>
                <p>
                  Boutique en ligne moderne pour vêtements minimalistes avec panier fonctionnel, filtres produits et design épuré noir/blanc/pastel.
                </p>
                <div className="portfolio-footer">
                  <div className="portfolio-tech">
                    <span>React</span>
                    <span>LocalStorage</span>
                    <span>CSS Grid</span>
                  </div>
                  <span className="portfolio-year">2024</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item">
              <div className="portfolio-image">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop"
                  alt="FIT COACH Personal"
                />
                <div className="portfolio-overlay">
                  <button className="btn btn-view">Voir les détails</button>
                </div>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category">Site Professionnel</span>
                <h3>FIT COACH Personal</h3>
                <p>
                  Site dynamique pour coach sportif avec présentation services, tarifs et planning. Design énergique vert/bleu.
                </p>
                <div className="portfolio-footer">
                  <div className="portfolio-tech">
                    <span>React</span>
                    <span>CSS3</span>
                    <span>Responsive</span>
                  </div>
                  <span className="portfolio-year">2024</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item">
              <div className="portfolio-image">
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop"
                  alt="PRESTIGE IMMO Agence"
                />
                <div className="portfolio-overlay">
                  <button className="btn btn-view">Voir les détails</button>
                </div>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category">Site Corporate</span>
                <h3>PRESTIGE IMMO Agence</h3>
                <p>
                  Site professionnel pour agence immobilière avec galerie de biens, recherche et design blanc/bleu corporate.
                </p>
                <div className="portfolio-footer">
                  <div className="portfolio-tech">
                    <span>React</span>
                    <span>CSS Grid</span>
                    <span>JavaScript</span>
                  </div>
                  <span className="portfolio-year">2024</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item">
              <div className="portfolio-image">
                <img
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=500&fit=crop"
                  alt="LENS STUDIO Portfolio"
                />
                <div className="portfolio-overlay">
                  <button className="btn btn-view">Voir les détails</button>
                </div>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category">Portfolio Créatif</span>
                <h3>LENS STUDIO Portfolio</h3>
                <p>
                  Portfolio artistique pour photographe avec galerie interactive, tarifs et design sombre élégant.
                </p>
                <div className="portfolio-footer">
                  <div className="portfolio-tech">
                    <span>React</span>
                    <span>CSS3</span>
                    <span>JavaScript</span>
                  </div>
                  <span className="portfolio-year">2024</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item">
              <div className="portfolio-image">
                <img
                  src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=500&fit=crop"
                  alt="WorldCreation Portfolio"
                />
                <div className="portfolio-overlay">
                  <button className="btn btn-view">Voir les détails</button>
                </div>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category">Site Personnel</span>
                <h3>WorldCreation Portfolio</h3>
                <p>
                  Mon portfolio personnel présentant mes réalisations, services et expertise en développement web.
                </p>
                <div className="portfolio-footer">
                  <div className="portfolio-tech">
                    <span>React</span>
                    <span>CSS3</span>
                    <span>Node.js</span>
                  </div>
                  <span className="portfolio-year">2024</span>
                </div>
              </div>
            </div>
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
            <article className="blog-item">
              <div className="blog-image">
                <img
                  src="https://images.unsplash.com/photo-1519217651866-847339e674d4?w=600&h=300&fit=crop"
                  alt="Tendances Web Design 2024"
                />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">Design</span>
                  <span className="blog-time">5 min • 14/03/2024</span>
                </div>
                <h3>Les Tendances du Web Design en 2024</h3>
                <p>
                  Découvrez les dernières tendances qui façonnent l'avenir du design web : from minimalisme à l'IA générative.
                </p>
                <a href="#" className="blog-link">Lire la suite →</a>
              </div>
            </article>

            <article className="blog-item">
              <div className="blog-image">
                <img
                  src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&h=300&fit=crop"
                  alt="React vs Vue.js"
                />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">Développement</span>
                  <span className="blog-time">8 min • 09/03/2024</span>
                </div>
                <h3>React vs Vue.js : Quel Framework Choisir ?</h3>
                <p>
                  Comparatif détaillé entre React et Vue.js pour vous aider à faire le bon choix pour votre prochain projet.
                </p>
                <a href="#" className="blog-link">Lire la suite →</a>
              </div>
            </article>

            <article className="blog-item">
              <div className="blog-image">
                <img
                  src="https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?w=600&h=300&fit=crop"
                  alt="Performance Web"
                />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-category">Performance</span>
                  <span className="blog-time">6 min • 04/03/2024</span>
                </div>
                <h3>Optimiser les Performances de votre Site Web</h3>
                <p>
                  Techniques avancées pour améliorer la vitesse de chargement et l'expérience utilisateur de votre site.
                </p>
                <a href="#" className="blog-link">Lire la suite →</a>
              </div>
            </article>
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
              <form className="contact-form">
                <div className="form-group">
                  <label>Nom *</label>
                  <input type="text" required />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" required />
                </div>

                <div className="form-group">
                  <label>Type de projet</label>
                  <select>
                    <option>Site vitrine</option>
                    <option>E-commerce</option>
                    <option>Application web</option>
                    <option>Maintenance</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea rows={4} required></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Envoyer le message</button>
              </form>
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
            <p>&copy; 2024 WorldCreation. Tous droits réservés.</p>
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
