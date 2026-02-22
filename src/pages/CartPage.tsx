import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { createCheckoutUrl } from '../lib/shopify-cart'
import './CartPage.css'

type DeliveryOption = 'delivery' | 'clickcollect'

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
    const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('delivery')
    const [isCheckingOut, setIsCheckingOut] = useState(false)


    const deliveryFee = deliveryOption === 'delivery' && totalPrice < 49 ? 4.90 : 0
    const finalTotal = totalPrice + deliveryFee

    const handleCheckout = async () => {
        setIsCheckingOut(true)
        const url = await createCheckoutUrl(items)
        if (url) {
            window.location.href = url
        } else {
            alert("Erreur lors de la création du paiement ou articles non éligibles.")
            setIsCheckingOut(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="cart-page cart-page--empty">
                <div className="container">
                    <motion.div
                        className="cart-empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="cart-empty__icon">🛒</span>
                        <h1>Votre panier est vide</h1>
                        <p>Découvrez nos produits et commencez votre commande</p>
                        <Link to="/produits" className="btn btn-primary btn-lg">
                            Voir nos produits
                        </Link>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="cart-page">
            <div className="container">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Votre <span className="text-gradient">Panier</span>
                </motion.h1>

                <div className="cart-page__content">
                    {/* Cart Items */}
                    <motion.div
                        className="cart-items"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {items.map(item => (
                            <div key={item.id} className="cart-item">
                                <Link to={`/produit/${item.id}`} className="cart-item__image">
                                    <img src={item.image} alt={item.name} />
                                </Link>
                                <div className="cart-item__info">
                                    <span className="cart-item__brand">{item.brand}</span>
                                    <Link to={`/produit/${item.id}`} className="cart-item__name">
                                        {item.name}
                                    </Link>
                                    <span className="cart-item__unit-price">{item.price.toFixed(2)}€ / unité</span>
                                </div>
                                <div className="cart-item__quantity">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <div className="cart-item__price">
                                    {(item.price * item.quantity).toFixed(2)}€
                                </div>
                                <button
                                    className="cart-item__remove"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Supprimer"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        <div className="cart-actions">
                            <button className="btn btn-secondary" onClick={clearCart}>
                                Vider le panier
                            </button>
                            <Link to="/produits" className="btn btn-secondary">
                                Continuer mes achats
                            </Link>
                        </div>
                    </motion.div>

                    {/* Summary */}
                    <motion.div
                        className="cart-summary"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {/* Delivery Options */}
                        <div className="cart-summary__section">
                            <h3>Mode de livraison</h3>
                            <div className="delivery-options">
                                <label className={`delivery-option ${deliveryOption === 'delivery' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="delivery"
                                        checked={deliveryOption === 'delivery'}
                                        onChange={() => setDeliveryOption('delivery')}
                                    />
                                    <div className="delivery-option__content">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-1" />
                                            <polygon points="12 22 5 17 5 12 12 17 19 12 19 17 12 22" />
                                        </svg>
                                        <div>
                                            <strong>Livraison à domicile</strong>
                                            <span>{totalPrice >= 49 ? 'Gratuite' : '4.90€'}</span>
                                        </div>
                                    </div>
                                </label>
                                <label className={`delivery-option ${deliveryOption === 'clickcollect' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="clickcollect"
                                        checked={deliveryOption === 'clickcollect'}
                                        onChange={() => setDeliveryOption('clickcollect')}
                                    />
                                    <div className="delivery-option__content">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                        <div>
                                            <strong>Click & Collect</strong>
                                            <span>Gratuit - Prêt en 2h</span>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {deliveryOption === 'clickcollect' && (
                                <div className="store-info">
                                    <p><strong>Bodystart Nutrition</strong></p>
                                    <p>123 Rue du Fitness, 75000 Paris</p>
                                    <p>Lun-Sam: 9h30-19h30</p>
                                </div>
                            )}
                        </div>



                        {/* Totals */}
                        <div className="cart-summary__section cart-totals">
                            <div className="cart-totals__row">
                                <span>Sous-total</span>
                                <span>{totalPrice.toFixed(2)}€</span>
                            </div>
                            <div className="cart-totals__row">
                                <span>Livraison</span>
                                <span>{deliveryFee === 0 ? 'Gratuite' : `${deliveryFee.toFixed(2)}€`}</span>
                            </div>
                            {totalPrice < 49 && deliveryOption === 'delivery' && (
                                <div className="cart-totals__info">
                                    💡 Plus que {(49 - totalPrice).toFixed(2)}€ pour la livraison gratuite
                                </div>
                            )}
                            <div className="cart-totals__row cart-totals__total">
                                <span>Total</span>
                                <span>{finalTotal.toFixed(2)}€</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            className={`btn btn-primary btn-lg w-full cart-checkout-btn ${isCheckingOut ? 'loading' : ''}`}
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? 'Redirection sécurisée...' : 'Procéder au paiement'}
                            {!isCheckingOut && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            )}
                        </button>

                        {/* Trust badges */}
                        <div className="cart-trust">
                            <div className="cart-trust__item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Paiement sécurisé</span>
                            </div>
                            <div className="cart-trust__item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Satisfait ou remboursé</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
