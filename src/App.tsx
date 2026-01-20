import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LegalPage from './pages/LegalPage'
import CGVPage from './pages/CGVPage'
import PrivacyPage from './pages/PrivacyPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import NotFoundPage from './pages/NotFoundPage'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import ScrollToTop from './components/ScrollToTop'
import WishlistPage from './pages/WishlistPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/auth/DashboardPage'
import AdminPage from './pages/admin/AdminPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="app">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/produits" element={<ProductsPage />} />
                    <Route path="/produits/:category" element={<ProductsPage />} />
                    <Route path="/produit/:id" element={<ProductDetailPage />} />
                    <Route path="/panier" element={<CartPage />} />
                    <Route path="/favoris" element={<WishlistPage />} />
                    <Route path="/connexion" element={<LoginPage />} />
                    <Route path="/inscription" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/a-propos" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/mentions-legales" element={<LegalPage />} />
                    <Route path="/cgv" element={<CGVPage />} />
                    <Route path="/confidentialite" element={<PrivacyPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/commande-validee" element={<OrderSuccessPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  )
}

export default App
