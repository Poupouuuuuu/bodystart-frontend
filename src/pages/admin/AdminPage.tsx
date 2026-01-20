import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { products, type Product } from '../../data/products'
import PageTitle from '../../components/PageTitle'
import './AdminPage.css'

export default function AdminPage() {
    const { user, isAdmin } = useAuth()
    const [searchTerm, setSearchTerm] = useState('')
    const [productList, setProductList] = useState<Product[]>(products)

    // Route protection is handled here for simplicity, 
    // but could be done with a ProtectedRoute wrapper
    if (!user || !isAdmin) {
        return (
            <div className="admin-unauthorized">
                <div className="container">
                    <h1>Accès refusé</h1>
                    <p>Vous n'avez pas les droits nécessaires pour accéder à cette page.</p>
                    <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
                </div>
            </div>
        )
    }

    const filteredProducts = productList.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            setProductList(prev => prev.filter(p => p.id !== id))
        }
    }

    return (
        <div className="admin-page">
            <PageTitle title="Administration" />
            <div className="container">
                <div className="admin-header">
                    <div>
                        <h1>Administration</h1>
                        <p>Gérez vos produits et commandes</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => alert('Fonctionnalité à venir')}>
                        + Nouveau Produit
                    </button>
                </div>

                <div className="admin-stats">
                    <div className="stat-card">
                        <h3>Total Produits</h3>
                        <p className="stat-value">{productList.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Ventes du mois</h3>
                        <p className="stat-value">1,240€</p>
                    </div>
                    <div className="stat-card">
                        <h3>Commandes en cours</h3>
                        <p className="stat-value">5</p>
                    </div>
                    <div className="stat-card">
                        <h3>Clients inscrits</h3>
                        <p className="stat-value">142</p>
                    </div>
                </div>

                <div className="admin-content">
                    <div className="admin-filters">
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Nom</th>
                                    <th>Marque</th>
                                    <th>Prix</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>
                                            <img src={product.image} alt={product.name} className="table-img" />
                                        </td>
                                        <td className="font-bold">{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.price}€</td>
                                        <td>
                                            <span className={`status-badge ${product.inStock ? 'success' : 'error'}`}>
                                                {product.inStock ? 'En stock' : 'Rupture'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon edit" aria-label="Editer">
                                                    ✏️
                                                </button>
                                                <button
                                                    className="btn-icon delete"
                                                    onClick={() => handleDelete(product.id)}
                                                    aria-label="Supprimer"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
