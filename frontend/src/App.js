import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";

// API URL for Vercel deployment
const API_BASE = process.env.NODE_ENV === 'production' 
  ? '' // Utilise le même domaine en production
  : process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
const API = `${API_BASE}/api`;

// Home Page - Display current contact info
const Home = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocalContact = () => {
    const localData = localStorage.getItem('worldcreation_contact');
    return localData ? JSON.parse(localData) : {
      id: 'worldcreation-main',
      name: 'Worldcreation',
      email: 'Worldcreation@gmail.com',
      phone: '0745485037',
      location: 'Île-de-France, France',
      title: 'Créateur d\'Expériences Web',
      signature: '',
      updated_at: new Date().toISOString()
    };
  };

  const fetchContactInfo = async () => {
    try {
      const response = await axios.get(`${API}/contact`);
      setContactInfo(response.data);
      // Sauvegarder en local comme backup
      localStorage.setItem('worldcreation_contact', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching contact info:', error);
      // Utiliser les données locales en fallback
      const localContact = getLocalContact();
      setContactInfo(localContact);
      toast.error('Mode hors ligne - données locales utilisées');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">WorldCreation</h1>
          <Link to="/admin">
            <Button variant="outline" data-testid="admin-nav-button">
              Administration
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mes Coordonnées
          </h2>
          <p className="text-xl text-gray-600">
            Informations de contact professionnelles
          </p>
        </div>

        {contactInfo && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card data-testid="contact-info-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Nom</Label>
                  <p className="text-lg font-semibold" data-testid="contact-name">{contactInfo.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Titre</Label>
                  <p className="text-lg text-gray-800" data-testid="contact-title">{contactInfo.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Localisation</Label>
                  <p className="text-lg text-gray-800" data-testid="contact-location">{contactInfo.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="contact-details-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📞</span>
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p className="text-lg text-blue-600 hover:underline">
                    <a href={`mailto:${contactInfo.email}`} data-testid="contact-email">
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Téléphone</Label>
                  <p className="text-lg text-gray-800">
                    <a href={`tel:${contactInfo.phone}`} data-testid="contact-phone">
                      {contactInfo.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Dernière mise à jour</Label>
                  <p className="text-sm text-gray-500">
                    {new Date(contactInfo.updated_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {contactInfo.signature && (
              <Card className="md:col-span-2" data-testid="signature-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">✍️</span>
                    Signature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap text-gray-800" data-testid="contact-signature">
                      {contactInfo.signature}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/admin">
            <Button size="lg" data-testid="modify-coordinates-button">
              Modifier mes coordonnées
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

// Admin Page - Edit contact info
const AdminPage = () => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    signature: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const getLocalContact = () => {
    const localData = localStorage.getItem('worldcreation_contact');
    return localData ? JSON.parse(localData) : {
      name: 'Worldcreation',
      email: 'Worldcreation@gmail.com',
      phone: '0745485037',
      location: 'Île-de-France, France',
      title: 'Créateur d\'Expériences Web',
      signature: ''
    };
  };

  const fetchContactInfo = async () => {
    try {
      const response = await axios.get(`${API}/contact`);
      setContactInfo(response.data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
      // Utiliser les données locales en fallback
      const localContact = getLocalContact();
      setContactInfo(localContact);
      toast.error('Mode hors ligne - données locales utilisées');
    } finally {
      setLoading(false);
    }
  };

  const saveLocalContact = (data) => {
    localStorage.setItem('worldcreation_contact', JSON.stringify(data));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.put(`${API}/contact`, contactInfo);
      setContactInfo(response.data);
      saveLocalContact(response.data);
      toast.success('Coordonnées mises à jour avec succès !');
    } catch (error) {
      console.error('Error updating contact info:', error);
      // Sauvegarder localement en cas d'erreur API
      const updatedContact = {
        ...contactInfo,
        updated_at: new Date().toISOString()
      };
      setContactInfo(updatedContact);
      saveLocalContact(updatedContact);
      toast.success('Coordonnées sauvegardées localement');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
          <Link to="/">
            <Button variant="outline" data-testid="home-nav-button">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Modifier mes coordonnées
          </h2>
          <p className="text-gray-600">
            Mettez à jour vos informations de contact et votre signature
          </p>
        </div>

        <Card data-testid="admin-form-card">
          <CardHeader>
            <CardTitle>Informations de contact</CardTitle>
            <CardDescription>
              Modifiez vos coordonnées professionnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom *</Label>
                <Input
                  id="name"
                  data-testid="name-input"
                  value={contactInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Worldcreation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  data-testid="title-input"
                  value={contactInfo.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Créateur d'Expériences Web"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="email-input"
                  value={contactInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Worldcreation@gmail.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  data-testid="phone-input"
                  value={contactInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0745485037"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Localisation *</Label>
                <Input
                  id="location"
                  data-testid="location-input"
                  value={contactInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Île-de-France, France"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="signature">Signature personnelle</Label>
                <Textarea
                  id="signature"
                  data-testid="signature-input"
                  value={contactInfo.signature}
                  onChange={(e) => handleInputChange('signature', e.target.value)}
                  placeholder="Votre signature personnelle..."
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Link to="/">
                <Button variant="outline" data-testid="cancel-button">
                  Annuler
                </Button>
              </Link>
              <Button 
                onClick={handleSave} 
                disabled={saving}
                data-testid="save-button"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;