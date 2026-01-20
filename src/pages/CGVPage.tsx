import PageTitle from '../components/PageTitle'
import './LegalPage.css'

export default function CGVPage() {
    return (
        <div className="legal-page container">
            <PageTitle title="Conditions Générales de Vente" />
            <h1>Conditions Générales de Vente</h1>

            <section className="legal-section">
                <h2>Article 1 : Objet</h2>
                <p>
                    Les présentes conditions générales de vente régissent l'ensemble des relations entre la société Bodystart Nutrition
                    et ses clients. Elles s'appliquent sans restriction ni réserve à l'ensemble des ventes conclues sur le présent site.
                </p>
            </section>

            <section className="legal-section">
                <h2>Article 2 : Produits</h2>
                <p>
                    Les produits proposés à la vente sont ceux qui figurent sur le site, dans la limite des stocks disponibles.
                    Les photographies ne sont pas contractuelles.
                </p>
            </section>

            <section className="legal-section">
                <h2>Article 3 : Prix</h2>
                <p>
                    Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC).
                    Les frais de traitement et d'expédition sont facturés en supplément.
                </p>
            </section>

            <section className="legal-section">
                <h2>Article 4 : Commande</h2>
                <p>
                    L'acheteur valide sa commande lorsqu'il active le lien "Confirmer ma commande" en bas de la page
                    "Récapitulatif de votre commande" après avoir accepté les présentes conditions de vente.
                </p>
            </section>

            <section className="legal-section">
                <h2>Article 5 : Click & Collect</h2>
                <p>
                    Le service de Click & Collect permet de retirer commande gratuitement en magasin au 123 Rue du Fitness, 75000 Paris,
                    aux horaires d'ouverture : Lun-Sam de 9h30 à 19h30.
                </p>
            </section>
        </div>
    )
}
