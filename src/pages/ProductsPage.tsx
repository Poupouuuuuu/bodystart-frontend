import { useState, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'
import { products, categories, brands, getProductsByCategory } from '../data/products'
import './ProductsPage.css'

const FilterSection = ({ title, activeLabel, isOpen, onToggle, children }: { title: string, activeLabel?: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) => (
    <div className="filter-section">
        <div onClick={onToggle} style={{ cursor: 'pointer', marginBottom: isOpen ? '1rem' : '0', transition: 'margin 0.3s ease' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                {title}
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </motion.span>
            </h3>
            {activeLabel && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="filter-active-label"
                    style={{ fontSize: '0.85rem', color: '#88cc33', fontWeight: 500 }}
                >
                    {activeLabel}
                </motion.div>
            )}
        </div>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                >
                    <div>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
)

export default function ProductsPage() {
    const { category } = useParams()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''

    const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState('default')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])

    const [expandedSections, setExpandedSections] = useState({
        categories: false,
        brands: false,
        price: true
    })

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const currentCategory = categories.find(c => c.id === category)
    const currentBrand = brands.find(b => b.id === selectedBrand)

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

        // Filter by tag (sub-category)
        if (selectedTag) {
            result = result.filter(p => p.tags && p.tags.includes(selectedTag))
        }

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
    }, [category, selectedBrand, sortBy, priceRange, searchQuery, selectedTag])

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
                    <FilterSection
                        title="Catégories"
                        activeLabel={currentCategory?.name || "Tous les produits"}
                        isOpen={expandedSections.categories}
                        onToggle={() => toggleSection('categories')}
                    >
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
                    </FilterSection>

                    <FilterSection
                        title="Marques"
                        activeLabel={currentBrand?.name || "Toutes les marques"}
                        isOpen={expandedSections.brands}
                        onToggle={() => toggleSection('brands')}
                    >
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
                    </FilterSection>

                    <FilterSection
                        title="Prix"
                        isOpen={expandedSections.price}
                        onToggle={() => toggleSection('price')}
                    >
                        <div className="price-range">
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                                className="price-slider"
                            />
                            <div className="price-labels">
                                <span>0€</span>
                                <span>{priceRange[1]}€</span>
                            </div>
                        </div>
                    </FilterSection>
                </aside>

                {/* Products Grid */}
                <div className="products-page__main">
                    {/* Sort and Filters */}
                    <div className="products-page__toolbar">
                        {/* Sub-filters (Tags) */}
                        {category === 'proteines' && (
                            <div className="products-page__filters">
                                <button
                                    className={`filter-chip ${!selectedTag ? 'active' : ''}`}
                                    onClick={() => setSelectedTag(null)}
                                >
                                    Tout
                                </button>
                                <button
                                    className={`filter-chip ${selectedTag === 'isolate' ? 'active' : ''}`}
                                    onClick={() => setSelectedTag('isolate')}
                                >
                                    Isolate (ISO)
                                </button>
                                <button
                                    className={`filter-chip ${selectedTag === 'gainer' ? 'active' : ''}`}
                                    onClick={() => setSelectedTag('gainer')}
                                >
                                    Gainers
                                </button>
                                <button
                                    className={`filter-chip ${selectedTag === 'whey' ? 'active' : ''}`}
                                    onClick={() => setSelectedTag('whey')}
                                >
                                    Whey
                                </button>
                            </div>
                        )}

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
