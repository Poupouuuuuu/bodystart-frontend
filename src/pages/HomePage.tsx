import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import type { Product, Category } from '../data/products'
import { getShopifyProducts, mapShopifyToLocalProduct, getShopifyCollections, mapShopifyToLocalCategory } from '../lib/shopify-products'
import './HomePage.css'

export default function HomePage() {
    const [bestsellers, setBestsellers] = useState<Product[]>([])
    const [dynamicCategories, setDynamicCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchInitialData() {
            try {
                // Fetch bestsellers
                const shopifyData = await getShopifyProducts(4)
                const localizedProducts = shopifyData.map(mapShopifyToLocalProduct)
                setBestsellers(localizedProducts)

                // Fetch categories
                const shopifyCollections = await getShopifyCollections(8)
                setDynamicCategories(shopifyCollections.map(mapShopifyToLocalCategory))
            } catch (error) {
                console.error("Failed to fetch Shopify data for Homepage", error)
            } finally {
                setLoading(false)
            }
        }

        fetchInitialData()
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className="home" data-refresh="true">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__bg">
                    {/* Plant wall effect on sides */}
                    <div className="hero__plant-left"></div>
                    <div className="hero__plant-right"></div>
                    {/* Edison lights */}
                    <div className="hero__lights">
                        <span className="hero__light"></span>
                        <span className="hero__light"></span>
                        <span className="hero__light"></span>
                        <span className="hero__light"></span>
                        <span className="hero__light"></span>
                    </div>
                </div>
                <div className="hero__content container">
                    <motion.div
                        className="hero__text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1>
                            <span className="hero__title-main">BODYSTART</span>
                            <span className="hero__title-accent">NUTRITION</span>
                        </h1>
                        <p className="hero__subtitle">
                            Votre destination ultime pour des compléments alimentaires premium.
                            Protéines, créatine, vitamines... Tout pour atteindre vos objectifs.
                        </p>
                        <div className="hero__buttons">
                            <Link to="/produits" className="btn btn-primary btn-lg">
                                Découvrir nos produits
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link to="/produits" className="btn btn-secondary btn-lg">
                                Click & Collect
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        className="hero__features"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="hero__feature">
                            <svg className="hero__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="1" y="3" width="15" height="13" />
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                <circle cx="5.5" cy="18.5" r="2.5" />
                                <circle cx="18.5" cy="18.5" r="2.5" />
                            </svg>
                            <span>Livraison gratuite dès 80€</span>
                        </div>
                        <div className="hero__feature">
                            <svg className="hero__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>Click & Collect disponible</span>
                        </div>
                        <div className="hero__feature">
                            <svg className="hero__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span>Qualité garantie</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="section categories">
                <div className="container">
                    <div className="section-title">
                        <h2>Nos <span className="text-gradient">Catégories</span></h2>
                        <p>Trouvez les compléments adaptés à vos besoins</p>
                    </div>
                    <div className="categories__grid">
                        {dynamicCategories.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/produits/${cat.id}`} className={`category-card ${cat.image ? 'category-card--has-image' : ''}`}>
                                    {cat.image ? (
                                        <div className="category-card__image-wrapper">
                                            <img src={cat.image} alt={cat.name} />
                                        </div>
                                    ) : (
                                        <div className="category-card__icon-wrapper">
                                            <span className="category-card__icon">{cat.icon}</span>
                                        </div>
                                    )}
                                    <span className="category-card__name">{cat.name}</span>
                                    <svg className="category-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            {/* Bestsellers Section */}
            <section className="section bestsellers section-alt">
                <div className="container">
                    <div className="section-title">
                        <h2>Nos <span className="text-gradient">Bestsellers</span></h2>
                        <p>Les produits préférés de nos clients</p>
                    </div>
                    <motion.div
                        className="products-grid grid grid-4"
                        variants={containerVariants}
                        initial="visible"
                        animate="visible"
                        viewport={{ once: true }}
                    >
                        {loading ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--color-text-light)' }}>
                                Chargement des produits depuis Shopify...
                            </div>
                        ) : bestsellers.length > 0 ? (
                            bestsellers.map((product, index) => (
                                <motion.div key={product.id} variants={itemVariants}>
                                    <ProductCard product={product} index={index} />
                                </motion.div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                                <p>Aucun produit disponible sur la boutique pour le moment.</p>
                            </div>
                        )}
                    </motion.div>
                    <div className="section-cta">
                        <Link to="/produits" className="btn btn-secondary">
                            Voir tous les produits
                        </Link>
                    </div>
                </div>
            </section>



            {/* Click & Collect Section */}
            <section className="section click-collect section-alt">
                <div className="container">
                    <div className="click-collect__content">
                        <motion.div
                            className="click-collect__text"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="click-collect__badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ marginRight: 8, display: 'inline-block', verticalAlign: 'text-bottom' }}>
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                Service exclusif
                            </span>
                            <h2>Click & <span className="text-gradient">Collect</span></h2>
                            <p>
                                Commandez en ligne et récupérez vos produits en boutique.
                                Préparation en 2h, conseils personnalisés sur place.
                            </p>
                            <ul className="click-collect__list">
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    Commande en ligne rapide
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    Prêt en 2 heures
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    Conseils gratuits en boutique
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    Pas de frais de livraison
                                </li>
                            </ul>
                            <Link to="/produits" className="btn btn-primary btn-lg">
                                Commander maintenant
                            </Link>
                        </motion.div>
                        <motion.div
                            className="click-collect__visual"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="click-collect__card">
                                <div className="click-collect__step">
                                    <span className="click-collect__step-num">1</span>
                                    <span className="click-collect__step-text">Choisissez vos produits</span>
                                </div>
                                <div className="click-collect__step">
                                    <span className="click-collect__step-num">2</span>
                                    <span className="click-collect__step-text">Sélectionnez "Retrait en boutique"</span>
                                </div>
                                <div className="click-collect__step">
                                    <span className="click-collect__step-num">3</span>
                                    <span className="click-collect__step-text">Récupérez votre commande</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="section trust">
                <div className="container">
                    <div className="trust__grid">
                        <motion.div
                            className="trust__item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="trust__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.2 7.8l-7.7 7.7a.9.9 0 01-1.3 0L7 11.3" />
                                    <path d="M12 3L2 12l10 9 10-9-10-9z" />
                                </svg>
                            </div>
                            <h3>Marques Premium</h3>
                            <p>Eric Favre, NutriMuscle, Coregenic et French Nutrition</p>
                        </motion.div>
                        <motion.div
                            className="trust__item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="trust__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                    <line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                            </div>
                            <h3>Paiement Sécurisé</h3>
                            <p>Vos transactions sont 100% sécurisées</p>
                        </motion.div>
                        <motion.div
                            className="trust__item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="trust__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13" />
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                            </div>
                            <h3>Livraison Rapide</h3>
                            <p>Expédition sous 24/48h, gratuite dès 49€</p>
                        </motion.div>
                        <motion.div
                            className="trust__item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="trust__icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                </svg>
                            </div>
                            <h3>Conseils Experts</h3>
                            <p>Notre équipe vous accompagne dans vos choix</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
