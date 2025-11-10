import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);

  // === Animation de fond ===
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

      waves.forEach((wave) => {
        ctx.beginPath();
        const centerY = canvas.height / 2;
        const waveHeight =
          Math.sin(time * wave.frequency + wave.phase) * wave.amplitude;

        ctx.moveTo(wave.x, centerY - waveHeight);
        ctx.lineTo(wave.x, centerY + waveHeight);
        ctx.stroke();

        wave.phase += 0.02;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // === Fonction d'envoi du formulaire ===
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      projectType: e.target.projectType.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Message envoyé avec succès !");
        e.target.reset();
      } else {
        alert(
          "❌ Erreur lors de l’envoi. Réessaie ou contacte-moi directement à contact@worldcreation.fr"
        );
      }
    } catch (err) {
      alert("⚠️ Impossible d’envoyer le message. Vérifie ta connexion internet.");
    }
  }

  // === Rendu principal ===
  return (
    <div className="app">
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Navbar */}
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

      {/* Section Contact */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Démarrons Votre Projet</h2>
            <p>Prêt à créer quelque chose d'exceptionnel ensemble ?</p>
          </div>

          <div className="contact-grid">
            {/* === FORMULAIRE DE CONTACT === */}
            <div className="contact-form-container">
              <h3>Parlons de votre projet</h3>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nom *</label>
                  <input type="text" name="name" required />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" required />
                </div>

                <div className="form-group">
                  <label>Type de projet</label>
                  <select name="projectType">
                    <option>Site vitrine</option>
                    <option>E-commerce</option>
                    <option>Application web</option>
                    <option>Maintenance</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" rows="4" required></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* === MES COORDONNÉES === */}
            <div className="contact-info-container">
              <div className="contact-info-card">
                <h3>Mes coordonnées</h3>
                <div className="contact-details">
                  <div className="contact-detail">
                    <span className="icon">✉️</span>
                    <span>contact@worldcreation.fr</span>
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
              <a href="mailto:contact@worldcreation.fr">
                contact@worldcreation.fr
              </a>
              <span>07 71 48 20 25</span>
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
