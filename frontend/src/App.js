import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Site vitrine",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw audio waves
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

  // Form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("✅ Message envoyé avec succès !");
        setFormData({
          name: "",
          email: "",
          projectType: "Site vitrine",
          message: "",
        });
      } else {
        const err = await response.text();
        console.error("Erreur serveur :", err);
        setStatus("❌ Erreur lors de l’envoi. Réessayez.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setStatus("❌ Impossible de contacter le serveur.");
    }
  };

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

      {/* ... Toutes tes sections About, Services, Portfolio, Blog (inchangées) ... */}

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
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nom *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Type de projet</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option>Site vitrine</option>
                    <option>E-commerce</option>
                    <option>Application web</option>
                    <option>Maintenance</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Envoyer le message
                </button>

                {status && <p className="form-status">{status}</p>}
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
              <span>07 71 48 20 25</span>
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
