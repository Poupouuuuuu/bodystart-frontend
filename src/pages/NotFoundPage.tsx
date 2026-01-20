import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTitle from '../components/PageTitle'
import './NotFoundPage.css'

export default function NotFoundPage() {
    return (
        <div className="not-found-page">
            <PageTitle title="Page Introuvable" />
            <div className="container">
                <motion.div
                    className="not-found-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="error-code">404</div>
                    <h1>Page Introuvable</h1>
                    <p>Oups ! La page que vous cherchez semble avoir disparu dans le néant.</p>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Retour à l'accueil
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
