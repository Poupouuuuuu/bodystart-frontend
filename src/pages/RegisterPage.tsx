import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import PageTitle from '../components/PageTitle'
import './LoginPage.css' // Reuse login styles

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock registration -> login
        login(email)
        navigate('/dashboard')
    }

    return (
        <div className="login-page">
            <PageTitle title="Inscription" />
            <div className="container">
                <motion.div
                    className="auth-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="auth-header">
                        <h1>Inscription</h1>
                        <p>Rejoignez la communauté Bodystart</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nom complet</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Votre nom"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="exemple@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-extra">
                            <label className="checkbox-label">
                                <input type="checkbox" required />
                                <span>J'accepte les CGV et la politique de confidentialité</span>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">
                            Créer mon compte
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Déjà un compte ? <Link to="/connexion">Se connecter</Link></p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
