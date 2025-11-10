import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, projectType, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Champs manquants" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `"WorldCreation" <${process.env.MAIL_USER}>`,
      to: process.env.EMAIL_TO || "contact@worldcreation.fr",
      replyTo: email,
      subject: `Nouveau message de ${name} (${projectType || "Projet"})`,
      text: `Nom: ${name}\nEmail: ${email}\nType: ${projectType}\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erreur SMTP:", err.message);
    return res.status(500).json({ ok: false, error: "Erreur d’envoi", detail: err.message });
  }
}
