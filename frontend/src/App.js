import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Site vitrine",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Fonction pour mettre à jour les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour envoyer le message
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("✅ Message envoyé avec succès !");
        setFormData({
          name: "",
          email: "",
          type: "Site vitrine",
          message: "",
        });
      } else {
        setStatus("⚠️ Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Une erreur s'est produite. Vérifie ta connexion.");
    }
  };

  return (
    <div className="App">
      {/* === HEADER === */}
      <header className="header">
        <div className="container">
          <h1>WorldCreation</h1>
          <nav className="navbar">
            <a href="#about">À propos</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#blog">Blog</a>
            <a href="#contact" className="btn-contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* === SECTION CONTACT === */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Parlons de votre projet</h2>
          <div className="contact-content">
            {/* FORMULAIRE */}
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
                  name="type"
                  value={formData.type}
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
                  rows="4"
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

            {/* COORDONNÉES */}
            <div className="contact-info">
              <h3>Mes coordonnées</h3>
              <p>
                📧{" "}
                <a href="mailto:contact@worldcreation.fr">
                  contact@worldcreation.fr
                </a>
              </p>
              <p>📞 07 71 48 20 25</p>
              <p>📍 Île-de-France, France</p>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>WorldCreation</h3>
              <p>Créateur d’expériences web</p>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2024 WorldCreation. Tous droits réservés.</p>
              <p className="footer-credit">
                Développé par <strong>WORLD CREATION</strong>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
