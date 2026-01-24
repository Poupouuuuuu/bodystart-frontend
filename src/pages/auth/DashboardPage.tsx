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
    const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist' | 'addresses'>('orders')

    // Address Book logic
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [addresses, setAddresses] = useState([
        { id: 1, name: 'Domicile', contact: user?.name, street: '12 Rue des Lilas', city: '75011 Paris', country: 'France', isDefault: true },
        { id: 2, name: 'Bureau', contact: user?.name, street: '45 Avenue de la République', city: '75003 Paris', country: 'France', isDefault: false }
    ])
    const [newAddress, setNewAddress] = useState({ name: '', street: '', city: '', country: 'France' })

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

    const handleDownloadInvoice = (orderId: string) => {
        const btn = document.getElementById(`invoice-${orderId}`) as HTMLButtonElement
        if (btn) {
            const originalText = btn.innerText
            btn.innerText = "⏳ ..."
            setTimeout(() => {
                alert(`La facture pour la commande ${orderId} a été téléchargée.`)
                btn.innerText = originalText
            }, 800)
        }
    }

    const handleAddAddress = (e: React.FormEvent) => {
        e.preventDefault()
        const address = {
            id: Date.now(),
            name: newAddress.name || 'Nouvelle adresse',
            contact: user?.name,
            street: newAddress.street,
            city: newAddress.city,
            country: newAddress.country,
            isDefault: addresses.length === 0
        }
        setAddresses([...addresses, address])
        setShowAddressForm(false)
        setNewAddress({ name: '', street: '', city: '', country: 'France' })
    }

    const handleDeleteAddress = (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
            setAddresses(addresses.filter(addr => addr.id !== id))
        }
    }

    return (
        <div className="dashboard-page">
            <PageTitle title="Mon Espace" />
            <div className="container">
                <div className="dashboard-header">
                    <div className="dashboard-welcome">
                        <div>
                            <h1>Bonjour, <span className="text-gradient">{user.name}</span></h1>
                            <p>Heureux de vous revoir sur votre espace personnel.</p>
                        </div>
                        <div className="loyalty-badge">
                            💎 120 Points
                        </div>
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
                        className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('addresses')}
                    >
                        Mes Adresses
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
                                        <div className="order-total-group">
                                            <span className="order-total">Total: 59.90€</span>
                                            <button
                                                id="invoice-CMD-2024-8492"
                                                className="btn-invoice"
                                                onClick={() => handleDownloadInvoice('CMD-2024-8492')}
                                            >
                                                📄 Facture
                                            </button>
                                        </div>
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
                                        <div className="order-total-group">
                                            <span className="order-total">Total: 34.90€</span>
                                            <button
                                                id="invoice-CMD-2023-1029"
                                                className="btn-invoice"
                                                onClick={() => handleDownloadInvoice('CMD-2023-1029')}
                                            >
                                                📄 Facture
                                            </button>
                                        </div>
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

                    {/* ADDRESSES TAB */}
                    {activeTab === 'addresses' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="dashboard-section"
                        >
                            <div className="section-header">
                                <h2>Mes Adresses</h2>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => setShowAddressForm(!showAddressForm)}
                                >
                                    {showAddressForm ? 'Annuler' : 'Ajouter une adresse'}
                                </button>
                            </div>

                            {showAddressForm && (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="address-form"
                                    onSubmit={handleAddAddress}
                                >
                                    <div className="form-group">
                                        <label>Nom de l'adresse (ex: Bureau)</label>
                                        <input
                                            type="text"
                                            required
                                            value={newAddress.name}
                                            onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Rue</label>
                                        <input
                                            type="text"
                                            required
                                            value={newAddress.street}
                                            onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label>Ville & Code Postal</label>
                                            <input
                                                type="text"
                                                required
                                                value={newAddress.city}
                                                onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Pays</label>
                                            <input
                                                type="text"
                                                value={newAddress.country}
                                                onChange={e => setNewAddress({ ...newAddress, country: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
                                        Enregistrer
                                    </button>
                                </motion.form>
                            )}

                            <div className="addresses-grid">
                                {addresses.map(addr => (
                                    <div key={addr.id} className="address-card">
                                        <div className="address-header">
                                            <span className="address-type">{addr.name} {addr.isDefault && '(Défaut)'}</span>
                                            <button
                                                className="btn-icon-sm"
                                                aria-label="Supprimer"
                                                onClick={() => handleDeleteAddress(addr.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <p className="address-name">{addr.contact}</p>
                                        <p>{addr.street}</p>
                                        <p>{addr.city}</p>
                                        <p>{addr.country}</p>
                                        <button className="btn-text btn-sm mt-2">Modifier</button>
                                    </div>
                                ))}
                            </div>
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
