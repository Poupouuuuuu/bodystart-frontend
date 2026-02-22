import { shopifyFetch } from './shopify';
import type { CartItem } from '../context/CartContext';

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Creates a Shopify Cart and returns the checkout URL
 */
export async function createCheckoutUrl(items: CartItem[]): Promise<string | null> {
    const lines = items
        .filter(item => item.variantId) // We can only add items that have a Shopify Variant ID
        .map(item => ({
            merchandiseId: item.variantId,
            quantity: item.quantity,
        }));

    if (lines.length === 0) {
        console.warn("No valid Shopify items to checkout.");
        return null;
    }

    try {
        const response = await shopifyFetch<any>({
            query: CART_CREATE_MUTATION,
            variables: { input: { lines } },
        });

        const data = response.body.data.cartCreate;
        if (data?.userErrors?.length > 0) {
            console.error('Shopify Cart Errors:', data.userErrors);
            return null;
        }

        return data?.cart?.checkoutUrl || null;
    } catch (error) {
        console.error('Error creating checkout:', error);
        return null;
    }
}
