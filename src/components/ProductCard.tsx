import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import './ProductCard.css'

interface ProductCardProps {
    product: Product
    index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addToCart } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const { addToast } = useToast()
    const isLiked = isInWishlist(product.id)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
        })
        addToast(`${product.name} ajouté au panier`, 'success')
    }

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(product.id)
        if (!isLiked) {
            addToast('Ajouté aux favoris', 'success')
        } else {
            addToast('Retiré des favoris', 'info')
        }
    }

    return (
        <motion.article
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
        >
            <Link to={`/produit/${product.id}`} className="product-card__link">
                {/* Badges */}
                <div className="product-card__badges">
                    {product.isBestseller && (
                        <span className="badge badge-success">Bestseller</span>
                    )}
                    {product.isNew && (
                        <span className="badge badge-warning">Nouveau</span>
                    )}
                    {product.oldPrice && (
                        <span className="badge badge-promo">
                            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                        </span>
                    )}
                </div>

                <button
                    className={`product-card__wishlist-btn ${isLiked ? 'active' : ''}`}
                    onClick={handleToggleWishlist}
                    aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                    <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                {/* Image */}
                <div className="product-card__image-wrapper">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-card__image"
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="product-card__content">
                    <span className="product-card__brand">{product.brand}</span>
                    <h3 className="product-card__title">{product.name}</h3>

                    <div className="product-card__footer">
                        <div className="product-card__pricing">
                            <span className="product-card__price">{product.price.toFixed(2)}€</span>
                            {product.oldPrice && (
                                <span className="product-card__old-price">{product.oldPrice.toFixed(2)}€</span>
                            )}
                        </div>

                        <button
                            className="product-card__add-btn"
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            aria-label="Ajouter au panier"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                        </button>
                    </div>

                    {!product.inStock && (
                        <span className="product-card__stock">Rupture de stock</span>
                    )}
                </div>
            </Link>
        </motion.article>
    )
}
