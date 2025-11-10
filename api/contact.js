import nodemailer from "nodemailer";

// --- DEBUG: permet /api/contact?debug=1 pour tester la connexion SMTP ---
export default async function handler(req, res) {
  // --- route de test rapide ---
  if (req.method === "GET" && req.query.debug === "1") {
    try {
      const transporter = makeTransport();
      await transporter.verify();
      return res.status(200).json({
        ok: true,
        note: "Connexion SMTP OK. Les variables d'env sont bien lues.",
        host: process.env.MAIL_HOST,
        user: process.env.MAIL_USER,
      });
    } catch (e) {
      return res.status(500).json({
        ok: false,
        where: "transporter.verify",
        message: e?.message || String(e),
      });
    }
  }

  // --- flux normal POST (formulaire) ---
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, projectType, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Champs manquants" });
  }

  try {
    const transporter = makeTransport();

    await transporter.sendMail({
      // IMPORTANT (OVH) : l’adresse d’expédition doit ÊTRE la boîte authentifiée
      from: `"WorldCreation" <${process.env.MAIL_USER}>`,
      to: process.env.EMAIL_TO || "contact@worldcreation.fr",
      subject: `Nouveau message de ${name} — ${projectType || "Projet"}`,
      replyTo: email, // tu pourras répondre au visiteur
      text:
        `Nom: ${name}\n` +
        `Email: ${email}\n` +
        `Type: ${projectType || "-"}\n\n` +
        `${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: "Erreur d’envoi",
      message: e?.message || String(e),
    });
  }
}

// Transport SMTP (OVH) : essaie 465 (SSL) puis 587 (STARTTLS) si besoin
function makeTransport() {
  const host = process.env.MAIL_HOST;        // ex: "ssl0.ovh.net"
  const user = process.env.MAIL_USER;        // ex: "contact@worldcreation.fr"
  const pass = process.env.MAIL_PASS;

  // Par défaut : 465 SSL (recommandé OVH)
  const port = Number(process.env.MAIL_PORT || 465);
  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure, // true si 465
    auth: { user, pass },
    tls: { rejectUnauthorized: false }, // évite certains blocages CA
  });
}
