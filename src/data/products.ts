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
    flavors?: (string | { name: string; image?: string })[]
    nutritionalValues?: {
        portion: string
        energy: string
        fats: string
        fatsSaturated: string
        carbs: string
        carbsSugar: string
        protein: string
        salt: string
    }
    aminogram?: {
        label: string
        value: string
    }[]
    inStock: boolean
    isBestseller?: boolean
    isNew?: boolean
}

export const categories = [
    { id: 'proteines', name: 'Protéines', icon: '', image: '/images/categories/eric-favre-iso-zero.png' },
    { id: 'creatine', name: 'Créatine', icon: '', image: '/images/categories/creatine.png' },
    { id: 'vitamines', name: 'Vitamines & Minéraux', icon: '', image: '/images/categories/vitamines.png' },
    { id: 'omega3', name: 'Oméga-3', icon: '', image: '/images/categories/omega3.png' },
    { id: 'pre-workout', name: 'Pré-Workout', icon: '', image: '/images/categories/pre-workout.png' },
    { id: 'bruleurs', name: 'Brûleurs & Carnitine', icon: '', image: '/images/categories/bruleurs.png' },
    { id: 'bcaa', name: 'BCAA & Acides Aminés', icon: '', image: '/images/categories/bcaa.png' },
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
        id: 'ef-whey-chocolat',
        name: 'Whey Protein Chocolat',
        brand: 'Eric Favre',
        category: 'proteines',
        price: 34.90,
        oldPrice: 44.90,
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400',
        description: 'Whey protéine de haute qualité avec un délicieux goût chocolat. Idéale pour la récupération musculaire après l\'entraînement.',
        ingredients: 'Concentré de protéines de lactosérum, cacao maigre, arômes, émulsifiant (lécithine de soja), édulcorant (sucralose).',
        usage: 'Mélanger 30g (1 dose) avec 200-250ml d\'eau ou de lait. Consommer après l\'entraînement.',
        weight: '2kg',
        inStock: true,
        isBestseller: true,
    },
    {
        id: 'ef-whey-vanille',
        name: 'Whey Protein Vanille',
        brand: 'Eric Favre',
        category: 'proteines',
        price: 34.90,
        image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400',
        description: 'Whey protéine onctueuse saveur vanille crémeuse. 80% de protéines par portion.',
        ingredients: 'Concentré de protéines de lactosérum, arômes naturels, émulsifiant (lécithine de soja), édulcorant (sucralose).',
        usage: 'Mélanger 30g avec 200-250ml d\'eau ou de lait.',
        weight: '2kg',
        inStock: true,
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

    // NutriMuscle
    {
        id: 'nm-whey-native',
        name: 'Whey Native Bio',
        brand: 'NutriMuscle',
        category: 'proteines',
        price: 42.90,
        image: 'https://images.unsplash.com/photo-1612961616315-63cca93a3f57?w=400',
        description: 'Whey native issue de lait français bio. Extraction à froid pour une qualité maximale.',
        ingredients: 'Whey native bio (lait français), arômes naturels.',
        usage: '25g par portion après l\'entraînement.',
        weight: '1.2kg',
        inStock: true,
        isNew: true,
    },
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
        id: 'cg-isolate-choco',
        name: 'Whey Isolate Chocolat',
        brand: 'Coregenic',
        category: 'proteines',
        price: 49.90,
        oldPrice: 59.90,
        image: 'https://images.unsplash.com/photo-1579722820903-6548e8c52599?w=400',
        description: 'Isolat de whey ultra-filtré. 90% de protéines, faible en lactose et graisses.',
        ingredients: 'Isolat de protéines de lactosérum, cacao, arômes, édulcorant (stévia).',
        usage: '30g après l\'entraînement.',
        weight: '2kg',
        inStock: true,
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
        id: 'cg-mass-gainer',
        name: 'Mass Gainer Extreme',
        brand: 'Coregenic',
        category: 'proteines',
        price: 39.90,
        image: 'https://images.unsplash.com/photo-1598614187854-26a60e982dc4?w=400',
        description: 'Gainer haute calorie pour prise de masse. 1200 kcal par portion.',
        ingredients: 'Maltodextrine, concentré de whey, avoine, MCT.',
        usage: '150g avec 400ml de lait.',
        weight: '3kg',
        inStock: true,
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
