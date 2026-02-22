import { shopifyFetch } from './shopify';

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  description: string;
  vendor?: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage: {
    url: string;
    altText: string;
  } | null;
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        image: {
          url: string;
        } | null;
      };
    }[];
  };
  valeursNutritionnelles?: { value: string } | null;
  conseilsUtilisation?: { value: string } | null;
  composition?: { value: string } | null;
}

const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          valeursNutritionnelles: metafield(namespace: "custom", key: "valeurs_nutritionnelles") {
            value
          }
          conseilsUtilisation: metafield(namespace: "custom", key: "conseils_utilisation") {
            value
          }
          composition: metafield(namespace: "custom", key: "composition") {
            value
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getShopifyProducts(limit = 20): Promise<ShopifyProduct[]> {
  const response = await shopifyFetch<any>({
    query: GET_PRODUCTS_QUERY,
    variables: { first: limit },
  });

  const products = response.body.data.products.edges.map((edge: any) => edge.node);
  return products;
}

const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      valeursNutritionnelles: metafield(namespace: "custom", key: "valeurs_nutritionnelles") {
        value
      }
      conseilsUtilisation: metafield(namespace: "custom", key: "conseils_utilisation") {
        value
      }
      composition: metafield(namespace: "custom", key: "composition") {
        value
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            image {
              url
            }
          }
        }
      }
    }
  }
`;

export async function getShopifyProduct(handle: string): Promise<ShopifyProduct | null> {
  const response = await shopifyFetch<any>({
    query: GET_PRODUCT_QUERY,
    variables: { handle },
  });

  return response.body.data.product;
}

// Convert Shopify product format to our local Product format
import type { Product, Category } from '../data/products';

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: {
    url: string;
    altText?: string;
  }
}

const GET_COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export async function getShopifyCollections(limit: number = 20): Promise<ShopifyCollection[]> {
  const response = await shopifyFetch<any>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first: limit },
  });

  return response.body.data.collections.edges.map((e: any) => e.node);
}

const GET_COLLECTION_PRODUCTS_QUERY = `
  query getCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            valeursNutritionnelles: metafield(namespace: "custom", key: "valeurs_nutritionnelles") {
              value
            }
            conseilsUtilisation: metafield(namespace: "custom", key: "conseils_utilisation") {
              value
            }
            composition: metafield(namespace: "custom", key: "composition") {
              value
            }
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getShopifyProductsByCollection(handle: string, limit: number = 50): Promise<ShopifyProduct[]> {
  const response = await shopifyFetch<any>({
    query: GET_COLLECTION_PRODUCTS_QUERY,
    variables: { handle, first: limit },
  });

  if (!response.body.data.collection) return [];
  return response.body.data.collection.products.edges.map((e: any) => e.node);
}

export function mapShopifyToLocalProduct(sp: ShopifyProduct): Product {
  const firstVariant = sp.variants?.edges[0]?.node;
  const isAvailable = firstVariant?.availableForSale ?? false;
  const variantId = firstVariant?.id;

  // Shopify prices are strings, need to parse to float
  const price = sp.priceRange?.minVariantPrice?.amount ? parseFloat(sp.priceRange.minVariantPrice.amount) : 0;

  // Get all image URLs
  const images = sp.images?.edges.map(e => e.node.url) || [];
  const mainImage = sp.featuredImage?.url || images[0] || '/images/products/placeholder.png';

  // Process variants to build the flavors list
  const flavors = sp.variants?.edges.map(e => {
    const v = e.node;
    return {
      name: v.title !== 'Default Title' ? v.title : 'Standard',
      image: v.image?.url,
      id: v.id,
      price: parseFloat(v.price.amount)
    };
  }) || [];

  return {
    id: sp.handle || sp.id.split('/').pop() || sp.id, // Use Handle for clean URLs
    name: sp.title,
    brand: sp.vendor || 'Bodystart Nutrition', // Use Shopify vendor
    category: 'proteines', // Default for now
    price: price,
    image: mainImage,
    images: images,
    description: sp.description || '',
    metafieldNutrition: sp.valeursNutritionnelles?.value,
    metafieldUsage: sp.conseilsUtilisation?.value,
    metafieldComposition: sp.composition?.value,
    inStock: isAvailable,
    isNew: true,
    isBestseller: true,
    variantId: variantId,
    flavors: flavors.length > 0 && flavors[0].name !== 'Standard' ? flavors : undefined,
  };
}

// Default icons mapping based on collection handle keywords
export function mapShopifyToLocalCategory(sc: ShopifyCollection): Category {
  let icon = "🏋️"; // Default
  const lowerHandle = sc.handle.toLowerCase();

  if (lowerHandle.includes('proteine') || lowerHandle.includes('whey')) icon = "🥛";
  else if (lowerHandle.includes('gainer')) icon = "💪";
  else if (lowerHandle.includes('amino') || lowerHandle.includes('bcaa')) icon = "💊";
  else if (lowerHandle.includes('pre-workout') || lowerHandle.includes('preworkout')) icon = "⚡";
  else if (lowerHandle.includes('creatine')) icon = "🔋";
  else if (lowerHandle.includes('bruleur') || lowerHandle.includes('burner')) icon = "🔥";
  else if (lowerHandle.includes('sante') || lowerHandle.includes('omega')) icon = "❤️";
  else if (lowerHandle.includes('barre') || lowerHandle.includes('snack')) icon = "🍫";

  return {
    id: sc.handle,
    name: sc.title,
    description: sc.description || undefined,
    icon: icon,
    image: sc.image?.url
  }
}
