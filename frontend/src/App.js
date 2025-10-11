import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">WorldCreation</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors">À Propos</a>
              <a href="#services" className="text-gray-700 hover:text-indigo-600 transition-colors">Services</a>
              <a href="#portfolio" className="text-gray-700 hover:text-indigo-600 transition-colors">Portfolio</a>
              <a href="#blog" className="text-gray-700 hover:text-indigo-600 transition-colors">Blog</a>
              <a href="#contact" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Worldcreation
            </h1>
            <h2 className="text-2xl md:text-3xl text-indigo-600 mb-8">
              Créateur d'Expériences Web
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Transformez vos idées en sites web exceptionnels
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#portfolio" className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors">
                Voir mes réalisations
              </a>
              <a href="#contact" className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition-colors">
                Démarrer un projet
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">À Propos</h2>
              <p className="text-lg text-gray-600 mb-8">
                Passionné par la création digitale, je conçois des sites web et applications sur mesure qui reflètent l'identité unique de chaque projet. Avec WorldCreation, donnez vie à vos ambitions numériques.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-indigo-600 mr-3">📍</span>
                  <span className="text-gray-700">Île-de-France, France</span>
                </div>
                <div className="flex items-center">
                  <span className="text-indigo-600 mr-3">✉️</span>
                  <span className="text-gray-700">Worldcreation@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-indigo-600 mr-3">✅</span>
                  <span className="text-green-600 font-medium">Disponible pour nouveaux projets</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=800&h=600&fit=crop" 
                   alt="Workspace WorldCreation" 
                   className="rounded-lg shadow-lg" />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Projets Réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">30+</div>
              <div className="text-gray-600">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">3+</div>
              <div className="text-gray-600">Années d'Expérience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">100%</div>
              <div className="text-gray-600">Projets Livrés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mes Services</h2>
            <p className="text-xl text-gray-600">Je vous accompagne dans tous vos projets web, de la conception à la mise en ligne.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Création de Sites Web</h3>
              <p className="text-gray-600 mb-6">Sites vitrines élégants et performants pour valoriser votre activité en ligne.</p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Design responsive</li>
                <li>• SEO optimisé</li>
                <li>• Interface intuitive</li>
                <li>• Performance élevée</li>
              </ul>
              <div className="border-t pt-4">
                <div className="text-lg font-bold text-indigo-600 mb-2">À partir de 800€</div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Demander un devis
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Applications Web</h3>
              <p className="text-gray-600 mb-6">Solutions sur mesure adaptées à vos besoins métier spécifiques.</p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Développement custom</li>
                <li>• Interface moderne</li>
                <li>• Sécurité renforcée</li>
                <li>• Évolutivité</li>
              </ul>
              <div className="border-t pt-4">
                <div className="text-lg font-bold text-indigo-600 mb-2">Sur devis</div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Demander un devis
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">E-commerce</h3>
              <p className="text-gray-600 mb-6">Boutiques en ligne complètes avec système de paiement intégré.</p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Catalogue produits</li>
                <li>• Paiement sécurisé</li>
                <li>• Gestion commandes</li>
                <li>• Analytics</li>
              </ul>
              <div className="border-t pt-4">
                <div className="text-lg font-bold text-indigo-600 mb-2">À partir de 1200€</div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Demander un devis
                </button>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Maintenance & Support</h3>
              <p className="text-gray-600 mb-6">Accompagnement continu pour maintenir votre site à jour et performant.</p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Mises à jour</li>
                <li>• Sauvegardes</li>
                <li>• Support technique</li>
                <li>• Monitoring</li>
              </ul>
              <div className="border-t pt-4">
                <div className="text-lg font-bold text-indigo-600 mb-2">À partir de 50€/mois</div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Portfolio</h2>
            <p className="text-xl text-gray-600">Découvrez mes dernières créations et projets réalisés pour mes clients.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop" 
                   alt="Restaurant Le Gourmet" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Site Vitrine Premium</span>
                  <button className="text-indigo-600 hover:text-indigo-800">Voir les détails</button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Restaurant Le Gourmet</h3>
                <p className="text-gray-600 mb-4">Site web élégant pour restaurant gastronomique avec système de réservation en ligne, menu interactif et galerie photos. Design luxueux rouge/or/noir.</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">CSS3</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">JavaScript</span>
                  </div>
                  <span className="text-sm text-gray-500">2024</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1712898825439-3a18654c67d3?w=800&h=500&fit=crop" 
                   alt="STYLE MINIMAL Boutique" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">E-commerce</span>
                  <button className="text-indigo-600 hover:text-indigo-800">Voir les détails</button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">STYLE MINIMAL Boutique</h3>
                <p className="text-gray-600 mb-4">Boutique en ligne moderne pour vêtements minimalistes avec panier fonctionnel, filtres produits et design épuré noir/blanc/pastel.</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">LocalStorage</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">CSS Grid</span>
                  </div>
                  <span className="text-sm text-gray-500">2024</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop" 
                   alt="FIT COACH Personal" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Site Professionnel</span>
                  <button className="text-indigo-600 hover:text-indigo-800">Voir les détails</button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">FIT COACH Personal</h3>
                <p className="text-gray-600 mb-4">Site dynamique pour coach sportif avec présentation services, tarifs et planning. Design énergique vert/bleu.</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">CSS3</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Responsive</span>
                  </div>
                  <span className="text-sm text-gray-500">2024</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop" 
                   alt="PRESTIGE IMMO Agence" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Site Corporate</span>
                  <button className="text-indigo-600 hover:text-indigo-800">Voir les détails</button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">PRESTIGE IMMO Agence</h3>
                <p className="text-gray-600 mb-4">Site professionnel pour agence immobilière avec galerie de biens, recherche et design blanc/bleu corporate.</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">CSS Grid</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">JavaScript</span>
                  </div>
                  <span className="text-sm text-gray-500">2024</span>
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=500&fit=crop" 
                   alt="LENS STUDIO Portfolio" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Portfolio Créatif</span>
                  <button className="text-indigo-600 hover:text-indigo-800">Voir les détails</button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">LENS STUDIO Portfolio</h3>
                <p className="text-gray-600 mb-4">Portfolio artistique pour photographe avec galerie interactive, tarifs et design sombre élégant.</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">CSS3</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">JavaScript</span>
                  </div>
                  <span className="text-sm text-gray-500">2024</span>
                </div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=500&fit=crop" 
                   alt="WorldCreation Portfolio" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Site Personnel</span>
                  <button className="text-indigo-600 hover:text-indigo-800">Voir les détails</button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">WorldCreation Portfolio</h3>
                <p className="text-gray-600 mb-4">Mon portfolio personnel présentant mes réalisations, services et expertise en développement web.</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">CSS3</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Node.js</span>
                  </div>
                  <span className="text-sm text-gray-500">2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Blog</h2>
            <p className="text-xl text-gray-600">Actualités, conseils et tendances du développement web.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1519217651866-847339e674d4?w=600&h=300&fit=crop" 
                   alt="Tendances Web Design 2024" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs mr-2">Design</span>
                  <span>5 min • 14/03/2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Les Tendances du Web Design en 2024</h3>
                <p className="text-gray-600 mb-4">Découvrez les dernières tendances qui façonnent l'avenir du design web : from minimalisme à l'IA générative.</p>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Lire la suite →</a>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&h=300&fit=crop" 
                   alt="React vs Vue.js" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">Développement</span>
                  <span>8 min • 09/03/2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">React vs Vue.js : Quel Framework Choisir ?</h3>
                <p className="text-gray-600 mb-4">Comparatif détaillé entre React et Vue.js pour vous aider à faire le bon choix pour votre prochain projet.</p>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Lire la suite →</a>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?w=600&h=300&fit=crop" 
                   alt="Performance Web" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mr-2">Performance</span>
                  <span>6 min • 04/03/2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Optimiser les Performances de votre Site Web</h3>
                <p className="text-gray-600 mb-4">Techniques avancées pour améliorer la vitesse de chargement et l'expérience utilisateur de votre site.</p>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Lire la suite →</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Démarrons Votre Projet</h2>
            <p className="text-xl text-gray-600">Prêt à créer quelque chose d'exceptionnel ensemble ?</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Parlons de votre projet</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                
                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-gray-700 mb-2">Type de projet</label>
                  <select id="project-type" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Site vitrine</option>
                    <option>E-commerce</option>
                    <option>Application web</option>
                    <option>Maintenance</option>
                    <option>Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea id="message" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                
                <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Envoyer le message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <div className="bg-indigo-50 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Mes coordonnées</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-indigo-600 mr-4 text-xl">✉️</span>
                    <span className="text-gray-700 text-lg">Worldcreation@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-600 mr-4 text-xl">📞</span>
                    <span className="text-gray-700 text-lg">0745485037</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-600 mr-4 text-xl">📍</span>
                    <span className="text-gray-700 text-lg">Île-de-France, France</span>
                  </div>
                </div>
              </div>
              
              {/* Testimonials */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Témoignages</h3>
                
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start mb-4">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face" 
                         alt="Marie Dubois" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-bold text-gray-900">Marie Dubois</h4>
                      <p className="text-gray-600 text-sm">Propriétaire - Restaurant Le Gourmet</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"Worldcreation a créé un site web magnifique qui reflète parfaitement l'élégance de notre restaurant. Nos réservations ont augmenté de 40% depuis le lancement !"</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start mb-4">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                         alt="Thomas Martin" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-bold text-gray-900">Thomas Martin</h4>
                      <p className="text-gray-600 text-sm">Fondateur - STYLE MINIMAL</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"Un travail remarquable ! Le site e-commerce développé par WorldCreation a dépassé toutes nos attentes. Design impeccable et fonctionnalités parfaites."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">WorldCreation</h3>
            <p className="text-gray-400 mb-6">Créateur d'Expériences Web</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="mailto:Worldcreation@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                Worldcreation@gmail.com
              </a>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">0745485037</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">Île-de-France, France</span>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">&copy; 2024 WorldCreation. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;