import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import ProductCard from '../../components/ProductCard'
import { products } from '../../data/products'
import PageTitle from '../../components/PageTitle'
import './DashboardPage.css'

export default function DashboardPage() {
    const { user, logout } = useAuth()
    const { wishlist } = useWishlist()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist'>('orders')

    // Filter products that are in the wishlist
    const wishlistProducts = products.filter(product => wishlist.includes(product.id))

    if (!user) {
        navigate('/connexion')
        return null
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="dashboard-page">
            <PageTitle title="Mon Espace" />
            <div className="container">
                <div className="dashboard-header">
                    <div className="dashboard-welcome">
                        <h1>Bonjour, <span className="text-gradient">{user.name}</span></h1>
                        <p>Heureux de vous revoir sur votre espace personnel.</p>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline">
                        Se déconnecter
                    </button>
                </div>

                <div className="dashboard-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Mes Commandes
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
                        onClick={() => setActiveTab('wishlist')}
                    >
                        Ma Wishlist ({wishlist.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Mon Profil
                    </button>
                </div>

                <div className="dashboard-content">
                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="dashboard-section"
                        >
                            <h2>Historique des commandes</h2>
                            <div className="orders-list">
                                {/* Mock Order */}
                                <div className="order-card">
                                    <div className="order-header">
                                        <div>
                                            <span className="order-number">#CMD-2024-8492</span>
                                            <span className="order-date">18 Jan 2026</span>
                                        </div>
                                        <span className="order-status status-delivered">Livré</span>
                                    </div>
                                    <div className="order-items">
                                        <div className="order-item-preview">
                                            <img src="https://images.unsplash.com/photo-1593095948071-474c5cc8d28e?auto=format&fit=crop&q=80&w=1000" alt="Isolate Whey" />
                                            <div>
                                                <h4>Isolate Whey Native</h4>
                                                <p>Vanille x1</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-footer">
                                        <span className="order-total">Total: 59.90€</span>
                                        <button className="btn-text">Voir détails</button>
                                    </div>
                                </div>

                                <div className="order-card">
                                    <div className="order-header">
                                        <div>
                                            <span className="order-number">#CMD-2023-1029</span>
                                            <span className="order-date">12 Dec 2025</span>
                                        </div>
                                        <span className="order-status status-delivered">Livré</span>
                                    </div>
                                    <div className="order-footer">
                                        <span className="order-total">Total: 34.90€</span>
                                        <button className="btn-text">Voir détails</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* WISHLIST TAB */}
                    {activeTab === 'wishlist' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="dashboard-section"
                        >
                            <div className="section-header">
                                <h2>Ma Wishlist</h2>
                                <Link to="/produits" className="btn-text">Voir tous les produits</Link>
                            </div>

                            {wishlistProducts.length > 0 ? (
                                <div className="dashboard-grid">
                                    {wishlistProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <p className="empty-state">Votre wishlist est vide.</p>
                            )}
                        </motion.div>
                    )}

                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="dashboard-section"
                        >
                            <h2>Mes Informations</h2>
                            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Nom complet</label>
                                    <input type="text" defaultValue={user.name} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" defaultValue={user.email} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Nouveau mot de passe</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                                <button className="btn btn-primary">Enregistrer les modifications</button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
