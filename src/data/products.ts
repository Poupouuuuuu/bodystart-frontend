export interface Product {
    id: string
    name: string
    brand: string
    category: string
    price: number
    oldPrice?: number
    image: string
    description: string
    ingredients?: string
    usage?: string
    precautions?: string
    weight?: string
    servings?: string
    highlights?: string[]
    tags?: string[]
    flavors?: (string | { name: string; image?: string })[]
    nutritionalValues?: {
        portion: string
        energy: string
        energy100g?: string
        fats: string
        fats100g?: string
        fatsSaturated: string
        fatsSaturated100g?: string
        carbs: string
        carbs100g?: string
        carbsSugar: string
        carbsSugar100g?: string
        protein: string
        protein100g?: string
        salt: string
        salt100g?: string
    }
    aminogram?: {
        label: string
        value: string
    }[]
    aminogramPortion?: string
    inStock: boolean
    isBestseller?: boolean
    isNew?: boolean
}

export const categories = [
    { id: 'proteines', name: 'Protéines', icon: '', image: '/images/products/iso-zero/vanille.png' },
    { id: 'creatine', name: 'Créatine', icon: '', image: '/images/categories/creatine.png' },
    { id: 'vitamines', name: 'Vitamines & Minéraux', icon: '', image: '/images/categories/vitamines.png' },
    { id: 'omega3', name: 'Oméga-3', icon: '', image: '/images/categories/omega3.png' },
    { id: 'pre-workout', name: 'Pré-Workout', icon: '', image: '/images/categories/pre-workout.png' },
    { id: 'bruleurs', name: 'Brûleurs de Graisses', icon: '', image: '/images/categories/bruleurs.png' },
    { id: 'bcaa', name: 'Acides Aminés', icon: '', image: '/images/categories/bcaa.png' },
    { id: 'snacks', name: 'Snacks & Barres', icon: '🍫', image: '' },
]

export const brands = [
    { id: 'eric-favre', name: 'Eric Favre' },
    { id: 'nutrimuscle', name: 'NutriMuscle' },
    { id: 'coregenic', name: 'Coregenic' },
    { id: 'french-nutrition', name: 'French Nutrition' },
]

