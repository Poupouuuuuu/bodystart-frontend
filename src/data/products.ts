export interface Product {
    id: string
    name: string
    brand: string
    category: string
    price: number
    oldPrice?: number
    image: string
    images?: string[]
    description: string
    ingredients?: string
    usage?: string
    precautions?: string
    weight?: string
    servings?: string
    highlights?: string[]
    keywords?: string[]
    tags?: string[]
    flavors?: (string | { name: string; image?: string; id?: string; price?: number; weight?: number; weightUnit?: string })[]
    metafieldNutrition?: string
    metafieldUsage?: string
    metafieldComposition?: string
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
    attributes?: {
        label: string
        value: string
    }[]
    inStock: boolean
    isBestseller?: boolean
    isNew?: boolean
    variantId?: string // Added for Shopify Checkout
}

export interface Category {
    id: string;
    name: string;
    icon?: string;
    image?: string;
    description?: string;
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
    { id: 'mutant', name: 'Mutant' },
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
        id: 'cg-final-mass',
        name: 'Final Mass',
        brand: 'Coregenic',
        category: 'proteines',
        price: 69.90,
        image: '/images/products/coregenic/final-mass.png',
        description: `Final Mass de Corgenic est un lean gainer avec une teneur en glucides et calories plus faible qu’un hard gainer. De ce fait, il est plus facile à consommer toute l’année même en période de régime. La teneur en protéines est également plus élevée pour combler les apports protéiques journaliers.

Pour une prise de masse sèche, le Lean Gainer est un complément alimentaire idéal puisqu’il est suffisamment riche en protéines, glucides et calories pour augmenter de manière contrôlée vos apports caloriques.

Sa formule multi-sources (Whey, Isolat, Caséine) assure une diffusion graduelle des acides aminés, tandis que son complexe glucidique (Avoine, Orge, Maltodextrine) fournit une énergie durable de qualité.`,
        ingredients: `Farine d'avoine (gluten), maltodextrine, concentré de protéines de lactosérum (lait), farine d'orge complète (gluten), caséine micellaire (lait), isolat de protéines de lactosérum (lait), arôme, poudre d'huile de tournesol, taurine, l-glutamine, édulcorants (sucralose, acesulfame-K), colorant (caramel au sulfite d'ammonium), citrate de zinc, cholécalciférol (vitamine D3), cyanocobalamine (vitamine B12).

Allergènes : Peut contenir des traces de gluten, oeuf, arachides, fruits à coque, soja, noix, poissons, crustacés et céleri.`,
        usage: `Mélanger 2 dosettes (160g) dans 150ml à 200ml d'eau fraîche.
        
Consommer 1 à 2 fois par jour (matin/après-midi et après l'entraînement).
Les jours de repos : prendre une dose le matin et une dose l'après-midi.`,
        precautions: 'Conserver dans un endroit frais et sec à l\'abri de la lumière. Tenir hors de portée des enfants. Ne pas dépasser la dose journalière recommandée.',
        weight: '3.2kg', // 3200g
        servings: '20 doses (de 160g)',
        highlights: [
            'Prise de masse sèche (Lean Gainer)',
            '48g Protéines / 96g Glucides',
            'Enrichi en BCAA, Glutamine, Taurine',
            'Source de Zinc & Vitamines'
        ],
        nutritionalValues: {
            portion: "160g",
            energy: "2611 kJ / 624 kcal",
            fats: "5.3g",
            fatsSaturated: "1.9g",
            carbs: "96g",
            carbsSugar: "6.5g",
            protein: "48g",
            salt: "0.26g"
        },
        aminogramPortion: "160g",
        aminogram: [
            { label: 'Acide Aspartique', value: '5.25g' },
            { label: 'Alanine', value: '2.45g' },
            { label: 'Arginine', value: '1.06g' },
            { label: 'Cystéine', value: '0.98g' },
            { label: 'Glutamine', value: '9.53g' },
            { label: 'Glycine', value: '0.72g' },
            { label: 'Histidine', value: '0.84g' },
            { label: 'Isoleucine', value: '2.91g' },
            { label: 'Leucine', value: '4.8g' },
            { label: 'Lysine', value: '4.28g' },
            { label: 'Méthionine', value: '0.97g' },
            { label: 'Phénylalanine', value: '1.53g' },
            { label: 'Proline', value: '2.71g' },
            { label: 'Sérine', value: '2.31g' },
            { label: 'Thréonine', value: '2.94g' },
            { label: 'Tryptophane', value: '0.64g' },
            { label: 'Tyrosine', value: '1.35g' },
            { label: 'Valine', value: '2.73g' }
        ],
        flavors: [
            { name: 'Chocolat', image: '/images/products/coregenic/final-mass.png' },
            { name: 'Vanille', image: '/images/products/coregenic/final-mass-vanilla.png' },
            { name: 'Cookie Dough', image: '/images/products/coregenic/final-mass-cookie.png' },
            { name: 'Caramel Latte', image: '/images/products/coregenic/final-mass-caramel.png' },
        ],
        tags: ['gainer', 'mass', 'protein', 'oat', 'zinc', 'vitamins'],
        inStock: true,
        isNew: true,
    },


    {
        id: 'mutant-mass',
        name: 'Mutant Mass',
        brand: 'Mutant',
        category: 'proteines',
        price: 69.90,
        image: '/images/products/mutant/mutant-mass-chocolate.png',
        description: `Un gainer sérieux conçu par des personnes qui s’y connaissent en bodybuilding.
Mutant Mass est conçu par Mutant, une entreprise spécialisée en bodybuilding, pour vous aider à augmenter votre volume et votre masse musculaire.
Chaque portion de Mutant Mass comprend 1100 kcal, 56 g de protéines pour soutenir la croissance musculaire et 196 g de glucides.
Mutant Mass comprend également un mélange de graisses alimentaires : triglycérides à chaîne moyenne (TCM), avocat, graines de lin, graines de courge et huile de tournesol.

Pour augmenter son volume, rien de tel que Mutant Mass !`,
        ingredients: `(carbo blend, amidon de maïs cireux (maltodextrine), amidon d'orge, patate douce, flocons d'avoine), mutant mass pro-matrix (concentré de protéines de lactosérum (lait), hydrolysat de protéines de lactosérum (lait), isolat de protéines de whey (lait), protéine de caséine micellaire (lait), concentré de protéines de lait, isolat de protéines de lactosérum), lipid foods blend (huile de coco fractionnée (MCT), avocat, graines de lin, graines de courge, huile de tournesol, épaississants, graines de soja, pois, gomme guar), cacao, arômes, sel, édulcorant (sucralose), émulsifiant (lécithine de tournesol), enzymes (lactase, protéase), extrait de cannelle (Cinnulin PF®), cerise acidulée.

Allergènes : Contient du lait, soja, blé, orge, avoine. Peut contenir des traces de poissons, crustacés, œufs, arachides, fruits à coque.`,
        usage: 'Ajoutez 750-1000 ml d\'eau dans un mixeur ou un grand shaker, puis ajoutez 4 mesures de Mutant Mass (280g). Mixez ou secouez pendant 20-30 secondes. À consommer de préférence après l\'entraînement ou en collation.',
        precautions: 'Conserver dans un endroit frais et sec. Tenir hors de portée des enfants.',
        weight: '6.8 kg',
        servings: '24 doses',
        flavors: [
            { name: 'Triple Chocolate', image: '/images/products/mutant/mutant-mass-chocolate.png' },
            { name: 'Vanilla Ice Cream', image: '/images/products/mutant/mutant-mass-vanilla.png' },
            { name: 'Cookies & Cream', image: '/images/products/mutant/mutant-mass-cookies.png' }
        ],
        tags: ['gainer', 'mass', 'protein', 'calories'],
        inStock: true,
        isNew: true,
        nutritionalValues: {
            portion: "280g (4 mesures)",
            energy: "4600 kJ / 1100 kcal",
            fats: "12g",
            fatsSaturated: "6.0g",
            carbs: "192g",
            carbsSugar: "18g",
            protein: "56g",
            salt: "1.45g"
        },
        highlights: [
            '1100 calories par portion',
            '56g de protéines de qualité',
            '196g de glucides complexes',
            'Mélange de graisses saines (MCT, avocat, lin)'
        ]
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
        id: 'fn-creatine-micronisee',
        name: 'Créatine Micronisée',
        brand: 'French Nutrition',
        category: 'creatine',
        price: 32.90,
        image: '/images/products/french-nutrition/creatine-micronisee.png',
        description: `La Créatine Monohydrate de La French Nutrition est un composé naturellement présent dans l’organisme, principalement dans les muscles.

La créatine améliore les capacités physiques en cas de séries successives d’exercices très intenses et de courte durée (bénéfice obtenu avec une consommation de 3 g par jour).

Sa micronisation à 200 mesh garantit une meilleure solubilité, permettant une absorption optimale par l’organisme.`,
        ingredients: `Ingrédient : Créatine Monohydrate (100%).

INFORMATIONS ALLERGÈNES :
Ce produit peut contenir des traces de lait, céréales contenant du gluten, œufs, graines de sésame, fruits à coque, céleri, sulfites, soja, arachides, crustacés.`,
        usage: `Mélangez une portion de 3 g dans un shaker de 200 ml de votre boisson préférée après un exercice physique ou avant les repas. À consommer directement après préparation.`,
        precautions: `- Ne pas dépasser la dose journalière recommandée.
- À utiliser dans le cadre d’un mode de vie sain et d’une alimentation équilibrée.
- Déconseillé aux femmes enceintes ou allaitantes sans avis médical.
- Tenir hors de portée des jeunes enfants.
- Réservé aux adultes.`,
        weight: '300g',
        servings: '100 doses',
        highlights: [
            '100% Créatine Monohydrate',
            'Micronisée 200 Mesh (Top Solubilité)',
            'Qualité Pharmaceutique',
            'Explosivité & Force',
            'Sans goût (Neutre)'
        ],
        attributes: [
            { label: 'Créatine', value: '3000mg' },
            { label: 'Micronisation', value: '200 Mesh' }
        ],
        nutritionalValues: {
            portion: "3g",
            energy: "0 kJ / 0 kcal",
            fats: "0g",
            fatsSaturated: "0g",
            carbs: "0g",
            carbsSugar: "0g",
            protein: "0g",
            salt: "0g"
        },
        flavors: [
            { name: 'Neutre', image: '/images/products/french-nutrition/creatine-micronisee.png' }
        ],
        tags: ['creatine', 'performance', 'french', 'micronized', 'force'],
        inStock: true,
        isNew: true,
    },
    {
        id: 'ef-vitamino-24',
        name: 'Vitamino+ 24 (Cure Flash)',
        brand: 'Eric Favre',
        category: 'vitamines',
        price: 11.90,
        image: '/images/categories/vitamines.png',
        description: `Vitamino+ 24 est un BOOSTER sous forme d'unidose de 10ml. La cure flash de 10 jours apporte chaque matin 24 ingrédients puissants pour un effet "coup de fouet" immédiat.

Idéal pour :
- Une période de grosse fatigue
- Avant une compétition ou une période d'examen
- Un changement de saison difficile

Vitamino 24 + Eric Favre aide :
- à réduire votre fatigue
- au bon fonctionnement du système immunitaire
- à augmenter l'énergie mentale et physique

Plantes, vitamines, minéraux pour augmenter l'énergie, réduire la fatigue et booster le système immunitaire.`,
        ingredients: `Extraits aqueux de : guarana, eleutherocoque, hibiscus, fructose, minéraux : glycérophosphate de calcium, citrate de magnésium, sel de sodium de l'edetate de fer (III), sulfate de zinc, sulfate de manganèse, sulfate de cuivre, chlorure de chrome, vitamines : C, E, B3, A, D3, B5, B12, B2, B6, B1, B9, B8; acidifiant : acide lactique, arôme naturel d'orange (0,8%), épaississant : gomme de xanthane, conservateurs : sorbate de potassium, benzoate de sodium, levure de selenium, molybdate de sodium, édulcorant : sucralose, eau.`,
        usage: `Faire une cure de 10 jours, prendre une unicadose chaque matin.`,
        precautions: `À conserver hors de portée des enfants. Ne pas dépasser la dose journalière recommandée.`,
        weight: '10 unidoses',
        highlights: [
            'BOOSTER IMMÉDIAT',
            'Cure Flash 10 jours',
            'Effet "Coup de Fouet"',
            'Format liquide (Assimilation rapide)',
            '2500mg Guarana'
        ],
        keywords: ['vitamines', 'booster', 'énergie', 'fatigue', 'flash'],
        inStock: true,
        tags: ['booster', 'energy', 'flash'],
        nutritionalValues: {
            portion: "1 unidose (10ml)",
            energy: "-",
            fats: "-",
            fatsSaturated: "-",
            carbs: "-",
            carbsSugar: "-",
            protein: "-",
            salt: "-"
        },
        attributes: [
            { label: "Objectif", value: "Booster / Coup de fouet" },
            { label: "Durée", value: "10 jours (Intensif)" },
            { label: "Format", value: "Unidose liquide" }
        ]
    },
    {
        id: 'ef-vitamino-plus',
        name: 'Vitamino+ (Entretien)',
        brand: 'Eric Favre',
        category: 'vitamines',
        price: 14.90, // Prix estimé pour 30 jours
        image: '/images/products/eric-favre/vitamino-plus.png',
        description: `Vitamino+ est votre allié quotidien pour MAINTENIR votre forme et votre immunité sur le long terme.
        
Contrairement à la cure flash, ce format 30 jours est conçu pour un soutien de fond, idéal pour passer l'hiver ou les périodes chargées sereinement.

Vitamino+ est un complément alimentaire complet :
- Soutien quotidien pour éviter la fatigue
- Renforcement progressif du système immunitaire
- Apport équilibré en vitamines et minéraux essentiels

30 jours complexe vitamines, minéraux, acides aminés et extrait de plantes. Pour toute la famille (dès 6 ans).`,
        ingredients: `AGENTS DE CHARGE : CELLULOSE MICROCRISTALLINE, PHOSPHATE DICALCIQUE, CARBONATE DE CALCIUM, VITAMINE C, OXYDE DE MAGNESIUM, FUMARATE DE FER, L-CHOLINE BITARTRATE, VITAMINE B3, L-LYSINE, L-GLUTAMINE, VITAMINES : E, B5, OXYDE DE ZINC, VITAMINE A, BISGLYCINATE DE MANGANESE, L-METHIONINE, EPAISSISSANT : GOMME DE XANTHANE, GLUCONATE DE CUIVRE, ANTIAGGLOMERANTS : STEARATE DE MAGNESIUM, ACIDE STEARIQUE, EXTRAIT DE POIVRE NOIR TITRE EN PIPERINE, EMULSIFIANT : CROSCARMELLOSE SODIQUE, VITAMINES : B1, B6, D3, B2, B12, B9, PICOLINATE DE CHROME, MOLYBDATE DE SODIUM, SELENITE DE SODIUM, VITAMINE B8.`,
        usage: `Prendre 1 comprimé le matin avec un verre d’eau.`,
        precautions: `Ne pas dépasser la dose journalière recommandée. A utiliser dans le cadre d’un mode de vie sain.`,
        weight: '30 comprimés',
        highlights: [
            'FORME AU QUOTIDIEN',
            'Traitement de fond (30 jours)',
            'Soutien Immunitaire Durable',
            'Équilibre Vitamines/Minéraux',
            'Idéal changement de saison'
        ],
        keywords: ['vitamines', 'entretien', 'quotidien', 'santé', 'immunité'],
        inStock: true,
        tags: ['health', 'maintenance', 'daily'],
        nutritionalValues: {
            portion: "1 comprimé",
            energy: "-",
            fats: "-",
            fatsSaturated: "-",
            carbs: "-",
            carbsSugar: "-",
            protein: "-",
            salt: "-"
        },
        attributes: [
            { label: "Objectif", value: "Entretien / Fond" },
            { label: "Durée", value: "30 jours (Quotidien)" },
            { label: "Format", value: "Comprimés" }
        ]
    },
    {
        id: 'ef-hydrafull-unit',
        name: 'Hydrafull Electrolytes',
        brand: 'Eric Favre',
        category: 'vitamines',
        price: 8.50,
        image: '/images/products/eric-favre/hydrafull-electrolytes.png',
        description: `L'hydratation pour tous. Restez hydraté tout la journée en faisant le plein de minéraux ! (Crampes & récupération)

Découvrez Hydrafull Electrolytes - Hydratation +, la solution idéale pour une hydratation efficace et durable tout au long de la journée.
- Formulée avec des vitamines essentielles et des minéraux
- Sans sucre (0 calories inutiles)
- Arôme naturel de citron pour un rafraîchissement optimal

Idéal pour les efforts intenses ou pour maintenir un niveau d’hydratation optimal au quotidien.`,
        ingredients: `ACIDIFIANT : ACIDE CITRIQUE ; CITRATE DE POTASSIUM ; SELS DE CALCIUM D’ACIDE CITRIQUE ; RÉGULATEUR D’ACIDITÉ : BICARBONATE DE SODIUM ; SELS DE MAGNÉSIUM D’ACIDE CITRIQUE; AGENT DE CHARGE : SORBITOL ; ARÔME NATUREL CITRON (2,38%) ; VITAMINE C ; ÉDULCORANT : SUCRALOSE ; CHLORURE DE SODIUM ; CITRATE DE ZINC ; VITAMINE B3; VITAMINE B2 ; VITAMINE B6 ; VITAMINE B1.`,
        usage: `Dissoudre un comprimé effervescent dans 500 ml d'eau. Lors d'un effort intense, dissoudre 1 comprimé avant l'effort dans 500 ml d'eau et boire par petites gorgées, et dissoudre 1 comprimé après l'effort.`,
        precautions: `Se conformer aux conseils d’utilisation. A conserver à l’abri de la chaleur, de la lumière et de l’humidité.`,
        weight: '20 comprimés',
        servings: '20 doses',
        highlights: [
            'HYDRATATION OPTIMALE',
            'Riche en Électrolytes',
            'Sans Sucre',
            'Arôme Naturel Citron',
            'Anti-Crampes & Récupération'
        ],
        keywords: ['electrolytes', 'hydratation', 'sport', 'minéraux', 'sans sucre', 'citron'],
        inStock: true,
        tags: ['hydration', 'sport', 'electrolytes', 'sugar-free'],
        nutritionalValues: {
            portion: "1 comprimé",
            energy: "9 kcal",
            fats: "0g",
            fatsSaturated: "0g",
            carbs: "0.40g",
            carbsSugar: "0.01g",
            protein: "0.01g",
            salt: "0.38g"
        },
        attributes: [
            { label: "Potassium", value: "300 mg (15% AR)" },
            { label: "Calcium", value: "120 mg (15% AR)" },
            { label: "Magnésium", value: "56.25 mg (15% AR)" },
            { label: "Vitamine C", value: "80 mg (100% AR)" },
            { label: "Format", value: "Tube 20 effervescents" }
        ]
    },
    {
        id: 'ef-hydrafull-pack',
        name: 'Pack Hydrafull (x3)',
        brand: 'Eric Favre',
        category: 'vitamines',
        price: 24.90,
        oldPrice: 25.50,
        image: '/images/products/eric-favre/hydrafull-electrolytes-pack.png',
        description: `Pack Économique de 3 tubes d'Hydrafull Electrolytes ! (60 doses)
        
L'hydratation pour tous. Restez hydraté tout la journée en faisant le plein de minéraux ! (Crampes & récupération)

Découvrez Hydrafull Electrolytes - Hydratation +, la solution idéale pour une hydratation efficace et durable tout au long de la journée.
- Formulée avec des vitamines essentielles et des minéraux
- Sans sucre (0 calories inutiles)
- Arôme naturel de citron pour un rafraîchissement optimal

Idéal pour les efforts intenses ou pour maintenir un niveau d’hydratation optimal au quotidien.`,
        ingredients: `ACIDIFIANT : ACIDE CITRIQUE ; CITRATE DE POTASSIUM ; SELS DE CALCIUM D’ACIDE CITRIQUE ; RÉGULATEUR D’ACIDITÉ : BICARBONATE DE SODIUM ; SELS DE MAGNÉSIUM D’ACIDE CITRIQUE; AGENT DE CHARGE : SORBITOL ; ARÔME NATUREL CITRON (2,38%) ; VITAMINE C ; ÉDULCORANT : SUCRALOSE ; CHLORURE DE SODIUM ; CITRATE DE ZINC ; VITAMINE B3; VITAMINE B2 ; VITAMINE B6 ; VITAMINE B1.`,
        usage: `Dissoudre un comprimé effervescent dans 500 ml d'eau. Lors d'un effort intense, dissoudre 1 comprimé avant l'effort dans 500 ml d'eau et boire par petites gorgées, et dissoudre 1 comprimé après l'effort.`,
        precautions: `Se conformer aux conseils d’utilisation. A conserver à l’abri de la chaleur, de la lumière et de l’humidité.`,
        weight: '3 x 20 comprimés',
        servings: '60 doses',
        highlights: [
            'PACK ÉCONOMIQUE',
            '3 Tubes de 20 tabs',
            'Hydratation & Électrolytes',
            'Sans Sucre',
            'Arôme Naturel Citron'
        ],
        keywords: ['electrolytes', 'hydratation', 'sport', 'minéraux', 'sans sucre', 'pack'],
        inStock: true,
        tags: ['hydration', 'sport', 'electrolytes', 'pack', 'promo'],
        nutritionalValues: {
            portion: "1 comprimé",
            energy: "9 kcal",
            fats: "0g",
            fatsSaturated: "0g",
            carbs: "0.40g",
            carbsSugar: "0.01g",
            protein: "0.01g",
            salt: "0.38g"
        },
        attributes: [
            { label: "Potassium", value: "300 mg (15% AR)" },
            { label: "Calcium", value: "120 mg (15% AR)" },
            { label: "Magnésium", value: "56.25 mg (15% AR)" },
            { label: "Vitamine C", value: "80 mg (100% AR)" },
            { label: "Format", value: "3 Tubes (60 effervescents)" }
        ]
    },

    {
        id: 'ef-omega3',
        name: 'Oméga 3 Cœur & Cerveau',
        brand: 'Eric Favre',
        category: 'omega3',
        price: 15.90,
        image: '/images/categories/omega3.png',
        description: `Le meilleur des Omégas 3 pour le maintien des fonctions cardiaques et cérébrales.
        
Les omégas 3 sont reconnus pour agir à la fois sur la santé cardio-vasculaire et sur la mémoire mais présentent de nombreux autres avantages.
- L’acide eicosapentaénoique (EPA) et l’acide docosahexaénoique (DHA) contribuent à une fonction cardiaque normale.
- Le DHA contribue quant à lui au fonctionnement normal du cerveau (concentration, mémoire, équilibre émotionnel).

Le Laboratoire Eric Favre® a sélectionné une huile de poisson de qualité hautement concentrée en oméga 3 et en EPA/DHA, fournissant ces deux acides gras essentiels en quantités équilibrées, le tout enrichi en Vitamine E.`,
        ingredients: `HUILE DE POISSON (NON ORIGINE FRANCE) ; D-ALPHA TOCOPHEROL ; TUNIQUE : GELATINE, GLYCERINE.`,
        usage: `Prendre 2 à 3 capsules par jour avec un verre d’eau le matin, pendant le petit déjeuner. De 6 à 10 ans : 1 à 2 capsules par jour. Programme renouvelable.`,
        precautions: `Ne pas dépasser la dose journalière recommandée. À utiliser dans le cadre d’une alimentation équilibrée et d’un mode de vie sain. Tenir hors de portée des jeunes enfants. Conserver au sec, à l’abri de la lumière et de la chaleur.`,
        weight: '120 capsules',
        servings: '40 à 60 jours',
        highlights: [
            'Cardio Protecteur',
            'Équilibre Émotionnel & Mémoire',
            'Haute Concentration EPA/DHA',
            'Enrichi en Vitamine E',
            'Huile de Poisson Qualité'
        ],
        keywords: ['omega 3', 'epa', 'dha', 'coeur', 'cerveau', 'memoire'],
        inStock: true,
        tags: ['omega3', 'heart', 'brain', 'health'],
        nutritionalValues: {
            portion: "3 capsules",
            energy: "-",
            fats: "3000 mg (Huile)",
            fatsSaturated: "-",
            carbs: "-",
            carbsSugar: "-",
            protein: "-",
            salt: "-"
        },
        attributes: [
            { label: "EPA (3 caps)", value: "540 mg" },
            { label: "DHA (3 caps)", value: "360 mg" },
            { label: "Vitamine E  (3 caps)", value: "11.8 mg" },
            { label: "Format", value: "Pilulier 120 capsules" }
        ]
    },
    {
        id: 'ef-omega3-pack',
        name: 'Pack Oméga 3 (x3)',
        brand: 'Eric Favre',
        category: 'omega3',
        price: 39.90,
        oldPrice: 47.70,
        image: '/images/products/eric-favre/omega3-pack.png',
        description: `Pack Économique de 3 piluliers d'Oméga 3 ! (Programme 6 mois environ)

Le meilleur des Omégas 3 pour le maintien des fonctions cardiaques et cérébrales.
- Cardio protecteur
- Equilibre émotionnel
- Concentration et mémoire

Concentration élevée : 3000mg d'huile de poisson pour 3 capsules, riches en EPA et DHA.`,
        ingredients: `HUILE DE POISSON (NON ORIGINE FRANCE) ; D-ALPHA TOCOPHEROL ; TUNIQUE : GELATINE, GLYCERINE.`,
        usage: `Prendre 2 à 3 capsules par jour avec un verre d’eau le matin, pendant le petit déjeuner.`,
        precautions: `Ne pas dépasser la dose journalière recommandée.`,
        weight: '3 x 120 capsules',
        servings: '120 à 180 jours',
        highlights: [
            'PACK 3 MOIS+',
            '30% d\'Économie',
            'Cardio & Cerveau',
            'Forte Teneur en Oméga 3',
            'Idéal Cure Longue'
        ],
        keywords: ['omega 3', 'pack', 'promo', 'coeur', 'cerveau'],
        inStock: true,
        tags: ['omega3', 'heart', 'brain', 'pack', 'promo'],
        nutritionalValues: {
            portion: "3 capsules",
            energy: "-",
            fats: "3000 mg (Huile)",
            fatsSaturated: "-",
            carbs: "-",
            carbsSugar: "-",
            protein: "-",
            salt: "-"
        },
        attributes: [
            { label: "EPA (3 caps)", value: "540 mg" },
            { label: "DHA (3 caps)", value: "360 mg" },
            { label: "Format", value: "3 Piluliers (360 caps)" }
        ]
    },
    {
        id: 'lfn-omega3',
        name: 'Oméga 3 (La French)',
        brand: 'La French Nutrition',
        category: 'omega3',
        price: 15.10,
        image: '/images/products/la-french-nutrition/omega3.png',
        description: `Santé Cardiovasculaire, Cérébrale & Vision.
        
Les Oméga-3 sont des acides gras polyinsaturés essentiels que l’organisme ne peut pas synthétiser en quantité suffisante. Ce complément alimentaire apporte des Oméga-3 sous forme d’huile de poisson, incluant de l’EPA et du DHA, ainsi que de la vitamine E.

Bénéfices reconnus :
- L’EPA et le DHA contribuent à une fonction cardiaque normale (250mg/jour)
- Le DHA contribue au maintien d’une vision normale et au fonctionnement normal du cerveau
- La vitamine E contribue à protéger les cellules contre le stress oxydatif`,
        ingredients: `Huile de poisson (18% EPA, 12% DHA), Gélatine, Glycérine, Eau, Vitamine E (ACÉTATE - DL - ALPHA - TOCOPHÉROL).
Peut contenir des traces de gluten, d'œufs, graines de sésame, fruits à coques, soja, céleri, sulfites, crustacés.`,
        usage: `Prendre 3 capsules par jour avec un verre d'eau.`,
        precautions: `Ne pas dépasser la dose journalière recommandée. Déconseillé aux femmes enceintes ou allaitantes sans avis médical.`,
        weight: '60 capsules',
        servings: '20 jours',
        highlights: [
            'Santé Cardiovasculaire',
            'Vision & Cerveau',
            'Enrichi en Vitamine E',
            'Huile de Poisson Standarisée',
            'Fabriqué en France'
        ],
        keywords: ['omega 3', 'la french', 'coeur', 'vision', 'cerveau'],
        inStock: true,
        tags: ['omega3', 'heart', 'brain', 'vision', 'french'],
        nutritionalValues: {
            portion: "1 capsule",
            energy: "-",
            fats: "1000 mg (Huile)",
            fatsSaturated: "-",
            carbs: "-",
            carbsSugar: "-",
            protein: "-",
            salt: "-"
        },
        attributes: [
            { label: "EPA (1 cap)", value: "180 mg" },
            { label: "DHA (1 cap)", value: "120 mg" },
            { label: "Vitamine E", value: "0.01 mg" },
            { label: "Format", value: "Pot 60 capsules" }
        ]
    },
    {
        id: 'redcon1-total-war',
        name: 'Total War Pre-Workout',
        brand: 'REDCON1',
        category: 'pre-workout',
        price: 24.99,
        oldPrice: 35.99,
        image: '/images/products/redcon1/total-war-blue-lemonade.png',
        images: [
            '/images/products/redcon1/total-war-blue-lemonade.png',
            '/images/products/redcon1/total-war-blue-raspberry.png',
            '/images/products/redcon1/total-war-grape.png',
            '/images/products/redcon1/total-war-green-apple.png',
            '/images/products/redcon1/total-war-orange-crush.png',
            '/images/products/redcon1/total-war-pineapple-juice.png',
            '/images/products/redcon1/total-war-rainbow-candy.png',
            '/images/products/redcon1/total-war-tigers-blood.png',
            '/images/products/redcon1/total-war-watermelon.png'
        ],
        description: `PRÉPAREZ-VOUS AU COMBAT !
        
Total War de Redcon1 est un pre-workout à la formule particulièrement riche, conçu par des professionnels pour des séances dignes de ce nom.
Il combine 10 ingrédients actifs pour influencer plusieurs leviers de la performance : congestion, énergie, concentration.

Points forts :
- PUISSANCE MAXIMALE : 350mg de caféine totale pour une énergie explosive.
- FORMULE COMPLÈTE : 6g Citrulline, 3.2g Bêta-Alanine, 1g Taurine.
- SANS CRASH : Énergie durable et focus intense.
- CONGESTION : Augmentation des niveaux d'énergie et du flux sanguin.

"Total War permet à son utilisateur de rejoindre le champ de bataille avec confiance."`,
        ingredients: `L-Citrulline Malate (6g), Bêta-Alanine (3.2g), Extrait de Betterave (1g), Taurine (1g), Caféine Anhydre (250mg), Extrait de Genévrier (AMPIblast™ 150mg), Malate de Dicaféine (100mg), Polyphénols de Cacao, Thé Vert, Naringine, BioPerine (10mg).`,
        usage: `En raison de sa forte teneur en caféine, ne pas dépasser 1 dose par jour. 
Mélanger 1 dose (15g) avec 120-180 ml d’eau fraîche, 30 minutes avant l'entraînement.
Pour évaluer la tolérance, débuter par des demi-doses.`,
        precautions: `Teneur élevée en caféine (350mg/dose). Ne pas associer avec d'autres stimulants. Déconseillé aux enfants, femmes enceintes ou allaitantes (max 200mg/jour recommandé pour ces profils).`,
        weight: '441g (30 Servings)',
        servings: '30 doses',
        highlights: [
            '350mg Caféine Totale',
            '6g Citrulline Malate',
            '3.2g Bêta-Alanine',
            'Congestion & Focus',
            'Prix Promo'
        ],
        keywords: ['preworkout', 'total war', 'redcon1', 'cafeine', 'puissance'],
        inStock: true,
        tags: ['preworkout', 'intense', 'energy', 'pump'],
        nutritionalValues: {
            portion: "1 dose (14.7g)",
            energy: "0 kcal",
            fats: "0g",
            fatsSaturated: "0g",
            carbs: "<1g",
            carbsSugar: "0g",
            protein: "0g",
            salt: "0g"
        },
        attributes: [
            { label: "Caféine Totale", value: "350 mg" },
            { label: "Citrulline Malate", value: "6000 mg" },
            { label: "Bêta-Alanine", value: "3200 mg" },
            { label: "Taurine", value: "1000 mg" }
        ],
        flavors: [
            { name: "Blue Lemonade", image: "/images/products/redcon1/total-war-blue-lemonade.png" },
            { name: "Blue Raspberry", image: "/images/products/redcon1/total-war-blue-raspberry.png" },
            { name: "Grape", image: "/images/products/redcon1/total-war-grape.png" },
            { name: "Green Apple", image: "/images/products/redcon1/total-war-green-apple.png" },
            { name: "Orange Crush", image: "/images/products/redcon1/total-war-orange-crush.png" },
            { name: "Pineapple Juice", image: "/images/products/redcon1/total-war-pineapple-juice.png" },
            { name: "Rainbow Candy", image: "/images/products/redcon1/total-war-rainbow-candy.png" },
            { name: "Tiger's Blood", image: "/images/products/redcon1/total-war-tigers-blood.png" },
            { name: "Watermelon", image: "/images/products/redcon1/total-war-watermelon.png" }
        ]
    },
    {
        id: 'gen-burner',
        name: 'Brûleur Extrême',
        brand: 'Bodystart Nutrition',
        category: 'bruleurs',
        price: 29.90,
        image: '/images/categories/bruleurs.png',
        description: 'Formule thermogénique avancée pour stimuler le métabolisme et favoriser la perte de gras. Idéal en période de sèche pour définir votre silhouette.',
        ingredients: 'Extrait de Thé Vert, L-Carnitine L-Tartrate, Caféine Anhydre, Extrait de Guarana, Extrait de Piment de Cayenne, Chrome.',
        usage: 'Prendre 2 gélules le matin et 2 gélules avant l\'entraînement ou le déjeuner.',
        weight: '90 gélules',
        inStock: true,
        tags: ['fatburner', 'weightloss', 'energy']
    },
    {
        id: 'gen-bcaa',
        name: 'Amino Recovery',
        brand: 'Bodystart Nutrition',
        category: 'bcaa',
        price: 27.90,
        image: '/images/categories/bcaa.png',
        description: 'Mélange d\'acides aminés branchés (BCAA) au ratio 2:1:1 pour optimiser la récupération musculaire et réduire la fatigue. Indispensable pour les entraînements intenses.',
        ingredients: 'L-Leucine, L-Isoleucine, L-Valine, Électrolytes (Sodium, Potassium), Vitamine B6.',
        usage: 'Mélanger 1 dose (10g) avec 500ml d\'eau. À consommer pendant ou après l\'entraînement.',
        weight: '400g',
        inStock: true,
        tags: ['recovery', 'amino', 'muscle']
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
