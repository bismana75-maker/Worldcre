import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Site vitrine",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.ok) {
      setStatus("✅ Message envoyé avec succès !");
      setForm({ name: "", email: "", projectType: "Site vitrine", message: "" });
    } else {
      setStatus("❌ Erreur : " + (data.error || "Échec de l’envoi"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Votre nom"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <select name="projectType" value={form.projectType} onChange={handleChange}>
        <option>Site vitrine</option>
        <option>E-commerce</option>
        <option>Application web</option>
        <option>Maintenance</option>
        <option>Autre</option>
      </select>
      <textarea
        name="message"
        placeholder="Votre message"
        value={form.message}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Envoyer</button>
      <p>{status}</p>
    </form>
  );
}
