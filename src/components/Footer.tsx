import { Link } from 'react-router-dom'
import { categories } from '../data/products'
import './Footer.css'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            {/* Plant accent bar */}
            <div className="footer__plant-bar"></div>

            <div className="footer__content container">
                <div className="footer__grid">
                    {/* Brand Column */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <span className="footer__logo-text">BODYSTART</span>
                            <span className="footer__logo-accent">NUTRITION</span>
                        </Link>
                        <p>
                            Votre partenaire santé et performance. Compléments alimentaires
                            premium sélectionnés avec soin pour vous accompagner dans
                            vos objectifs.
                        </p>
                        <div className="footer__social">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                                </svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                </svg>
                            </a>
                        </div>

                        <div className="footer__newsletter">
                            <h5>Restez connecté</h5>
                            <p>Recevez nos conseils et offres exclusives.</p>
                            <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="Votre email" required />
                                <button type="submit" aria-label="S'inscrire">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div className="footer__column">
                        <h4>Produits</h4>
                        <ul>
                            <li><Link to="/produits">Tous les produits</Link></li>
                            {categories.slice(0, 5).map(cat => (
                                <li key={cat.id}>
                                    <Link to={`/produits/${cat.id}`}>
                                        <span>{cat.icon}</span> {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info Column */}
                    <div className="footer__column">
                        <h4>Informations</h4>
                        <ul>
                            <li><Link to="/a-propos">À Propos</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/livraison">Livraison</Link></li>
                            <li><Link to="/click-collect">Click & Collect</Link></li>
                        </ul>
                    </div>

                    {/* Store Column */}
                    <div className="footer__column footer__store">
                        <h4>Notre Boutique</h4>
                        <div className="footer__store-info">
                            <div className="footer__store-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>Bodystart Nutrition<br />Coignières</span>
                            </div>
                            <div className="footer__store-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span>7j/7 : 11h - 19h<br />Ouvert tous les jours</span>
                            </div>
                            <div className="footer__store-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                </svg>
                                <span>07 61 84 75 80</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer__bottom">
                <div className="container">
                    <div className="footer__bottom-content">
                        <p>© {currentYear} Bodystart Nutrition. Tous droits réservés.</p>
                        <div className="footer__legal">
                            <Link to="/mentions-legales">Mentions légales</Link>
                            <Link to="/cgv">CGV</Link>
                            <Link to="/confidentialite">Confidentialité</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
