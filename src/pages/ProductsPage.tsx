import { useState, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'
import { products, categories, brands, getProductsByCategory } from '../data/products'
import './ProductsPage.css'

export default function ProductsPage() {
    const { category } = useParams()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''

    const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState('default')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])

    const currentCategory = categories.find(c => c.id === category)

    const filteredProducts = useMemo(() => {
        let result: Product[] = category ? getProductsByCategory(category) : products

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query)
            )
        }

        // Filter by brand
        if (selectedBrand) {
            const brandName = brands.find(b => b.id === selectedBrand)?.name
            result = result.filter(p => p.brand === brandName)
        }

        // Filter by price
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result = [...result].sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                result = [...result].sort((a, b) => b.price - a.price)
                break
            case 'name':
                result = [...result].sort((a, b) => a.name.localeCompare(b.name))
                break
        }

        return result
    }, [category, selectedBrand, sortBy, priceRange, searchQuery])

    return (
        <div className="products-page">
            {/* Header */}
            <section className="products-page__header">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1>
                            {currentCategory ? (
                                <>
                                    <span className="products-page__icon">{currentCategory.icon}</span>
                                    {currentCategory.name}
                                </>
                            ) : (
                                <>Tous nos <span className="text-gradient">Produits</span></>
                            )}
                        </h1>
                        <p>{filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}</p>
                    </motion.div>
                </div>
            </section>

            <div className="products-page__content container">
                {/* Sidebar Filters */}
                <aside className="products-page__sidebar">
                    <div className="filter-section">
                        <h3>Catégories</h3>
                        <ul className="filter-list">
                            <li>
                                <a
                                    href="/produits"
                                    className={`filter-link ${!category ? 'active' : ''}`}
                                >
                                    Tous les produits
                                </a>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <a
                                        href={`/produits/${cat.id}`}
                                        className={`filter-link ${category === cat.id ? 'active' : ''}`}
                                    >
                                        <span>{cat.icon}</span>
                                        {cat.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-section">
                        <h3>Marques</h3>
                        <ul className="filter-list">
                            <li>
                                <button
                                    className={`filter-btn ${!selectedBrand ? 'active' : ''}`}
                                    onClick={() => setSelectedBrand(null)}
                                >
                                    Toutes les marques
                                </button>
                            </li>
                            {brands.map(brand => (
                                <li key={brand.id}>
                                    <button
                                        className={`filter-btn ${selectedBrand === brand.id ? 'active' : ''}`}
                                        onClick={() => setSelectedBrand(brand.id)}
                                    >
                                        {brand.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-section">
                        <h3>Prix</h3>
                        <div className="price-range">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                                className="price-slider"
                            />
                            <div className="price-labels">
                                <span>0€</span>
                                <span>{priceRange[1]}€</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="products-page__main">
                    {/* Sort bar */}
                    <div className="products-page__toolbar">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="default">Trier par</option>
                            <option value="price-asc">Prix croissant</option>
                            <option value="price-desc">Prix décroissant</option>
                            <option value="name">Nom A-Z</option>
                        </select>
                    </div>

                    {/* Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="products-grid grid grid-3">
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="products-page__empty">
                            <span>😕</span>
                            <p>Aucun produit ne correspond à vos critères</p>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setSelectedBrand(null)
                                    setPriceRange([0, 100])
                                }}
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
