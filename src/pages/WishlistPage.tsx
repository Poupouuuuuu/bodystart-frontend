import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import PageTitle from '../components/PageTitle'
import './WishlistPage.css'

export default function WishlistPage() {
    const { wishlist } = useWishlist()

    // Filter products that are in the wishlist
    const wishlistProducts = products.filter(product => wishlist.includes(product.id))

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="wishlist-page">
            <PageTitle title="Mes Favoris" />
            <div className="container">
                <div className="wishlist-header">
                    <h1>Ma <span className="text-gradient">Liste d'envies</span></h1>
                    <p>{wishlistProducts.length} produit{wishlistProducts.length > 1 ? 's' : ''} sauvegardé{wishlistProducts.length > 1 ? 's' : ''}</p>
                </div>

                {wishlistProducts.length > 0 ? (
                    <motion.div
                        className="wishlist-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {wishlistProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="wishlist-empty">
                        <div className="empty-icon">❤️</div>
                        <h2>Votre liste d'envies est vide</h2>
                        <p>Sauvegardez vos produits favoris pour les retrouver plus tard.</p>
                        <Link to="/produits" className="btn btn-primary">
                            Découvrir nos produits
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
