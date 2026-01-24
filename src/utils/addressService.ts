// Service d'autocomplétion d'adresse via l'API adresse.data.gouv.fr
export interface AddressSuggestion {
    label: string;        // Adresse complète formatée
    street: string;       // Numéro + rue
    city: string;         // Ville
    postcode: string;     // Code postal
    context: string;      // Département, région
}

/**
 * Recherche d'adresses françaises avec autocomplétion
 */
export async function searchAddress(query: string): Promise<AddressSuggestion[]> {
    if (query.length < 3) return [];

    try {
        const response = await fetch(
            `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`
        );

        if (!response.ok) return [];

        const data = await response.json();

        return data.features.map((feature: any) => ({
            label: feature.properties.label,
            street: feature.properties.name,
            city: feature.properties.city,
            postcode: feature.properties.postcode,
            context: feature.properties.context
        }));
    } catch (error) {
        console.error('Erreur recherche adresse:', error);
        return [];
    }
}

// Liste des pays (les plus courants en premier)
export const countries = [
    'France',
    'Belgique',
    'Suisse',
    'Luxembourg',
    'Canada',
    'Monaco',
    '---',
    'Afghanistan',
    'Afrique du Sud',
    'Albanie',
    'Algérie',
    'Allemagne',
    'Andorre',
    'Angola',
    'Arabie Saoudite',
    'Argentine',
    'Arménie',
    'Australie',
    'Autriche',
    'Azerbaïdjan',
    'Bahreïn',
    'Bangladesh',
    'Bénin',
    'Biélorussie',
    'Bolivie',
    'Bosnie-Herzégovine',
    'Botswana',
    'Brésil',
    'Bulgarie',
    'Burkina Faso',
    'Burundi',
    'Cambodge',
    'Cameroun',
    'Cap-Vert',
    'Chili',
    'Chine',
    'Chypre',
    'Colombie',
    'Comores',
    'Corée du Nord',
    'Corée du Sud',
    'Costa Rica',
    'Côte d\'Ivoire',
    'Croatie',
    'Cuba',
    'Danemark',
    'Djibouti',
    'Égypte',
    'Émirats arabes unis',
    'Équateur',
    'Espagne',
    'Estonie',
    'États-Unis',
    'Éthiopie',
    'Finlande',
    'Gabon',
    'Gambie',
    'Géorgie',
    'Ghana',
    'Grèce',
    'Guatemala',
    'Guinée',
    'Haïti',
    'Honduras',
    'Hongrie',
    'Inde',
    'Indonésie',
    'Irak',
    'Iran',
    'Irlande',
    'Islande',
    'Israël',
    'Italie',
    'Jamaïque',
    'Japon',
    'Jordanie',
    'Kazakhstan',
    'Kenya',
    'Koweït',
    'Lettonie',
    'Liban',
    'Libye',
    'Liechtenstein',
    'Lituanie',
    'Macédoine du Nord',
    'Madagascar',
    'Malaisie',
    'Mali',
    'Malte',
    'Maroc',
    'Maurice',
    'Mauritanie',
    'Mexique',
    'Moldavie',
    'Mongolie',
    'Monténégro',
    'Mozambique',
    'Namibie',
    'Népal',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norvège',
    'Nouvelle-Zélande',
    'Oman',
    'Ouganda',
    'Pakistan',
    'Palestine',
    'Panama',
    'Paraguay',
    'Pays-Bas',
    'Pérou',
    'Philippines',
    'Pologne',
    'Portugal',
    'Qatar',
    'République dominicaine',
    'République tchèque',
    'Roumanie',
    'Royaume-Uni',
    'Russie',
    'Rwanda',
    'Salvador',
    'Sénégal',
    'Serbie',
    'Singapour',
    'Slovaquie',
    'Slovénie',
    'Somalie',
    'Soudan',
    'Sri Lanka',
    'Suède',
    'Syrie',
    'Taïwan',
    'Tanzanie',
    'Tchad',
    'Thaïlande',
    'Togo',
    'Tunisie',
    'Turquie',
    'Ukraine',
    'Uruguay',
    'Vénézuela',
    'Vietnam',
    'Yémen',
    'Zambie',
    'Zimbabwe'
];
