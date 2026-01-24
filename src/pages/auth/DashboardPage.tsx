import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import ProductCard from '../../components/ProductCard'
import { products } from '../../data/products'
import PageTitle from '../../components/PageTitle'
import { generateInvoiceHtml } from '../../utils/invoiceGenerator'
import { searchAddress, countries } from '../../utils/addressService'
import type { AddressSuggestion } from '../../utils/addressService'
import './DashboardPage.css'

export default function DashboardPage() {
    const { user, logout } = useAuth()
    const { wishlist } = useWishlist()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist' | 'addresses'>('orders')

    // Address Book logic
    const [showAddressModal, setShowAddressModal] = useState(false)
    const [editingAddressId, setEditingAddressId] = useState<number | null>(null)

    // Load addresses from localStorage or use defaults
    const getInitialAddresses = () => {
        const saved = localStorage.getItem('bodystart_addresses')
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch {
                return null
            }
        }
        return null
    }

    const defaultAddresses = [
        { id: 1, name: 'Domicile', contact: user?.name, street: '12 Rue des Lilas', city: '75011 Paris', country: 'France', isDefault: true },
        { id: 2, name: 'Bureau', contact: user?.name, street: '45 Avenue de la République', city: '75003 Paris', country: 'France', isDefault: false }
    ]

    const [addresses, setAddresses] = useState(getInitialAddresses() || defaultAddresses)
    const [newAddress, setNewAddress] = useState({ name: '', street: '', city: '', country: 'France' })

    // Address autocomplete
    const [addressQuery, setAddressQuery] = useState('')
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isAddressInputFocused, setIsAddressInputFocused] = useState(false)

    // Delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [addressToDelete, setAddressToDelete] = useState<number | null>(null)

    // Save addresses to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('bodystart_addresses', JSON.stringify(addresses))
    }, [addresses])

    // Mock Orders Data
    const orders = [
        {
            id: 'CMD-2024-8492',
            date: '18 Jan 2026',
            status: 'Livré',
            total: 59.90,
            items: [
                { description: 'Isolate Whey Native (Vanille)', quantity: 1, unitPrice: 59.90, total: 59.90 }
            ],
            image: 'https://images.unsplash.com/photo-1593095948071-474c5cc8d28e?auto=format&fit=crop&q=80&w=1000'
        },
        {
            id: 'CMD-2023-1029',
            date: '12 Dec 2025',
            status: 'Livré',
            total: 34.90,
            items: [
                { description: 'Créatine Monohydrate', quantity: 1, unitPrice: 24.90, total: 24.90 },
                { description: 'Shaker Bodystart', quantity: 1, unitPrice: 10.00, total: 10.00 }
            ],
            image: 'https://images.unsplash.com/photo-1593095948071-474c5cc8d28e?auto=format&fit=crop&q=80&w=1000' // Placeholder
        }
    ]

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
        const order = orders.find(o => o.id === orderId)
        if (!order || !user) return

        // Get default address for invoice
        const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0]

        const invoiceData = {
            number: order.id.replace('CMD', 'FAC'),
            date: order.date,
            clientName: user.name,
            clientEmail: user.email,
            shippingAddress: defaultAddress ? {
                name: defaultAddress.name,
                street: defaultAddress.street,
                city: defaultAddress.city,
                country: defaultAddress.country
            } : undefined,
            total: order.total,
            items: order.items
        }

        const html = generateInvoiceHtml(invoiceData)
        const newWindow = window.open('', '_blank')
        if (newWindow) {
            newWindow.document.write(html)
            newWindow.document.close()
        }
    }

    const handleAddAddress = (e: React.FormEvent) => {
        e.preventDefault()

        if (editingAddressId !== null) {
            // Mode édition
            setAddresses(addresses.map(addr =>
                addr.id === editingAddressId
                    ? { ...addr, name: newAddress.name, street: newAddress.street, city: newAddress.city, country: newAddress.country }
                    : addr
            ))
            setEditingAddressId(null)
        } else {
            // Mode ajout
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
        }

        setShowAddressModal(false)
        setNewAddress({ name: '', street: '', city: '', country: 'France' })
        setAddressQuery('')
        setAddressSuggestions([])
    }

    const handleEditAddress = (id: number) => {
        const addressToEdit = addresses.find(addr => addr.id === id)
        if (addressToEdit) {
            setNewAddress({
                name: addressToEdit.name,
                street: addressToEdit.street,
                city: addressToEdit.city,
                country: addressToEdit.country
            })
            setAddressQuery(addressToEdit.street)
            setEditingAddressId(id)
            setShowAddressModal(true)
        }
    }

    const handleCancelForm = () => {
        setShowAddressModal(false)
        setEditingAddressId(null)
        setNewAddress({ name: '', street: '', city: '', country: 'France' })
        setAddressQuery('')
        setAddressSuggestions([])
    }

    const handleDeleteAddress = (id: number) => {
        setAddressToDelete(id)
        setShowDeleteModal(true)
    }

    const confirmDeleteAddress = () => {
        if (addressToDelete !== null) {
            setAddresses(addresses.filter(addr => addr.id !== addressToDelete))
        }
        setShowDeleteModal(false)
        setAddressToDelete(null)
    }

    const cancelDelete = () => {
        setShowDeleteModal(false)
        setAddressToDelete(null)
    }

    // Address autocomplete effect
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (addressQuery.length >= 3) {
                const suggestions = await searchAddress(addressQuery)
                setAddressSuggestions(suggestions)
                setShowSuggestions(suggestions.length > 0)
            } else {
                setAddressSuggestions([])
                setShowSuggestions(false)
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [addressQuery])

    const selectAddressSuggestion = (suggestion: AddressSuggestion) => {
        setNewAddress({
            ...newAddress,
            street: suggestion.street,
            city: `${suggestion.postcode} ${suggestion.city}`
        })
        setAddressQuery(suggestion.street)
        setShowSuggestions(false)
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
                                {orders.map(order => (
                                    <div key={order.id} className="order-card">
                                        <div className="order-header">
                                            <div>
                                                <span className="order-number">#{order.id}</span>
                                                <span className="order-date">{order.date}</span>
                                            </div>
                                            <span className="order-status status-delivered">{order.status}</span>
                                        </div>
                                        <div className="order-items">
                                            <div className="order-item-preview">
                                                <img src={order.image} alt={order.items[0].description} />
                                                <div>
                                                    <h4>{order.items[0].description}</h4>
                                                    <p>{order.items.length > 1 ? `+ ${order.items.length - 1} autre(s) article(s)` : `Quantité: ${order.items[0].quantity}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order-footer">
                                            <div className="order-total-group">
                                                <span className="order-total">Total: {order.total.toFixed(2)}€</span>
                                                <button
                                                    className="btn-invoice"
                                                    onClick={() => handleDownloadInvoice(order.id)}
                                                >
                                                    📄 Facture
                                                </button>
                                            </div>
                                            <button className="btn-text">Voir détails</button>
                                        </div>
                                    </div>
                                ))}
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
                                    onClick={() => {
                                        setEditingAddressId(null)
                                        setNewAddress({ name: '', street: '', city: '', country: 'France' })
                                        setAddressQuery('')
                                        setShowAddressModal(true)
                                    }}
                                >
                                    + Ajouter une adresse
                                </button>
                            </div>

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
                                        <button className="btn-text btn-sm mt-2" onClick={() => handleEditAddress(addr.id)}>Modifier</button>
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

            {/* ADDRESS MODAL */}
            <AnimatePresence>
                {showAddressModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCancelForm}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>{editingAddressId ? 'Modifier l\'adresse' : 'Nouvelle adresse'}</h3>
                                <button className="modal-close" onClick={handleCancelForm}>✕</button>
                            </div>
                            <form onSubmit={handleAddAddress}>
                                <div className="form-group">
                                    <label>Nom de l'adresse (ex: Bureau, Domicile)</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Bureau"
                                        value={newAddress.name}
                                        onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group form-group-autocomplete">
                                    <label>Adresse</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Commencez à taper votre adresse..."
                                        value={addressQuery}
                                        onChange={e => {
                                            setAddressQuery(e.target.value)
                                            setNewAddress({ ...newAddress, street: e.target.value })
                                        }}
                                        onFocus={() => setIsAddressInputFocused(true)}
                                        onBlur={() => setTimeout(() => setIsAddressInputFocused(false), 200)}
                                        autoComplete="off"
                                    />
                                    {isAddressInputFocused && showSuggestions && addressSuggestions.length > 0 && (
                                        <ul className="address-suggestions">
                                            {addressSuggestions.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => selectAddressSuggestion(suggestion)}
                                                >
                                                    <strong>{suggestion.street}</strong>
                                                    <span>{suggestion.postcode} {suggestion.city}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Code Postal et Ville</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="75001 Paris"
                                        value={newAddress.city}
                                        onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Pays</label>
                                    <select
                                        value={newAddress.country}
                                        onChange={e => setNewAddress({ ...newAddress, country: e.target.value })}
                                        required
                                    >
                                        {countries.map((country, index) => (
                                            country === '---'
                                                ? <option key={index} disabled>──────────</option>
                                                : <option key={index} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-outline" onClick={handleCancelForm}>
                                        Annuler
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingAddressId ? 'Mettre à jour' : 'Enregistrer'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DELETE CONFIRMATION MODAL */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={cancelDelete}
                    >
                        <motion.div
                            className="modal-content modal-small"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>Confirmer la suppression</h3>
                            </div>
                            <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                                Êtes-vous sûr de vouloir supprimer cette adresse ? Cette action est irréversible.
                            </p>
                            <div className="modal-actions">
                                <button className="btn btn-outline" onClick={cancelDelete}>
                                    Annuler
                                </button>
                                <button className="btn btn-danger" onClick={confirmDeleteAddress}>
                                    Supprimer
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

