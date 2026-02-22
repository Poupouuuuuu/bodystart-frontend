/**
 * Helper file to communicate with Shopify Storefront API.
 * Uses native fetch to remain lightweight.
 */

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Default API version
const API_VERSION = '2024-01';

/**
 * Generic fetcher for Shopify Storefront API GraphQL requests.
 */
export async function shopifyFetch<T>({
    query,
    variables,
}: {
    query: string;
    variables?: Record<string, any>;
}): Promise<{ status: number; body: T } | never> {
    const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables }),
            }),
        });

        const body = await result.json();

        if (body.errors) {
            console.error('Shopify API Error:', body.errors);
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        };
    } catch (error) {
        console.error('Error in shopifyFetch:', error);
        throw {
            error,
            query,
        };
    }
}
