import PageTitle from '../components/PageTitle'
import './LegalPage.css'

export default function LegalPage() {
    return (
        <div className="legal-page container">
            <PageTitle title="Mentions Légales" />
            <h1>Mentions Légales</h1>

            <section className="legal-section">
                <h2>1. Éditeur du site</h2>
                <p>
                    Le site <strong>Bodystart Nutrition</strong> est édité par la société BODYSTART NUTRITION.<br />
                    Siège social : 123 Rue du Commerce, 75001 Paris, France.<br />
                    Téléphone : 07 61 84 75 80<br />
                    Email : contact@bodystart-nutrition.fr
                </p>
            </section>

            <section className="legal-section">
                <h2>2. Directeur de la publication</h2>
                <p>La Direction de Bodystart Nutrition.</p>
            </section>

            <section className="legal-section">
                <h2>3. Hébergement</h2>
                <p>
                    Ce site est hébergé par Vercel Inc.<br />
                    440 N Barranca Ave #4133, Covina, CA 91723<br />
                    États-Unis
                </p>
            </section>

            <section className="legal-section">
                <h2>4. Propriété Intellectuelle</h2>
                <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                    Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
            </section>
        </div>
    )
}
