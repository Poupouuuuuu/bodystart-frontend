import PageTitle from '../components/PageTitle'
import './LegalPage.css'

export default function PrivacyPage() {
    return (
        <div className="legal-page container">
            <PageTitle title="Politique de Confidentialité" />
            <h1>Politique de Confidentialité</h1>

            <section className="legal-section">
                <h2>1. Collecte des données</h2>
                <p>
                    Les données personnelles collectées sur ce site sont uniquement destinées à l'usage exclusif de Bodystart Nutrition
                    pour la gestion des commandes et la relation client.
                </p>
            </section>

            <section className="legal-section">
                <h2>2. Utilisation des données</h2>
                <p>
                    Vos données sont utilisées pour :
                </p>
                <ul>
                    <li>Traiter vos commandes et livraisons</li>
                    <li>Vous informer sur l'état de votre commande</li>
                    <li>Vous envoyer des offres promotionnelles (si accepté)</li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>3. Vos droits</h2>
                <p>
                    Conformément à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression
                    des données vous concernant. Vous pouvez exercer ce droit en nous contactant par email.
                </p>
            </section>

            <section className="legal-section">
                <h2>4. Cookies</h2>
                <p>
                    Ce site utilise des cookies pour améliorer votre expérience utilisateur et réaliser des statistiques de visites.
                </p>
            </section>
        </div>
    )
}