export const products: Product[] = [
    // Eric Favre
    {
        id: 'ef-iso-zero',
        name: 'Iso Zero 100% Whey',
        brand: 'Eric Favre',
        category: 'proteines',
        price: 69.99,
        image: '/images/products/iso-zero/vanille.png',
        tags: ['bestseller', 'protein', 'isolate'],
        description: `ISO ZERO est constituée de 85% de protéines de whey (WPI, WPC), l’une des plus pures sources de protéines. Ces 85% de protéines proviennent uniquement de la whey : sans ajout d’acides aminés synthétiques, ni collagène. Preuve de sa qualité également, son indice chimique supérieur à 100.

Le laboratoire Eric Favre® l’a sélectionné pour son assimilation rapide permettant le développement musculaire. En effet, les protéines contribuent à augmenter la masse musculaire. De par son process d’extraction, la protéine n’est que très peu dénaturée et lui assure une très bonne digestion.

ANTI-DOPAGE : Produit conforme à la règlementation Anti-dopage, conforme à la norme AFNOR NF V94-001 (à la date de fabrication du lot).`,
        ingredients: `ISOLAT DE PROTEINES DE LACTOSERUM (WHEY) (LAIT) (77%) ; CONCENTRE DE PROTEINES DE LACTOSERUM (WHEY) (LAIT) (17%) ; AROME (2,7%) ; EMULSIFIANTS : CARBOXYMETHYLCELLULOSE, LECITHINE DE TOURNESOL ; EPAISSISSANTS : GOMME DE GUAR, GOMME DE XANTHANE ; SEL ; EDULCORANTS : SUCRALOSE, ACESULFAME K.

Produit dans un atelier qui utilise du gluten, des œufs, des graines de sésame, des noix, du céleri et des sulfites.`,
        usage: `Les jours d’entraînement : prendre 1 mesure de 30g dans 150 à 200ml d’eau une heure avant l’entraînement puis une mesure de 30g juste après l’entraînement pour apporter aux muscles les protéines nécessaires pour le développement musculaire.

Les jours de repos : prendre 1 mesure de 30g dans 150 à 200ml d’eau en encas à 10H ou à 16H le soir avant le coucher.`,
        precautions: `Ne pas dépasser la dose journalière recommandée. Tenir hors de portée des jeunes enfants. A utiliser dans le cadre d’une alimentation variée et d’un mode de vie sain. Bien refermer le pot entre chaque utilisation. A conserver à l’abri de la chaleur, de la lumière et de l’humidité.`,
        nutritionalValues: {
            portion: "30g",
            energy: "462kj / 110kcal",
            fats: "0.7g (dont acides gras saturés : 0.4g)",
            fatsSaturated: "0.4g",
            carbs: "0.7g (dont sucres : 0.5g)",
            carbsSugar: "0.5g",
            protein: "25.4g",
            salt: "0.18g"
        },
        aminogram: [
            { label: 'L-Lysine', value: '8010 mg' },
            { label: 'L-Methionine', value: '1850 mg' },
            { label: 'L-Phenylalanine', value: '2740 mg' },
            { label: 'L-Histidine', value: '1510 mg' },
            { label: 'L-Threonine', value: '6070 mg' },
            { label: 'L-Tryptophan', value: '1120 mg' },
            { label: 'L-Alanine', value: '4070 mg' },
            { label: 'L-Arginine', value: '1740 mg' },
            { label: 'L-Aspartic acid', value: '7370 mg' },
            { label: 'L-Cysteine', value: '1760 mg' },
            { label: 'L-Glutamic acid', value: '12090 mg' },
            { label: 'Glycine', value: '1450 mg' },
            { label: 'L-Proline', value: '5220 mg' },
            { label: 'L-Serine', value: '4230 mg' },
            { label: 'L-Tyrosine', value: '2490 mg' },
            { label: 'L-Isoleucine (BCAA)', value: '5390 mg' },
            { label: 'L-Leucine (BCAA)', value: '8570 mg' },
            { label: 'L-Valine (BCAA)', value: '4890 mg' },
        ],
        weight: '1.5 kg',
        flavors: [
            { name: 'Vanille', image: '/images/products/iso-zero/vanille.png' },
            { name: 'Chocotella', image: '/images/products/iso-zero/chocotella.png' },
            { name: 'Cookie & Cream', image: '/images/products/iso-zero/cookie.png' },
            { name: 'Chocolat au Lait', image: '/images/products/iso-zero/chocolat-au-lait.png' },
            { name: 'Choco Peanut Butter', image: '/images/products/iso-zero/choco-peanut-butter.png' },
            { name: 'Framboisier', image: '/images/products/iso-zero/framboisier.png' },
            { name: 'Pistache', image: '/images/products/iso-zero/pistache.png' },
            { name: 'Choco Intense', image: '/images/products/iso-zero/choco-intense.png' },
            { name: 'Neutre', image: '/images/products/iso-zero/neutre.png' },
            { name: 'Café Latte', image: '/images/products/iso-zero/cafe-latte.png' }
        ],
        inStock: true,
        isBestseller: true,
    },


    {
        id: 'ef-creatine-mono',
        name: 'Créatine Monohydrate Pure',
        brand: 'Eric Favre',
        category: 'creatine',
        price: 19.90,
        image: 'https://images.unsplash.com/photo-1614859324967-bdf413c05277?w=400',
        description: 'Créatine monohydrate pure à 99.9%. Améliore les performances et la force musculaire.',
        ingredients: 'Créatine monohydrate 100%.',
        usage: '3 à 5g par jour, de préférence après l\'entraînement avec des glucides.',
        weight: '500g',
        inStock: true,
        isBestseller: true,
    },
    {
        id: 'ef-bcaa-811',
        name: 'BCAA 8:1:1',
        brand: 'Eric Favre',
        category: 'bcaa',
        price: 24.90,
        image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400',
        description: 'BCAA avec ratio 8:1:1 pour une récupération optimale. Enrichi en vitamine B6.',
        ingredients: 'L-Leucine, L-Isoleucine, L-Valine, Vitamine B6.',
        usage: '10g avant ou pendant l\'entraînement.',
        weight: '500g',
        inStock: true,
    },
    {
        id: 'ef-creatine-pro-zero',
        name: 'Creatine Pro Zero',
        brand: 'Eric Favre',
        category: 'creatine',
        price: 24.90,
        image: '/images/products/eric-favre/creatine-pro-zero.png',
        description: 'Creatine Pro Zero est une créatine monohydrate micronisée (200 Mesh) pure, conçue pour les athlètes exigeants. Formule Vegan, sans aspartame et sans conservateurs pour une performance optimale.',
        ingredients: 'Créatine monohydrate micronisée.',
        usage: 'Prendre 1 mesure (3g) diluée dans 200-250ml d\'eau, de préférence après l\'entraînement.',
        precautions: 'Se conformer aux conseils d\'utilisation. Tenir hors de portée des jeunes enfants. À consommer dans le cadre d\'une alimentation équilibrée et d\'un mode de vie sain.',
        weight: '300g',
        servings: '100 doses',
        highlights: [
            'Créatine Monohydrate Micronisée',
            '200 Mesh - Dissolution optimale',
            'Vegan Friendly',
            'Sans Aspartame',
            'Sans Conservateurs'
        ],
        nutritionalValues: {
            portion: "3g",
            energy: "0kj / 0kcal",
            fats: "0g",
            fatsSaturated: "0g",
            carbs: "0g",
            carbsSugar: "0g",
            protein: "0g",
            salt: "0g"
        },
        tags: ['vegan', 'creatine', 'micronized'],
        inStock: true,
        isNew: true,
    },
    {
        id: 'ef-clear-pro-creatine',
        name: 'Clear Pro Creatine',
        brand: 'Eric Favre',
        category: 'creatine',
        price: 29.90,
        image: '/images/products/eric-favre/clear-pro-creatine-peche.png',
        description: `Clear Pro Creatine est une créatine monohydrate idéale pour les sportifs à la recherche de performance. Naturellement présente dans l’organisme et principalement stockée dans les muscles squelettiques, la créatine est un dérivé d’acides aminés.
        
Elle est reconnue pour améliorer les capacités physiques en cas de séries successives d’exercices très intenses de courte durée (effet bénéfique obtenu par la consommation journalière de 3 g de créatine).

Clear Pro Creatine offre une solubilité optimale, favorisant une assimilation rapide. Sa texture claire et sa dissolution parfaite permettent une prise agréable, sans grumeaux ni dépôt.`,
        ingredients: `GOÛT ANANAS :
CRÉATINE MONOHYDRATE ; ACIDIFIANT : ACIDE CITRIQUE ; ARÔME (3,7%) ; ÉDULCORANT : SUCRALOSE ; COLORANT : BÊTA-CAROTÈNE.

Produit dans un atelier qui utilise des céréales contenant du gluten, des œufs, des graines de sésames, des fruits à coques, du céleri, des sulfites, du soja, du lait, des arachides, du poisson et des crustacés.`,
        usage: 'Ajouter une mesure (3,6 g) dans 200 à 250 mL d’eau froide. Mélangez énergétiquement et dégustez.',
        precautions: `Ne pas dépasser la dose journalière recommandée. Tenir hors de portée des jeunes enfants. À utiliser dans le cadre d’une alimentation variée et d’un mode de vie sain. Ne pas utiliser pendant la grossesse, par des enfants, ou pendant des périodes prolongées sans l’avis d’un médecin. Boire au moins 2 L d’eau par jour. À conserver à l’abri de la chaleur, de la lumière et de l’humidité.`,
        weight: '300g',
        servings: '83 doses',
        highlights: [
            'Créatine Monohydrate (3024mg/dose)',
            'Dont Créatine Pure (2659mg)',
            'Solubilité Optimale (Clear)',
            'Texture "Jus de Fruit"',
            'Sans Aspartame'
        ],
        nutritionalValues: {
            portion: "3.6g",
            energy: "0kj / 0kcal",
            fats: "0g",
            fatsSaturated: "0g",
            carbs: "0g",
            carbsSugar: "0g",
            protein: "0g",
            salt: "0g"
        },
        aminogram: [
            { label: 'Créatine Monohydrate', value: '3024 mg' },
            { label: 'Dont Créatine', value: '2659 mg' }
        ],
        aminogramPortion: '3.6g',
        flavors: [
            { name: 'Pêche', image: '/images/products/eric-favre/clear-pro-creatine-peche.png' },
            { name: 'Ananas', image: '/images/products/eric-favre/clear-pro-creatine-ananas.png' }
        ],
        tags: ['creatine', 'clear', 'fruity', 'summer'],
        inStock: true,
        isNew: true,
    },

    // NutriMuscle

    {
        id: 'nm-omega3',
        name: 'Oméga-3 Epax® Premium',
        brand: 'NutriMuscle',
        category: 'omega3',
        price: 29.90,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        description: 'Oméga-3 ultra-concentrés qualité Epax®. EPA/DHA haute assimilation.',
        ingredients: 'Huile de poisson concentrée (Epax®), gélatine de poisson, glycérol, vitamine E.',
        usage: '2 capsules par jour avec un repas.',
        weight: '120 capsules',
        inStock: true,
        isBestseller: true,
    },
    {
        id: 'nm-vitamined',
        name: 'Vitamine D3 2000 UI',
        brand: 'NutriMuscle',
        category: 'vitamines',
        price: 14.90,
        image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400',
        description: 'Vitamine D3 naturelle issue de lichen. Parfaite pour l\'immunité et les os.',
        ingredients: 'Vitamine D3 (cholécalciférol), huile de coco.',
        usage: '1 capsule par jour avec un repas.',
        weight: '120 capsules',
        inStock: true,
    },

    // Coregenic
    {
        id: 'cg-isolate-subzero',
        name: 'Sub Zero Whey Isolate',
        brand: 'Coregenic',
        category: 'proteines',
        price: 79.90,
        image: '/images/products/coregenic/sub-zero-chocolate-muffin.png',
        description: `SUB ZERO est un isolat de whey ultra-pure, formulé pour offrir une assimilation rapide, une excellente digestibilité et une qualité protéique exceptionnelle. Conçue pour les athlètes exigeants, elle soutient efficacement la performance, la récupération et le développement musculaire.

Préparation en poudre pour boisson aromatisée à base de protéines de lactosérum et glutamine avec édulcorants.`,
        ingredients: `Parfum Crème de vanille :
Isolat de protéines de lactosérum (lait), concentré de protéines de lactosérum (lait), L-glutamine, arôme, stabilisant : gomme xanthane, émulsifiants : lécithine de tournesol, lécithine de soja; édulcorants : acésulfame de potassium, sucralose, glycosides de stéviol issus de Stevia.

Parfum Chocolat riche :
Isolat de protéines de lactosérum (lait), concentré de protéines de lactosérum (lait), cacao maigre en poudre, arôme, L-glutamine, stabilisant : gomme xanthane, émulsifiants : lécithine de tournesol, lécithine de soja; édulcorants : acésulfame de potassium, sucralose, glycosides de stéviol issus de Stevia.

Parfum Cookies & crème :
Isolat de protéines de lactosérum (lait), concentré de protéines de lactosérum (lait), L-glutamine, arôme, stabilisant : gomme xanthane, cacao maigre en poudre, émulsifiants : lécithine de tournesol, lécithine de soja; édulcorants : acésulfame de potassium, sucralose, glycosides de stéviol issus de Stevia.

Parfum Muffin au chocolat gourmand :
Isolat de protéines de lactosérum (lait), concentré de protéines de lactosérum (lait), cacao maigre en poudre, arôme, L-glutamine, stabilisant : gomme xanthane, émulsifiants : lécithine de tournesol, lécithine de soja; édulcorants : acésulfame de potassium, sucralose, glycosides de stéviol issus de Stevia.`,
        usage: 'Mélanger 1 cuillère doseuse (1 portion = 27 g) avec 250 ml d’eau dans un shaker. Prendre 2 portions par jour.',
        precautions: 'Ne pas dépasser la dose recommandée. En cas de doute consultez un avis médical. Ce produit doit être utilisé dans le cadre d’un mode de vie sain et ne pas être utilisé comme substitut d’un régime alimentaire varié et équilibré. Tenir hors de la portée des enfants. A conserver au frais, au sec et à l\'abri de la lumière. A consommer de préférence avant fin : voir la date figurant sur l’emballage. Numéro de Lot : voir le numéro figurant sur l’emballage.',
        weight: '2kg',
        servings: '74 doses',
        highlights: [
            'Protéine de lactosérum isolée de très haute qualité',
            'Ultrafiltration à basse température préservant les protéines',
            'Assimilation rapide et excellente digestibilité',
            'Riche en acides aminés essentiels (BCAA)',
            'Sans aspartame, OGM ni sucres ajoutés'
        ],
        nutritionalValues: {
            portion: "54g (2 doses)",
            energy: "847kj / 203kcal",
            energy100g: "1569kj / 375kcal",
            fats: "0.9g",
            fats100g: "1.7g",
            fatsSaturated: "0.3g",
            fatsSaturated100g: "0.6g",
            carbs: "3.7g",
            carbs100g: "6.9g",
            carbsSugar: "2.0g",
            carbsSugar100g: "3.7g",
            protein: "45g",
            protein100g: "83g",
            salt: "0.33g",
            salt100g: "0.62g"
        },
        flavors: [
            { name: 'Chocolate Muffin', image: '/images/products/coregenic/sub-zero-chocolate-muffin.png' },
            { name: 'Vanilla Cream', image: '/images/products/coregenic/sub-zero-vanilla.png' },
            { name: 'Cookies & Cream', image: '/images/products/coregenic/sub-zero-cookies-cream.png' },
            { name: 'Rich Chocolate', image: '/images/products/coregenic/sub-zero-rich-chocolate.png' },
            { name: 'Caramel Latte', image: '/images/products/coregenic/sub-zero-caramel-latte.png' }
        ],
        tags: ['premium', 'glutamine', 'isolate'],
        inStock: true,
        isNew: true,
    },
    {
        id: 'cg-isolate-subzero-810',
        name: 'Sub Zero Whey Isolate',
        brand: 'Coregenic',
        category: 'proteines',
        price: 39.90,
        image: '/images/products/coregenic/sub-zero-810g-cookies-cream.png',
        description: `SUB ZERO est un isolat de whey ultra-pure, formulé pour offrir une assimilation rapide, une excellente digestibilité et une qualité protéique exceptionnelle. Conçue pour les athlètes exigeants, elle soutient efficacement la performance, la récupération et le développement musculaire.

Préparation en poudre pour boisson aromatisée à base de protéines de lactosérum et glutamine avec édulcorants.`,
        ingredients: `Parfum Crème de vanille :
Isolat de protéines de lactosérum (lait), concentré de protéines de lactosérum (lait), L-glutamine, arôme, stabilisant : gomme xanthane, émulsifiants : lécithine de tournesol, lécithine de soja; édulcorants : acésulfame de potassium, sucralose, glycosides de stéviol issus de Stevia.

Parfum Chocolat riche :
Isolat de protéines de lactosérum (lait), concentré de protéines de lactosérum (lait), cacao maigre en poudre, arôme, L-glutamine, stabilisant : gomme xanthane, émulsifiants : lécithine de tournesol, lécithine de soja; édulcorants : acésulfame de potassium, sucralose, glycosides de stéviol issus de Stevia.

Parfum Cookies & crème :
Isolat de protéines de lactosérum (lait), concentré de protéines de lactosérum (lait), L-glutamine, arôme, stabilisant : gomme xanthane, cacao maigre en poudre, émulsifiants : lécithine de tournesol, lécithine de soja; édulcorants : acésulfame de potassium, sucralose, glycosides de stéviol issus de Stevia.

Parfum Muffin au chocolat gourmand :
Isolat de protéines de lactosérum (lait), concentré de protéines de lactosérum (lait), cacao maigre en poudre, arôme, L-glutamine, stabilisant : gomme xanthane, émulsifiants : lécithine de tournesol, lécithine de soja; édulcorants : acésulfame de potassium, sucralose, glycosides de stéviol issus de Stevia.`,
        usage: 'Mélanger 1 cuillère doseuse (1 portion = 27 g) avec 250 ml d’eau dans un shaker. Prendre 2 portions par jour.',
        precautions: 'Ne pas dépasser la dose recommandée. En cas de doute consultez un avis médical. Ce produit doit être utilisé dans le cadre d’un mode de vie sain et ne pas être utilisé comme substitut d’un régime alimentaire varié et équilibré. Tenir hors de la portée des enfants. A conserver au frais, au sec et à l\'abri de la lumière. A consommer de préférence avant fin : voir la date figurant sur l’emballage. Numéro de Lot : voir le numéro figurant sur l’emballage.',
        weight: '810g',
        servings: '30 doses',
        highlights: [
            'Protéine de lactosérum isolée de très haute qualité',
            'Ultrafiltration à basse température préservant les protéines',
            'Assimilation rapide et excellente digestibilité',
            'Riche en acides aminés essentiels (BCAA)',
            'Sans aspartame, OGM ni sucres ajoutés'
        ],
        nutritionalValues: {
            portion: "54g (2 doses)",
            energy: "847kj / 203kcal",
            energy100g: "1569kj / 375kcal",
            fats: "0.9g",
            fats100g: "1.7g",
            fatsSaturated: "0.3g",
            fatsSaturated100g: "0.6g",
            carbs: "3.7g",
            carbs100g: "6.9g",
            carbsSugar: "2.0g",
            carbsSugar100g: "3.7g",
            protein: "45g",
            protein100g: "83g",
            salt: "0.33g",
            salt100g: "0.62g"
        },
        flavors: [
            { name: 'Cookies & Cream', image: '/images/products/coregenic/sub-zero-810g-cookies-cream.png' },
            { name: 'Rich Chocolate', image: '/images/products/coregenic/sub-zero-810g-rich-chocolate.png' },
            { name: 'Vanilla Cream', image: '/images/products/coregenic/sub-zero-810g-vanilla.png' }
        ],
        tags: ['premium', 'glutamine', 'isolate'],
        inStock: true,
        isNew: true,
    },
    {
        id: 'cg-preworkout',
        name: 'Core Pump Pré-Workout',
        brand: 'Coregenic',
        category: 'pre-workout',
        price: 32.90,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
        description: 'Formule explosive pour des entraînements intenses. Caféine + Beta-Alanine + Citrulline.',
        ingredients: 'L-Citrulline, Beta-Alanine, Caféine anhydre, Taurine, Vitamines B.',
        usage: '1 dose 20-30 minutes avant l\'entraînement.',
        weight: '300g',
        inStock: true,
        isNew: true,
    },


    {
        id: 'fn-iso-protein-900',
        name: 'La French Iso Protein',
        brand: 'French Nutrition',
        category: 'proteines',
        price: 44.90, // Prix estimatif, à confirmer
        image: '/images/products/french-nutrition/iso-protein-triple-chocolat.png',
        description: `L’ISO Protein de La French Nutrition est une protéine de lactosérum de très haute qualité, idéale pour les sportifs en quête de performance et de récupération optimale. Conçue avec de l’isolat de protéine Volactive® UltraWhey XP, cette formule assure une assimilation rapide, un apport protéique élevé et une très faible teneur en sucres. Savourez chaque shaker avec nos parfums délicieux : Vanille de Madagascar ou Triple Chocolat.`,
        ingredients: `Triple Chocolat :
Isolat de protéine de lactosérum (LAIT), poudre de cacao, arôme, émulsifiant : texturecel, épaississant : gomme de guar, sel, édulcorants : sucralose, acésulfame K.

Vanille de Madagascar :
Isolat de protéine de lactosérum (LAIT), arôme, émulsifiant : texturecel, épaississant : gomme de guar, sel, édulcorants : sucralose, acésulfame K.

INFORMATIONS ALLERGÈNES :
Contient du LAIT. Peut contenir des traces de gluten, œufs, graines de sésame, fruits à coque, céleri, sulfites, soja, arachide.`,
        usage: 'Mélanger une cuillère de 30 g d\'ISO Protein dans un shaker de 200 ml d\'eau. À consommer directement après préparation. Favoriser la prise de protéines après une activité physique.',
        precautions: `Ne pas dépasser la dose recommandée. Ne pas consommer pendant la grossesse ou l’allaitement sans avis médical. Ne remplace pas une alimentation variée et équilibrée. Ne pas consommer en cas d’allergie à l’un des ingrédients.
        
CONDITIONS DE STOCKAGE :
Conserver dans un endroit frais et sec, hors de portée des enfants. Éviter l'exposition à la chaleur et aux rayons du soleil.`,
        weight: '900g',
        servings: '30 doses',
        highlights: [
            '100 % isolat de protéine de lactosérum (Volactive® UltraWhey XP)',
            'À partir de 23,8g de protéines par portion',
            'Faible en sucre',
            'Saveurs gourmandes',
            'Pratique et transportable (doypack)'
        ],
        nutritionalValues: {
            portion: "30g",
            energy: "451kj / 108kcal",
            energy100g: "1503kj / 359kcal",
            fats: "0.45g",
            fats100g: "1.5g",
            fatsSaturated: "0.24g",
            fatsSaturated100g: "0.8g",
            carbs: "2.2g",
            carbs100g: "7.3g",
            carbsSugar: "1.62g",
            carbsSugar100g: "5.4g",
            protein: "23.8g",
            protein100g: "79.1g",
            salt: "0.15g",
            salt100g: "0.5g"
        },
        flavors: [
            { name: 'Triple Chocolat', image: '/images/products/french-nutrition/iso-protein-triple-chocolat.png' },
            { name: 'Vanille de Madagascar', image: '/images/products/french-nutrition/iso-protein-vanille.png' }
        ],
        tags: ['isolate', 'premium', 'french'],
        inStock: true,
        isNew: true,
    },

    {
        id: 'fn-iso-french-1500',
        name: 'Iso French Protein',
        brand: 'French Nutrition',
        category: 'proteines',
        price: 74.90, // Prix confirmé
        image: '/images/products/french-nutrition/iso-french-protein-dark-cookies.png',
        description: `ISO FRENCH Volactive® de La French Nutrition est un isolat de whey hautement purifié, élaboré à partir de lait européen de qualité. Grâce à un double procédé de filtration ultrafiltration + microfiltration (CFM), elle offre une digestibilité optimale, un profil d’acides aminés complet, et une protéine ultra clean, parfaite pour les sportifs exigeants.

Avec 79 g de protéines / 100 g, très peu de sucre et une faible teneur en matières grasses, elle est idéale en post-entraînement ou en collation, même en période de sèche ou de régime contrôlé.`,
        ingredients: `Dark Cookies & Cream :
Isolat de protéine de lactosérum (LAIT), éclats de cookies, cacao maigre en poudre, arôme, édulcorants (sucralose, acésulfame K).

Vanille de Madagascar :
Isolat de protéine de lactosérum (LAIT), arôme, émulsifiant : texturecel, épaississant : gomme de guar, sel, édulcorants : sucralose, acésulfame K.

INFORMATIONS ALLERGÈNES :
Contient du LAIT. Peut contenir des traces de gluten, œufs, graines de sésame, fruits à coque, céleri, sulfites, soja, arachide.`,
        usage: `Mélanger 30 g (1 scoop) avec 200–250 ml d’eau ou de lait écrémé.
À consommer en post-training ou en collation.`,
        precautions: `Ne pas dépasser la dose recommandée.
Déconseillé aux femmes enceintes/allaitantes sans avis médical.
Ne remplace pas une alimentation équilibrée.
Conserver à température ambiante, à l’abri de l’humidité et de la lumière.`,
        weight: '1.5kg',
        servings: '50 doses',
        highlights: [
            '79 % de protéines',
            'Labellisée Volactive®',
            'Double filtration CFM + UF',
            'Faible sucre & matières grasses',
            'Sans lactose – digestion facile'
        ],
        nutritionalValues: {
            portion: "30g",
            energy: "431kj / 103kcal",
            energy100g: "1436kj / 343kcal",
            fats: "0.4g",
            fats100g: "1.4g",
            fatsSaturated: "0.15g",
            fatsSaturated100g: "0.5g",
            carbs: "1.1g",
            carbs100g: "3.6g",
            carbsSugar: "0.75g",
            carbsSugar100g: "2.5g",
            protein: "23.7g",
            protein100g: "79g",
            salt: "0.15g",
            salt100g: "0.5g"
        },
        flavors: [
            { name: 'Dark Cookies & Cream', image: '/images/products/french-nutrition/iso-french-protein-dark-cookies.png' },
            { name: 'Vanille de Madagascar', image: '/images/products/french-nutrition/iso-french-protein-vanille.png' }
        ],
        tags: ['isolate', 'premium', 'french'],
        inStock: true,
        isNew: true,
    },

    {
        id: 'nm-native-whey-isolate',
        name: 'Native Whey Isolate',
        brand: 'Nutrimuscle',
        category: 'proteines',
        price: 104.95, // Prix confirmé
        image: '/images/products/nutrimuscle/native-whey-isolate-chocolat-v2.png',
        description: `100% Isolat de Whey Native directement issue de lait frais de vaches (pas de déchets fromagers).
        
Obtenue par microfiltration et ultrafiltration à froid (CFM) pour préserver la structure native des protéines.
- Sans GMP (GlycoMacroPeptide)
- Renforcée en Lactase (Tolerase™ L) pour une digestion parfaite
- Enrichie en Biotiques (Bacillus Coagulans GBI-30) pour la flore intestinale
- Cacao Bio et Inuline Frutafit® HD (prébiotique)

Idéale pour la récupération musculaire, le régime kéto et les végétariens.`,
        ingredients: `Nature :
Isolat de protéines sériques natives du lait (WPI) non instantanéisé.

Chocolat :
Isolat de protéines sériques natives du lait (WPI), cacao maigre en poudre biologique, arômes, inuline Frutafit® HD, Bacillus Coagulans (Ganeden BC30), lactase (Tolerase™ L), édulcorant (Splenda® sucralose).

Allergènes : Lait. Fabriqué dans un atelier utilisant œufs, soja, gluten.`,
        usage: 'Diluer 30g (deux doseurs) dans 250ml d’eau ou de lait.',
        weight: '2.25kg',
        servings: '75 doses',
        highlights: [
            '100% Native (Lait frais)',
            'Ultra-filtrée à froid (CFM)',
            'Avec Lactase & Probiotiques',
            'Sans OGM, Sans GMP',
            'Assimilation ultra-rapide'
        ],

        nutritionalValues: {
            portion: "30g",
            energy: "471kj / 111kcal",
            energy100g: "1571kj / 370kcal",
            fats: "0.4g",
            fats100g: "1.45g",
            fatsSaturated: "0.1g",
            fatsSaturated100g: "0.31g",
            carbs: "2.1g",
            carbs100g: "7.2g",
            carbsSugar: "1.6g",
            carbsSugar100g: "5.58g",
            protein: "24.3g",
            protein100g: "81.2g", // Moyenne chocolat
            salt: "0g",
            salt100g: "<0.01g"
        },
        flavors: [
            { name: 'Chocolat', image: '/images/products/nutrimuscle/native-whey-isolate-chocolat-v2.png' },
            { name: 'Vanille', image: '/images/products/nutrimuscle/native-whey-isolate-vanille.png' },
            { name: 'Neutre', image: '/images/products/nutrimuscle/native-whey-isolate-neutre.png' }
        ],
        tags: ['native', 'isolate', 'premium'],
        inStock: true,
        isNew: true,
    },

    {
        id: 'nm-native-whey-isolate-1kg',
        name: 'Native Whey Isolate',
        brand: 'Nutrimuscle',
        category: 'proteines',
        price: 54.90, // Prix estimatif à confirmer
        image: '/images/products/nutrimuscle/native-whey-isolate-1kg-chocolat.png',
        description: `100% Isolat de Whey Native directement issue de lait frais de vaches (pas de déchets fromagers).
        
Obtenue par microfiltration et ultrafiltration à froid (CFM) pour préserver la structure native des protéines.
- Sans GMP (GlycoMacroPeptide)
- Renforcée en Lactase (Tolerase™ L) pour une digestion parfaite
- Enrichie en Biotiques (Bacillus Coagulans GBI-30) pour la flore intestinale
- Cacao Bio et Inuline Frutafit® HD (prébiotique)

Idéale pour la récupération musculaire, le régime kéto et les végétariens.`,
        ingredients: `Nature :
Isolat de protéines sériques natives du lait (WPI) non instantanéisé.

Chocolat :
Isolat de protéines sériques natives du lait (WPI), cacao maigre en poudre biologique, arômes, inuline Frutafit® HD, Bacillus Coagulans (Ganeden BC30), lactase (Tolerase™ L), édulcorant (Splenda® sucralose).

Allergènes : Lait. Fabriqué dans un atelier utilisant œufs, soja, gluten.`,
        usage: 'Diluer 30g (deux doseurs) dans 250ml d’eau ou de lait.',
        weight: '1kg',
        servings: '33 doses',
        highlights: [
            '100% Native (Lait frais)',
            'Ultra-filtrée à froid (CFM)',
            'Avec Lactase & Probiotiques',
            'Sans OGM, Sans GMP',
            'Assimilation ultra-rapide'
        ],
        nutritionalValues: {
            portion: "30g",
            energy: "471kj / 111kcal",
            energy100g: "1571kj / 370kcal",
            fats: "0.4g",
            fats100g: "1.45g",
            fatsSaturated: "0.1g",
            fatsSaturated100g: "0.31g",
            carbs: "2.1g",
            carbs100g: "7.2g",
            carbsSugar: "1.6g",
            carbsSugar100g: "5.58g",
            protein: "24.3g",
            protein100g: "81.2g",
            salt: "0g",
            salt100g: "<0.01g"
        },
        flavors: [
            { name: 'Chocolat', image: '/images/products/nutrimuscle/native-whey-isolate-1kg-chocolat.png' },
            { name: 'Vanille', image: '/images/products/nutrimuscle/native-whey-isolate-1kg-vanille.png' },
            { name: 'Fraise', image: '/images/products/nutrimuscle/native-whey-isolate-1kg-fraise.png' },
            { name: 'Choco Cookie', image: '/images/products/nutrimuscle/native-whey-isolate-1kg-choco-cookie.png' },
            { name: 'Neutre', image: '/images/products/nutrimuscle/native-whey-isolate-1kg-neutre.png' },
        ],
        tags: ['native', 'isolate', 'premium'],
        inStock: true,
        isNew: true,
    },

    // French Nutrition
    {
        id: 'fn-multivit',
        name: 'MultiVit Pro',
        brand: 'French Nutrition',
        category: 'vitamines',
        price: 18.90,
        image: 'https://images.unsplash.com/photo-1559757175-7cb037867bd0?w=400',
        description: 'Complexe multivitaminé complet. 24 vitamines et minéraux essentiels.',
        ingredients: 'Vitamines A, C, D, E, K, B1, B2, B3, B5, B6, B8, B9, B12, Zinc, Magnésium, Fer, Sélénium...',
        usage: '1 comprimé par jour au petit-déjeuner.',
        weight: '90 comprimés',
        inStock: true,
    },
    {
        id: 'fn-carnitine',
        name: 'L-Carnitine 3000',
        brand: 'French Nutrition',
        category: 'bruleurs',
        price: 22.90,
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400',
        description: 'L-Carnitine liquide hautement dosée. Favorise l\'utilisation des graisses comme énergie.',
        ingredients: 'L-Carnitine tartrate, eau purifiée, arôme citron, conservateurs.',
        usage: '30ml avant l\'entraînement ou le matin à jeun.',
        weight: '500ml',
        inStock: true,
        isBestseller: true,
    },
    {
        id: 'fn-magnesium',
        name: 'Magnésium Bisglycinate',
        brand: 'French Nutrition',
        category: 'vitamines',
        price: 16.90,
        image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
        description: 'Magnésium sous forme bisglycinate pour une absorption optimale. Réduit la fatigue.',
        ingredients: 'Bisglycinate de magnésium, gélule végétale.',
        usage: '2 gélules le soir avant le coucher.',
        weight: '90 gélules',
        inStock: true,
    },
    {
        id: 'fn-zinc',
        name: 'Zinc Picolinate 25mg',
        brand: 'French Nutrition',
        category: 'vitamines',
        price: 12.90,
        image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400',
        description: 'Zinc sous forme picolinate très assimilable. Soutient l\'immunité et la testostérone.',
        ingredients: 'Picolinate de zinc, gélule végétale.',
        usage: '1 gélule par jour avec un repas.',
        weight: '60 gélules',
        inStock: true,
    },
]

export function getProductsByCategory(categoryId: string): Product[] {
    return products.filter(p => p.category === categoryId)
}

export function getProductsByBrand(brandId: string): Product[] {
    const brandName = brands.find(b => b.id === brandId)?.name
    return products.filter(p => p.brand === brandName)
}

export function getBestsellers(): Product[] {
    return products.filter(p => p.isBestseller)
}

export function getNewProducts(): Product[] {
    return products.filter(p => p.isNew)
}

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id)
}
