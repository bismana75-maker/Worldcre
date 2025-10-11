// API Route Vercel pour gérer les coordonnées
import { kv } from '@vercel/kv';

const CONTACT_KEY = 'worldcreation_contact';

// Coordonnées par défaut
const DEFAULT_CONTACT = {
  id: 'worldcreation-main',
  name: 'Worldcreation',
  email: 'Worldcreation@gmail.com',
  phone: '0745485037',
  location: 'Île-de-France, France',
  title: 'Créateur d\'Expériences Web',
  signature: '',
  updated_at: new Date().toISOString()
};

export default async function handler(req, res) {
  // Configurer CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Récupérer les coordonnées
      let contact = await kv.get(CONTACT_KEY);
      
      if (!contact) {
        // Si pas de données, utiliser les valeurs par défaut
        contact = DEFAULT_CONTACT;
        await kv.set(CONTACT_KEY, contact);
      }
      
      return res.status(200).json(contact);
      
    } else if (req.method === 'PUT') {
      // Mettre à jour les coordonnées
      const updates = req.body;
      
      // Récupérer les données actuelles
      let currentContact = await kv.get(CONTACT_KEY);
      if (!currentContact) {
        currentContact = DEFAULT_CONTACT;
      }
      
      // Fusionner les mises à jour
      const updatedContact = {
        ...currentContact,
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      // Sauvegarder
      await kv.set(CONTACT_KEY, updatedContact);
      
      return res.status(200).json(updatedContact);
      
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
  } catch (error) {
    console.error('API Error:', error);
    
    // En cas d'erreur avec KV, utiliser localStorage côté client
    if (req.method === 'GET') {
      return res.status(200).json(DEFAULT_CONTACT);
    }
    
    return res.status(500).json({ 
      error: 'Server error', 
      fallback: 'using-local-storage' 
    });
  }
}