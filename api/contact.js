import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Autoriser uniquement la méthode POST
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, projectType, message } = req.body;

  // Vérification des champs requis
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Champs manquants" });
  }

  try {
    // Configuration du transporteur SMTP OVH
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "ssl0.ovh.net",
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
      secure: process.env.SMTP_SECURE === "true" || true, // SSL activé
      auth: {
        user: process.env.SMTP_USER || process.env.MAIL_USER,
        pass: process.env.SMTP_PASS || process.env.MAIL_PASS,
      },
    });

    // Envoi du message
    await transporter.sendMail({
      from: `"WorldCreation" <${process.env.EMAIL_TO || process.env.SMTP_USER}>`, // ton adresse pro
      to: process.env.EMAIL_TO || "contact@worldcreation.fr", // destinataire (toi)
      replyTo: email, // adresse du client pour répondre
      subject: `Nouveau message de ${name} - ${projectType || "Projet"}`,
      text: `Nom: ${name}\nEmail: ${email}\nType de projet: ${projectType || "Non spécifié"}\n\nMessage:\n${message}`,
    });

    // Réponse en cas de succès
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return res.status(500).json({ ok: false, error: "Erreur d’envoi" });
  }
}
