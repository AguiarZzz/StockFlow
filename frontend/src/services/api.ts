const API_URL = "http://localhost:3000";

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function createProduct(data: { name: string; price: number }) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Failed to create product");
  }

  return result;
}

export async function stockIn(productId: string, quantity: number) {
  const res = await fetch(`${API_URL}/stock/in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });

  return res.json();
}

export async function stockOut(productId: string, quantity: number) {
  const res = await fetch(`${API_URL}/stock/out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });

  return res.json();
}
