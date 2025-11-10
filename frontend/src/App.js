import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);

  // 🎨 Animation du fond
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const waves = Array.from({ length: 100 }, (_, i) => ({
      x: i * 15,
      amplitude: Math.random() * 200 + 50,
      frequency: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    const animate = (time) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
        wave.phase += 0.02;
      });

      requestAnimationFrame(animate);
    };

    animate(0);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // 🧭 Scroll fluide vers les ancres (#about, #contact, etc.)
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace('#', '');
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  // 📩 Fonction d’envoi du message via ton API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      name: form.querySelector('input[type="text"]').value,
      email: form.querySelector('input[type="email"]').value,
      project: form.querySelector('select').value,
      message: form.querySelector('textarea').value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.ok) {
        alert('✅ Message envoyé avec succès !');
        form.reset();
      } else {
        alert('❌ Erreur : ' + result.message);
      }
    } catch (err) {
      alert('⚠️ Une erreur est survenue : ' + err.message);
    }
  };

  return (
    <div className="app">
      {/* CANVAS FOND */}
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

      {/* À PROPOS */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>À Propos</h2>
              <p>
                Passionné par la création digitale, je conçois des sites web et applications sur mesure qui reflètent l'identité unique de chaque projet.
              </p>
            </div>
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1502810190503-8303352d0dd1?w=600&h=400&fit=crop"
                alt="À propos"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <h2>Mes Services</h2>
          <p>Je vous accompagne dans tous vos projets web, de la conception à la mise en ligne.</p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <h2>Portfolio</h2>
          <p>Découvrez mes dernières créations et projets réalisés pour mes clients.</p>
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
          <h2>Démarrons Votre Projet</h2>
          <p>Prêt à créer quelque chose d'exceptionnel ensemble ?</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Nom *</label>
            <input type="text" required />

            <label>Email *</label>
            <input type="email" required />

            <label>Type de projet</label>
            <select>
              <option>Site vitrine</option>
              <option>E-commerce</option>
              <option>Application web</option>
              <option>Maintenance</option>
              <option>Autre</option>
            </select>

            <label>Message *</label>
            <textarea rows={4} required></textarea>

            <button type="submit" className="btn btn-primary">Envoyer le message</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 WorldCreation. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
