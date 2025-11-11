import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          projectType: "",
          message: "",
        });
      } else {
        setStatus("error");
        console.error("Erreur:", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      setStatus("error");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Nom *
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        E-mail *
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Type de projet
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
        >
          <option value="">Sélectionnez...</option>
          <option value="vitrine">Site vitrine</option>
          <option value="ecommerce">E-commerce</option>
          <option value="app">Application web</option>
          <option value="autre">Autre</option>
        </select>
      </label>

      <label>
        Message *
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="btn btn-primary">
        Envoyer le message
      </button>

      {status === "sending" && (
        <p className="form-status sending">⏳ Envoi du message...</p>
      )}
      {status === "success" && (
        <p className="form-status success">✅ Message envoyé avec succès !</p>
      )}
      {status === "error" && (
        <p className="form-status error">
          ❌ Une erreur est survenue. Réessayez plus tard.
        </p>
      )}
    </form>
  );
}
