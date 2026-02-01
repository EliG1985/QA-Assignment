const { test, expect } = require('@playwright/test');

test.describe('Automation Exercise - API Suite', () => {

  // 1. Positive GET: Fetch all products list
  test('API Positive: Get All Products List', async ({ request }) => {
    const response = await request.get('/api/productsList');
    
    // The server returns 200 OK
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    
    // Automation Exercise API includes a responseCode inside the JSON
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  // 2. Negative POST: Method not allowed (Trying to POST to a GET-only endpoint)
  test('API Negative: Unsupported Request Method', async ({ request }) => {
    // Attempting to POST to productsList which only supports GET
    const response = await request.post('/api/productsList');
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // The API informs us that this method is not supported
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });

  // 3. Schema/Contract Validation: Validate Product structure
  test('API Contract: Product Object Structure', async ({ request }) => {
    const response = await request.get('/api/productsList');
    const body = await response.json();
    
    // Get the first product to validate its structure (Contract Testing)
    const firstProduct = body.products[0];
    
    expect(firstProduct).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String),
      category: expect.any(Object)
    });
  });
});