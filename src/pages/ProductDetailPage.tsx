import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../data/products'
import { products } from '../data/products'
import { getShopifyProduct, getShopifyProducts, mapShopifyToLocalProduct } from '../lib/shopify-products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import ProductCard from '../components/ProductCard'
import './ProductDetailPage.css'

// Helper to parse the plain text metafield into a structured object for the table
function parseNutritionMetafield(text?: string) {
    if (!text) return null;

    const extract = (regex: RegExp) => {
        const match = text.match(regex);
        return match ? match[1].trim() : '-';
    };

    const portionMatch = text.match(/pour (.*?)\)|pour (.*?):/i);
    const portion = portionMatch ? (portionMatch[1] || portionMatch[2]).trim() : '30g';

    const energy = extract(/(?:Énergie|Energie|Energy)\s*:\s*([^\n]+)/i);
    const fats = extract(/Matières grasses\s*:\s*([^(\n]+)/i);
    const fatsSat = extract(/saturés\s*:\s*([^)\n]+)/i);
    const carbs = extract(/Glucides\s*:\s*([^(\n]+)/i);
    const carbsSugar = extract(/sucres\s*:\s*([^)\n]+)/i);
    const protein = extract(/Protéines\s*:\s*([^(\n]+)/i);
    const salt = extract(/Sel\s*:\s*([^\n]+)/i);

    // Aminogram parsing
    const aminogram: { label: string, value: string }[] = [];
    const lines = text.split('\n');
    let isAminogramSection = false;
    for (const line of lines) {
        if (line.toLowerCase().includes('aminogramme')) {
            isAminogramSection = true;
            continue;
        }
        if (isAminogramSection && line.includes(':')) {
            const [label, ...valueParts] = line.split(':');
            const value = valueParts.join(':');
            if (label && value) {
                aminogram.push({ label: label.replace(/^-/, '').trim(), value: value.trim() });
            }
        }
    }

    if (energy === '-' && protein === '-') return null;

    return {
        portion,
        energy,
        fats,
        fatsSaturated: fatsSat !== '-' ? fatsSat : '',
        carbs,
        carbsSugar: carbsSugar !== '-' ? carbsSugar : '',
        protein,
        salt,
        aminogram: aminogram.length > 0 ? aminogram : undefined
    };
}

