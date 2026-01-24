// Service pour rechercher les villes par code postal via l'API du gouvernement français
export interface City {
    nom: string;
    code: string;
    codeDepartement: string;
    codeRegion: string;
    codesPostaux: string[];
}

export interface PostalCodeResult {
    postalCode: string;
    cities: string[];
}

/**
 * Recherche les villes correspondant à un code postal français
 * Utilise l'API geo.api.gouv.fr
 */
export async function searchCitiesByPostalCode(postalCode: string): Promise<string[]> {
    // Valider le format du code postal (5 chiffres)
    if (!/^\d{5}$/.test(postalCode)) {
        return [];
    }

    try {
        const response = await fetch(
            `https://geo.api.gouv.fr/communes?codePostal=${postalCode}&fields=nom,codesPostaux&format=json`
        );

        if (!response.ok) {
            console.error('Erreur API geo.api.gouv.fr:', response.status);
            return [];
        }

        const cities: City[] = await response.json();

        // Retourner les noms des villes triés alphabétiquement
        return cities
            .map(city => city.nom)
            .sort((a, b) => a.localeCompare(b, 'fr'));
    } catch (error) {
        console.error('Erreur lors de la recherche de villes:', error);
        return [];
    }
}

/**
 * Formate une adresse complète avec code postal et ville
 */
export function formatCityWithPostalCode(postalCode: string, city: string): string {
    return `${postalCode} ${city}`;
}
