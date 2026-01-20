import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import PageTitle from '../components/PageTitle'
import './OrderSuccessPage.css'

export default function OrderSuccessPage() {
    const [orderId] = useState(() => Math.floor(Math.random() * 100000).toString().padStart(6, '0'))

    return (
        <div className="success-page">
            <PageTitle title="Commande Validée" />
            <div className="container">
                <motion.div
                    className="success-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                >
                    <div className="success-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                    <h1>Merci pour votre commande !</h1>
                    <p className="order-number">Commande N° #{orderId}</p>
                    <p className="order-message">
                        Un email de confirmation vous a été envoyé.<br />
                        Nous préparons votre commande avec soin.
                    </p>
                    <div className="success-actions">
                        <Link to="/" className="btn btn-secondary">Retour à l'accueil</Link>
                        <Link to="/produits" className="btn btn-primary">Continuer le shopping</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