export default function ProductDetailPage() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true)
            try {
                if (id) {
                    const shopifyData = await getShopifyProduct(id)
                    if (shopifyData) {
                        setProduct(mapShopifyToLocalProduct(shopifyData))
                    } else {
                        setProduct(null)
                    }
                }
            } catch (error) {
                console.error("Failed to fetch Shopify product:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const { addToCart } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const { addToast } = useToast()

    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('description')

    const isLiked = product ? isInWishlist(product.id) : false

    const handleToggleWishlist = () => {
        if (!product) return
        toggleWishlist(product.id)
        if (!isLiked) {
            addToast('Ajouté aux favoris', 'success')
        } else {
            addToast('Retiré des favoris', 'info')
        }
    }

    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null)
    const [activeImage, setActiveImage] = useState<string>('')

    // Set default flavor and initial image
    if (product?.flavors && !selectedFlavor) {
        const firstFlavor = product.flavors[0]
        const firstFlavorName = typeof firstFlavor === 'string' ? firstFlavor : firstFlavor.name
        setSelectedFlavor(firstFlavorName)
    }

    // Initialize activeImage only when product loads
    if (product && activeImage === '') {
        setActiveImage(product.image)
    }

    const handleFlavorChange = (flavor: string | { name: string, image?: string, id?: string, price?: number }) => {
        const flavorName = typeof flavor === 'string' ? flavor : flavor.name
        const flavorImage = typeof flavor === 'object' ? flavor.image : undefined

        setSelectedFlavor(flavorName)
        if (flavorImage) {
            setActiveImage(flavorImage)
        } else {
            // Revert to default product image if no specific flavor image
            // OR keep current if we want. Let's revert to base product image for consistency
            // unless the base image IS the flavor image. 
            // Better strategy: If the flavor has an image, show it. If not, show default product image?
            // User asked: "je veux que quand je cliques sur la saveur cookie and cream que ça soit cette photo qui soit affiché"
            // implying other flavors might use the default.
            setActiveImage(product?.image || '')
        }
    }


    if (loading) {
        return (
            <div className="product-detail not-found">
                <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
                    <h2 style={{ color: 'var(--color-primary)' }}>Chargement du produit...</h2>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="product-detail not-found">
                <div className="container">
                    <h1>Produit non trouvé</h1>
                    <p>Le produit que vous recherchez n'existe pas ou n'est plus disponible sur notre boutique Shopify.</p>
                    <Link to="/produits" className="btn btn-primary">
                        Voir tous les produits
                    </Link>
                </div>
            </div>
        )
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)

    const handleAddToCart = () => {
        if (!product) return;

        let currentVariantId = product.variantId;
        let currentPrice = product.price;

        if (selectedFlavor && product.flavors) {
            const flavorObj = product.flavors.find(f => (typeof f === 'string' ? f : f.name) === selectedFlavor);
            if (flavorObj && typeof flavorObj === 'object') {
                if (flavorObj.id) currentVariantId = flavorObj.id;
                if (flavorObj.price) currentPrice = flavorObj.price;
            }
        }

        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                name: selectedFlavor ? (product.name + ' - ' + selectedFlavor) : product.name,
                brand: product.brand,
                price: currentPrice,
                image: activeImage || product.image, // Use active image in cart
                variantId: currentVariantId,
            })
        }
    }



    return (
        <div className="product-detail">
            {/* Breadcrumb */}
            <div className="product-detail__breadcrumb container">
                <Link to="/">Accueil</Link>
                <span>/</span>
                <Link to="/produits">Produits</Link>
                <span>/</span>
                <span>{product.name}</span>
            </div>

            {/* Main Content */}
            <div className="product-detail__content container">
                <motion.div
                    className="product-detail__gallery"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="product-detail__image-main">
                        <img key={activeImage} src={activeImage || product.image} alt={product.name} />
                    </div>
                    {/* Flavour Thumbnails Placeholder */}
                    <div className="product-detail__thumbnails">
                        <div
                            className={`thumbnail ${activeImage === product.image ? 'active' : ''} `}
                            onClick={() => {
                                setActiveImage(product.image)
                                if (product.flavors && product.flavors.length > 0) {
                                    const defaultFlavor = product.flavors[0]
                                    setSelectedFlavor(typeof defaultFlavor === 'string' ? defaultFlavor : defaultFlavor.name)
                                }
                            }}
                        >
                            <img src={product.image} alt="Default" />
                        </div>
                        {product.flavors?.map((f) => {
                            if (typeof f === 'object' && f.image && f.image !== product.image) {
                                return (
                                    <div
                                        key={f.name}
                                        className={`thumbnail ${activeImage === f.image ? 'active' : ''} `}
                                        onClick={() => {
                                            setSelectedFlavor(f.name)
                                            setActiveImage(f.image!)
                                        }}
                                    >
                                        <img src={f.image} alt={f.name} />
                                    </div>
                                )
                            }
                            return null
                        })}
                    </div>
                </motion.div>

                <motion.div
                    className="product-detail__info"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="product-detail__brand">{product.brand.toUpperCase()}</span>
                    <h1 className="product-detail__title">{product.name}</h1>

                    <div className="product-detail__weight-badge-container">
                        {product.weight && (
                            <span className="product-detail__weight-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                {product.weight}
                            </span>
                        )}
                        {product.servings && (
                            <span className="product-detail__servings">{product.servings}</span>
                        )}
                    </div>



                    <div className="product-detail__pricing">
                        <span className="product-detail__price">
                            {(() => {
                                let displayPrice = product.price;
                                if (selectedFlavor && product.flavors) {
                                    const flavorObj = product.flavors.find(f => (typeof f === 'string' ? f : f.name) === selectedFlavor);
                                    if (flavorObj && typeof flavorObj === 'object' && flavorObj.price) {
                                        displayPrice = flavorObj.price;
                                    }
                                }
                                return (displayPrice * quantity).toFixed(2);
                            })()} €
                        </span>
                        <span className="product-detail__tax-note">Taxes incluses. Frais d'expédition calculés à l'étape de paiement.</span>
                    </div>

                    <ul className="product-detail__highlights">
                        {product.highlights ? (
                            product.highlights.map((highlight, index) => (
                                <li key={index}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    {highlight}
                                </li>
                            ))
                        ) : (
                            // Default static highlights if none provided (backward compatibility)
                            <>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    Haute qualité garantie
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                    Expédition rapide
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Flavor Selection */}
                    {product.flavors && (
                        <div className="product-detail__selector-group">
                            <label className="product-detail__label" htmlFor="flavor-select">Saveur</label>
                            <div className="custom-select-wrapper">
                                <select
                                    id="flavor-select"
                                    className="custom-select"
                                    value={selectedFlavor || ''}
                                    onChange={(e) => {
                                        const flavorName = e.target.value;
                                        const flavorObj = product.flavors?.find(f => (typeof f === 'string' ? f : f.name) === flavorName);
                                        if (flavorObj) handleFlavorChange(flavorObj);
                                    }}
                                >
                                    {product.flavors.map(flavor => {
                                        const fName = typeof flavor === 'string' ? flavor : flavor.name;
                                        return (
                                            <option key={fName} value={fName}>
                                                {fName}
                                            </option>
                                        )
                                    })}
                                </select>
                                <div className="custom-select-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                            </div>
                        </div>
                    )}



                    {/* Quantity & Actions (All on the same line) */}
                    <div className="product-detail__actions-row">
                        <div className="product-detail__quantity">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                disabled={quantity <= 1}
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="btn btn-primary btn-lg product-detail__add-btn"
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            {product.inStock ? 'Ajouter' : 'Rupture'}
                        </button>

                        <button
                            className={`btn btn-secondary btn-lg product-detail__wishlist-btn ${isLiked ? 'active' : ''} `}
                            onClick={handleToggleWishlist}
                            aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
                        >
                            <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>

                    <div className="product-detail__trust-features">
                        <div className="trust-feature">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                            Service de retrait disponible à Bodystart Nutrition Coignières
                        </div>
                        <div className="trust-feature-sub">Habituellement prête en 2 heures</div>
                        <a href="#" className="trust-link">Afficher les informations de la boutique</a>
                    </div>
                </motion.div>
            </div>

            {/* Tabs */}
            <section className="product-detail__tabs container">
                <div className="tabs-nav">
                    <button
                        className={activeTab === 'description' ? 'active' : ''}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button
                        className={activeTab === 'nutrition' ? 'active' : ''}
                        onClick={() => setActiveTab('nutrition')}
                    >
                        Valeurs Nutritionnelles
                    </button>
                    <button
                        className={activeTab === 'usage' ? 'active' : ''}
                        onClick={() => setActiveTab('usage')}
                    >
                        Conseils d'utilisation
                    </button>
                    <button
                        className={activeTab === 'ingredients' ? 'active' : ''}
                        onClick={() => setActiveTab('ingredients')}
                    >
                        Composition
                    </button>
                </div>

                <div className="tabs-content">
                    {activeTab === 'description' && (
                        <div className="tab-panel">
                            {product.description.split('\n\n').map((paragraph, index) => (
                                <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                            ))}
                        </div>
                    )}

                    {activeTab === 'nutrition' && (
                        <div className="tab-panel">
                            {(() => {
                                const parsedMetafield = parseNutritionMetafield(product.metafieldNutrition);
                                const nutritionData = parsedMetafield || product.nutritionalValues;
                                const aminogramData = parsedMetafield?.aminogram || product.aminogram;

                                if (nutritionData || aminogramData) {
                                    return (
                                        <>
                                            {nutritionData && (
                                                <div style={{ marginBottom: '2rem' }}>
                                                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
                                                        Apports nutritionnels {nutritionData.energy100g ? '' : `(pour ${nutritionData.portion})`}
                                                    </h4>
                                                    <table className="nutrition-table" style={{ width: '100%', maxWidth: '600px', borderCollapse: 'collapse', color: 'var(--color-text-secondary)' }}>
                                                        {nutritionData.energy100g ? (
                                                            <>
                                                                <thead>
                                                                    <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'right' }}>
                                                                        <th style={{ textAlign: 'left', paddingBottom: '8px' }}>Valeurs</th>
                                                                        <th style={{ paddingBottom: '8px', paddingLeft: '16px' }}>Pour 100g</th>
                                                                        <th style={{ paddingBottom: '8px', paddingLeft: '16px' }}>Pour {nutritionData.portion}</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr><td>Énergie</td><td style={{ textAlign: 'right' }}>{nutritionData.energy100g}</td><td style={{ textAlign: 'right' }}>{nutritionData.energy}</td></tr>
                                                                    <tr><td>Matières grasses</td><td style={{ textAlign: 'right' }}>{nutritionData.fats100g}</td><td style={{ textAlign: 'right' }}>{nutritionData.fats}</td></tr>
                                                                    <tr><td style={{ paddingLeft: '1rem', fontSize: '0.9em' }}>dont acides gras saturés</td><td style={{ textAlign: 'right' }}>{nutritionData.fatsSaturated100g}</td><td style={{ textAlign: 'right' }}>{nutritionData.fatsSaturated}</td></tr>
                                                                    <tr><td>Glucides</td><td style={{ textAlign: 'right' }}>{nutritionData.carbs100g}</td><td style={{ textAlign: 'right' }}>{nutritionData.carbs}</td></tr>
                                                                    <tr><td style={{ paddingLeft: '1rem', fontSize: '0.9em' }}>dont sucres</td><td style={{ textAlign: 'right' }}>{nutritionData.carbsSugar100g}</td><td style={{ textAlign: 'right' }}>{nutritionData.carbsSugar}</td></tr>
                                                                    <tr><td>Protéines</td><td style={{ textAlign: 'right' }}>{nutritionData.protein100g}</td><td style={{ textAlign: 'right' }}>{nutritionData.protein}</td></tr>
                                                                    <tr><td>Sel</td><td style={{ textAlign: 'right' }}>{nutritionData.salt100g}</td><td style={{ textAlign: 'right' }}>{nutritionData.salt}</td></tr>
                                                                </tbody>
                                                            </>
                                                        ) : (
                                                            <tbody>
                                                                <tr><td>Énergie</td><td style={{ textAlign: 'right' }}>{nutritionData.energy}</td></tr>
                                                                <tr><td>Matières grasses</td><td style={{ textAlign: 'right' }}>{nutritionData.fats}</td></tr>
                                                                <tr><td style={{ paddingLeft: '1rem', fontSize: '0.9em' }}>dont acides gras saturés</td><td style={{ textAlign: 'right' }}>{nutritionData.fatsSaturated}</td></tr>
                                                                <tr><td>Glucides</td><td style={{ textAlign: 'right' }}>{nutritionData.carbs}</td></tr>
                                                                <tr><td style={{ paddingLeft: '1rem', fontSize: '0.9em' }}>dont sucres</td><td style={{ textAlign: 'right' }}>{nutritionData.carbsSugar}</td></tr>
                                                                <tr><td>Protéines</td><td style={{ textAlign: 'right' }}>{nutritionData.protein}</td></tr>
                                                                <tr><td>Sel</td><td style={{ textAlign: 'right' }}>{nutritionData.salt}</td></tr>
                                                            </tbody>
                                                        )}
                                                    </table>
                                                </div>
                                            )}

                                            {aminogramData && (
                                                <div>
                                                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Aminogramme Moyen (Pour {product.aminogramPortion || '100 g'})</h4>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                                        {aminogramData.map((amino: any, idx: number) => (
                                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                                                                <span>{amino.label}</span>
                                                                <span style={{ color: 'var(--color-text-primary)' }}>{amino.value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    );
                                } else if (product.metafieldNutrition) {
                                    return <div dangerouslySetInnerHTML={{ __html: product.metafieldNutrition.replace(/\n/g, '<br />') }} />;
                                } else {
                                    return <p>Informations nutritionnelles non disponibles.</p>;
                                }
                            })()}
                        </div>
                    )}

                    {activeTab === 'ingredients' && (
                        <div className="tab-panel">
                            {product.metafieldComposition ? (
                                <div dangerouslySetInnerHTML={{ __html: product.metafieldComposition.replace(/\n/g, '<br />') }} />
                            ) : (
                                <p style={{ whiteSpace: 'pre-line' }}>{product.ingredients || 'Informations non disponibles.'}</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'usage' && (
                        <div className="tab-panel">
                            {product.metafieldUsage ? (
                                <div dangerouslySetInnerHTML={{ __html: product.metafieldUsage.replace(/\n/g, '<br />') }} />
                            ) : (
                                <>
                                    {product.usage && product.usage.split('\n\n').map((paragraph, index) => (
                                        <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                                    ))}
                                    {product.precautions && (
                                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,50,50,0.05)', borderRadius: '8px', border: '1px solid rgba(255,50,50,0.2)' }}>
                                            <h4 style={{ color: '#ff4b4b', marginBottom: '0.5rem', fontSize: '1rem' }}>Précautions d'emploi</h4>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{product.precautions}</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="section product-detail__related container">
                    <div className="section-title">
                        <h2>Produits <span className="text-gradient">similaires</span></h2>
                    </div>
                    <div className="products-grid grid grid-4">
                        {relatedProducts.map((p, index) => (
                            <ProductCard key={p.id} product={p} index={index} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
