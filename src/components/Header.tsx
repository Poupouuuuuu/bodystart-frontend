
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { categories } from '../data/products'
import './Header.css'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProductsOpen, setIsProductsOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const { totalItems } = useCart()
    const { wishlist } = useWishlist()
    const { user, isAuthenticated, logout } = useAuth()
    const location = useLocation()
    const cartCount = totalItems
    const wishlistCount = wishlist.length

    const userMenuRef = useRef<HTMLDivElement>(null)

    const isActive = (path: string) => location.pathname === path

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false)
            }
        }

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isUserMenuOpen])

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            window.location.href = `/produits?search=${encodeURIComponent(searchQuery)}`
            setIsSearchOpen(false)
        }
    }

    return (
        <header className="header">
            {/* Industrial pipe decoration */}
            <div className="header__pipe"></div>

            <div className="header__container container">
                {/* Logo */}
                <Link to="/" className="header__logo">
                    <img src="/logo.png" alt="Bodystart Nutrition" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="header__nav">
                    <Link
                        to="/"
                        className={`header__link ${isActive('/') ? 'active' : ''}`}
                    >
                        Accueil
                    </Link>

                    {/* Products Dropdown */}
                    <div
                        className="header__dropdown"
                        onMouseEnter={() => setIsProductsOpen(true)}
                        onMouseLeave={() => setIsProductsOpen(false)}
                    >
                        <Link
                            to="/produits"
                            className={`header__link ${location.pathname.startsWith('/produits') ? 'active' : ''}`}
                        >
                            Produits
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </Link>

                        <AnimatePresence>
                            {isProductsOpen && (
                                <motion.div
                                    className="header__dropdown-menu"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="header__dropdown-content">
                                        <Link to="/produits" className="header__dropdown-all">
                                            <span>Tous les produits</span>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                        <div className="header__dropdown-divider"></div>
                                        <div className="header__dropdown-grid">
                                            {categories.map(cat => (
                                                <Link
                                                    key={cat.id}
                                                    to={`/produits/${cat.id}`}
                                                    className="header__dropdown-item"
                                                >
                                                    <span className="header__dropdown-icon">{cat.icon}</span>
                                                    <span>{cat.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link
                        to="/a-propos"
                        className={`header__link ${isActive('/a-propos') ? 'active' : ''}`}
                    >
                        À Propos
                    </Link>
                    <Link
                        to="/contact"
                        className={`header__link ${isActive('/contact') ? 'active' : ''}`}
                    >
                        Contact
                    </Link>
                </nav>

                {/* Actions */}
                <div className="header__actions">
                    <div className="header__search-wrapper">
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.form
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 200, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="header__search-form"
                                    onSubmit={handleSearchSubmit}
                                >
                                    <input
                                        type="text"
                                        placeholder="Rechercher..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="header__search-input"
                                        autoFocus
                                    />
                                </motion.form>
                            )}
                        </AnimatePresence>
                        <button
                            className={`header__action-btn ${isSearchOpen ? 'active' : ''}`}
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Rechercher"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                        </button>
                    </div>

                    <Link to="/favoris" className="header__action-btn" aria-label="Favoris">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {wishlistCount > 0 && (
                            <motion.span
                                className="header__cart-badge"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                key={`wishlist-${wishlistCount}`}
                            >
                                {wishlistCount}
                            </motion.span>
                        )}
                    </Link>

                    {/* User Account / Login */}
                    {isAuthenticated ? (
                        <div
                            ref={userMenuRef}
                            className="header__dropdown"
                            onMouseEnter={() => setIsUserMenuOpen(true)}
                            onMouseLeave={() => setIsUserMenuOpen(false)}
                        >
                            <button
                                className="header__action-btn header__user-btn"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                aria-label="Menu utilisateur"
                            >
                                <span className="user-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </span>
                            </button>

                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        className="header__dropdown-menu header__user-menu"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="header__dropdown-content">
                                            <div className="user-menu-header">
                                                <p className="user-name">{user?.name}</p>
                                                <p className="user-email">{user?.email}</p>
                                            </div>
                                            <div className="header__dropdown-divider"></div>
                                            <Link to="/dashboard" className="header__dropdown-item">
                                                Mon Tableau de bord
                                            </Link>
                                            {user?.role === 'admin' && (
                                                <Link to="/admin" className="header__dropdown-item">
                                                    Administration
                                                </Link>
                                            )}
                                            <button onClick={logout} className="header__dropdown-item logout-btn">
                                                Se déconnecter
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to="/connexion" className="header__action-btn" aria-label="Se connecter">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </Link>
                    )}

                    <Link to="/panier" className="header__cart-btn" aria-label="Panier">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        {cartCount > 0 && (
                            <motion.span
                                className="header__cart-badge"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                key={cartCount}
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`header__menu-toggle ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="header__mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className="header__mobile-nav">
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                            <Link to="/produits" onClick={() => setIsMenuOpen(false)}>Produits</Link>
                            <div className="header__mobile-categories">
                                {categories.map(cat => (
                                    <Link
                                        key={cat.id}
                                        to={`/produits/${cat.id}`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span>{cat.icon}</span>
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                            <Link to="/a-propos" onClick={() => setIsMenuOpen(false)}>À Propos</Link>
                            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                            <div className="header__mobile-divider"></div>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Mon Compte</Link>
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="mobile-logout">
                                        Se déconnecter
                                    </button>
                                </>
                            ) : (
                                <Link to="/connexion" onClick={() => setIsMenuOpen(false)}>Se connecter</Link>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
