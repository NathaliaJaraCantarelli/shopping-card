export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const json = await request.json();
  return json;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && query) {
    const request = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
    const json = await request.json();
    return json;
  }
}

export async function getProductById(categoryId) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const json = await request.json();
  return json;
}

export async function getProductByRealId(id) {
  const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await request.json();
  return data;
}
