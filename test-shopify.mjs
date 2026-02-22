const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

const query = `
{
  shop {
    name
  }
  products(first: 5) {
    edges {
      node {
        title
        handle
      }
    }
  }
}
`;

console.log("Fetching from", endpoint);

fetch(endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query }),
})
    .then(res => res.json())
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(err => console.error(err));
