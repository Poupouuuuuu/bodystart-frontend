import { motion } from 'framer-motion'
import PageTitle from '../components/PageTitle'
import './ContactPage.css'

export default function ContactPage() {
    return (
        <div className="contact-page">
            <PageTitle title="Contact" />
            <div className="container">
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Contactez-nous</h1>
                    <p>Une question ? Besoin de conseils ? Notre équipe est là pour vous.</p>
                </motion.div>

                <div className="contact-grid">
                    {/* Info Card */}
                    <motion.div
                        className="contact-info-card"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2>Nos Coordonnées</h2>

                        <div className="contact-item">
                            <div className="contact-icon">📍</div>
                            <div className="contact-details">
                                <h3>Adresse</h3>
                                <p>Bodystart Nutrition<br />Coignières</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">📞</div>
                            <div className="contact-details">
                                <h3>Téléphone</h3>
                                <p>07 61 84 75 80</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">📧</div>
                            <div className="contact-details">
                                <h3>Email</h3>
                                <p>contact@bodystart-nutrition.fr</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">🕒</div>
                            <div className="contact-details">
                                <h3>Horaires d'ouverture</h3>
                                <p>Ouvert tous les jours</p>
                                <p className="contact-hours">11h00 - 19h00</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Google Map */}
                    <motion.div
                        className="contact-map-container"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3475843156747535!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sen!2sfr!4v1625686000000!5m2!1sen!2sfr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="Google Map"
                        ></iframe>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2>Envoyez-nous un message</h2>
                        <form className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Nom complet</label>
                                <input type="text" id="name" placeholder="Votre nom" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="votre@email.com" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Téléphone</label>
                                <input type="tel" id="phone" placeholder="06 12 34 56 78" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Sujet</label>
                                <select id="subject">
                                    <option value="">Sélectionnez un sujet</option>
                                    <option value="info">Renseignements produits</option>
                                    <option value="order">Suivi de commande</option>
                                    <option value="click-collect">Click & Collect</option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows={5} placeholder="Votre message..."></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg">
                                Envoyer le message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
