import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import LegalPage from '../pages/LegalPage'
import CGVPage from '../pages/CGVPage'
import PrivacyPage from '../pages/PrivacyPage'
import CheckoutPage from '../pages/CheckoutPage'
import OrderSuccessPage from '../pages/OrderSuccessPage'
import NotFoundPage from '../pages/NotFoundPage'
import WishlistPage from '../pages/WishlistPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/auth/DashboardPage'
import AdminPage from '../pages/admin/AdminPage'

import AnimatedPage from './AnimatedPage'

const AnimatedRoutes: React.FC = () => {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
                <Route path="/produits" element={<AnimatedPage><ProductsPage /></AnimatedPage>} />
                <Route path="/produits/:category" element={<AnimatedPage><ProductsPage /></AnimatedPage>} />
                <Route path="/produit/:id" element={<AnimatedPage><ProductDetailPage /></AnimatedPage>} />
                <Route path="/panier" element={<AnimatedPage><CartPage /></AnimatedPage>} />
                <Route path="/favoris" element={<AnimatedPage><WishlistPage /></AnimatedPage>} />
                <Route path="/connexion" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
                <Route path="/inscription" element={<AnimatedPage><RegisterPage /></AnimatedPage>} />
                <Route path="/dashboard" element={<AnimatedPage><DashboardPage /></AnimatedPage>} />
                <Route path="/admin" element={<AnimatedPage><AdminPage /></AnimatedPage>} />
                <Route path="/a-propos" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
                <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
                <Route path="/mentions-legales" element={<AnimatedPage><LegalPage /></AnimatedPage>} />
                <Route path="/cgv" element={<AnimatedPage><CGVPage /></AnimatedPage>} />
                <Route path="/confidentialite" element={<AnimatedPage><PrivacyPage /></AnimatedPage>} />
                <Route path="/checkout" element={<AnimatedPage><CheckoutPage /></AnimatedPage>} />
                <Route path="/commande-validee" element={<AnimatedPage><OrderSuccessPage /></AnimatedPage>} />
                <Route path="*" element={<AnimatedPage><NotFoundPage /></AnimatedPage>} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
