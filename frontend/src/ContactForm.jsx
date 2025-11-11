import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Site vitrine");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState({ type: "idle", text: "" }); // idle | loading | ok | error

  const handleSubmit = async (e) => {
    e.preventDefault();

    // petite validation côté client
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Merci de remplir les champs obligatoires." });
      return;
    }

    try {
      setStatus({ type: "loading", text: "Envoi en cours..." });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, projectType, message }),
      });

      const data = await res.json();

      if (res.ok && data?.ok) {
        setStatus({ type: "ok", text: "Message envoyé avec succès !" });
        // reset du formulaire
        setName("");
        setEmail("");
        setProjectType("Site vitrine");
        setMessage("");
      } else {
        setStatus({
          type: "error",
          text: data?.error || "Échec de l’envoi. Réessayez.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        text: "Impossible de contacter le serveur. Réessayez.",
      });
    }
  };

  return (
    <>
      <form className="form contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom *</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>E-mail *</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Type de projet</label>
          <select
            className="select"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
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
            className="textarea"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Envoi..." : "Envoyer le message"}
        </button>
      </form>

      {status.type === "ok" && <div className="note note-success">{status.text}</div>}
      {status.type === "error" && <div className="note note-error">{status.text}</div>}
    </>
  );
}
