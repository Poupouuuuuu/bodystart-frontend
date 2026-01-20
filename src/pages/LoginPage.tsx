import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import PageTitle from '../components/PageTitle'
import './LoginPage.css'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const { addToast } = useToast()
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate admin login if email contains 'admin'
        const role = email.includes('admin') ? 'admin' : 'user'
        login(email, role)
        const name = email.split('@')[0]
        addToast(`Bienvenue, ${name} !`, 'success')
        navigate(role === 'admin' ? '/admin' : '/dashboard')
    }

    return (
        <div className="login-page">
            <PageTitle title="Connexion" />
            <div className="container">
                <motion.div
                    className="auth-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="auth-header">
                        <h1>Connexion</h1>
                        <p>Heureux de vous revoir chez Bodystart</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
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
                                <input type="checkbox" />
                                <span>Se souvenir de moi</span>
                            </label>
                            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">
                            Se connecter
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Pas encore de compte ? <Link to="/inscription">S'inscrire</Link></p>
                        <div className="admin-hint">
                            (Astuce : utilisez "admin" dans l'email pour le mode admin)
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
