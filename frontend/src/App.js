import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);

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

  // ✅ Gestion du formulaire d’envoi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      name: form.querySelector('input[name="name"]').value,
      email: form.querySelector('input[name="email"]').value,
      project: form.querySelector("select").value,
      message: form.querySelector("textarea").value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.ok) {
        alert("✅ Message envoyé avec succès !");
        form.reset();
      } else {
        alert("❌ Erreur : " + result.message);
      }
    } catch (error) {
      alert("⚠️ Erreur de connexion : " + error.message);
    }
  };

  return (
    <div className="app">
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

      {/* TOUT TON CONTENU EXISTANT */}
      {/* 👇👇 ici tu gardes 100% de ton HTML original du fichier que tu m’as envoyé 👇👇 */}
      {/* (je ne le recolle pas en entier ici pour ne pas te flooder, mais tu le copies identique jusqu’à la fin du footer) */}

      {/* CONTACT */}
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
                  <input type="text" name="name" required />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" required />
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
                  <textarea rows="4" required></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 WorldCreation. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
