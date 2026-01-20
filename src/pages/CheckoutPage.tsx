import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import PageTitle from '../components/PageTitle'
import './CheckoutPage.css'

export default function CheckoutPage() {
    const navigate = useNavigate()
    const { items, totalPrice, clearCart } = useCart()
    const [isProcessing, setIsProcessing] = useState(false)

    const deliveryFee = totalPrice < 49 ? 4.90 : 0
    const total = totalPrice + deliveryFee

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        clearCart()
        navigate('/commande-validee')
    }

    if (items.length === 0) {
        navigate('/panier')
        return null
    }

    return (
        <div className="checkout-page">
            <PageTitle title="Paiement" />
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="checkout-container"
                >
                    <div className="checkout-form-section">
                        <h1>Validation de la commande</h1>

                        <form id="checkout-form" onSubmit={handleSubmit}>
                            {/* Shipping */}
                            <div className="form-section">
                                <h2>1. Livraison</h2>
                                <div className="form-row">
                                    <div className="form-group half">
                                        <label>Prénom</label>
                                        <input type="text" required />
                                    </div>
                                    <div className="form-group half">
                                        <label>Nom</label>
                                        <input type="text" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Adresse</label>
                                    <input type="text" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group half">
                                        <label>Code Postal</label>
                                        <input type="text" required />
                                    </div>
                                    <div className="form-group half">
                                        <label>Ville</label>
                                        <input type="text" required />
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="form-section">
                                <h2>2. Paiement</h2>
                                <div className="payment-methods">
                                    <div className="payment-method selected">
                                        <span className="radio-circle"></span>
                                        <span>Carte Bancaire</span>
                                        <div className="card-icons">
                                            <div className="card-icon visa"></div>
                                            <div className="card-icon mastercard"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Numéro de carte</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group half">
                                        <label>Date d'expiration</label>
                                        <input type="text" placeholder="MM/YY" />
                                    </div>
                                    <div className="form-group half">
                                        <label>CVC</label>
                                        <input type="text" placeholder="123" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="checkout-summary-section">
                        <div className="checkout-summary-card">
                            <h2>Récapitulatif</h2>
                            <div className="summary-items">
                                {items.map(item => (
                                    <div key={item.id} className="summary-item">
                                        <img src={item.image} alt={item.name} />
                                        <div className="summary-item-info">
                                            <span>{item.name}</span>
                                            <small>x{item.quantity}</small>
                                        </div>
                                        <span>{(item.price * item.quantity).toFixed(2)}€</span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-totals">
                                <div className="summary-row">
                                    <span>Sous-total</span>
                                    <span>{totalPrice.toFixed(2)}€</span>
                                </div>
                                <div className="summary-row">
                                    <span>Livraison</span>
                                    <span>{deliveryFee === 0 ? 'Gratuite' : `${deliveryFee.toFixed(2)}€`}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)}€</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                form="checkout-form"
                                className={`btn btn-primary btn-lg w-full ${isProcessing ? 'loading' : ''}`}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Traitement...' : `Payer ${total.toFixed(2)}€`}
                            </button>
                            <p className="secure-text">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                Paiement 100% sécurisé (SSL)
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
