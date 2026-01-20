import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import './AboutPage.css'

export default function AboutPage() {
    return (
        <div className="about-page">
            <PageTitle title="À Propos" />
            {/* Hero */}
            <section className="about-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1>À Propos de <span className="text-gradient">Bodystart Nutrition</span></h1>
                        <p>Votre partenaire nutrition pour atteindre vos objectifs sportifs</p>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="section about-story">
                <div className="container">
                    <div className="about-story__content">
                        <motion.div
                            className="about-story__text"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>Notre <span className="text-gradient">Histoire</span></h2>
                            <p>
                                Bodystart Nutrition est née d'une passion commune pour le sport et la nutrition.
                                Notre mission : rendre accessible à tous des compléments alimentaires de qualité,
                                accompagnés de conseils personnalisés.
                            </p>
                            <p>
                                Que vous soyez débutant ou athlète confirmé, nous sommes là pour vous accompagner
                                dans votre parcours. Notre équipe de passionnés sélectionne rigoureusement chaque
                                produit pour vous garantir qualité et efficacité.
                            </p>
                        </motion.div>
                        <motion.div
                            className="about-story__image"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="about-story__card">
                                <span className="about-story__emoji">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </span>
                                <h3>Notre Mission</h3>
                                <p>Vous aider à atteindre vos objectifs avec des produits de qualité et des conseils experts.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section about-values">
                <div className="container">
                    <div className="section-title">
                        <h2>Nos <span className="text-gradient">Valeurs</span></h2>
                    </div>
                    <div className="about-values__grid">
                        <motion.div
                            className="value-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="value-card__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                    <path d="M4 22h16" />
                                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                </svg>
                            </span>
                            <h3>Qualité</h3>
                            <p>Nous sélectionnons uniquement des marques premium reconnues pour leur excellence.</p>
                        </motion.div>
                        <motion.div
                            className="value-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="value-card__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                </svg>
                            </span>
                            <h3>Conseil</h3>
                            <p>Notre équipe vous accompagne pour trouver les produits adaptés à vos objectifs.</p>
                        </motion.div>
                        <motion.div
                            className="value-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="value-card__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </span>
                            <h3>Proximité</h3>
                            <p>Une boutique physique pour vous accueillir et répondre à toutes vos questions.</p>
                        </motion.div>
                        <motion.div
                            className="value-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="value-card__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </span>
                            <h3>Transparence</h3>
                            <p>Des informations claires sur chaque produit : composition, utilisation, bénéfices.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="section about-brands">
                <div className="container">
                    <div className="section-title">
                        <h2>Nos <span className="text-gradient">Marques</span></h2>
                        <p>Des partenaires de confiance pour des produits d'exception</p>
                    </div>
                    <div className="about-brands__grid">
                        <motion.div
                            className="brand-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <h3>Eric Favre</h3>
                            <p>Leader français de la nutrition sportive depuis 1993</p>
                        </motion.div>
                        <motion.div
                            className="brand-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3>NutriMuscle</h3>
                            <p>L'excellence nutritionnelle, des produits bio et naturels</p>
                        </motion.div>
                        <motion.div
                            className="brand-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3>Coregenic</h3>
                            <p>Performance et innovation au service des athlètes</p>
                        </motion.div>
                        <motion.div
                            className="brand-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3>French Nutrition</h3>
                            <p>Vitamines et minéraux de qualité pharmaceutique</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section about-cta">
                <div className="container">
                    <motion.div
                        className="about-cta__content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Prêt à <span className="text-gradient">commencer</span> ?</h2>
                        <p>Découvrez notre sélection de produits ou venez nous rencontrer en boutique</p>
                        <div className="about-cta__buttons">
                            <Link to="/produits" className="btn btn-primary btn-lg">
                                Voir nos produits
                            </Link>
                            <Link to="/contact" className="btn btn-secondary btn-lg">
                                Nous contacter
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
