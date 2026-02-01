const { test, expect } = require('@playwright/test');

test.describe('API Suite - ReqRes', () => {
  
  // 1. Positive GET
  test('API Positive: Get User List', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
  });

  // 2. Negative POST
  test('API Negative: Login without password', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/login', {
      data: { email: "peter@klaven" }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });

  // 3. Schema/Contract Validation
  test('API Contract: Single User Structure', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    const body = await response.json();
    
    // Data Structure Validation
    expect(body).toHaveProperty('data');
    expect(body.data).toMatchObject({
      id: expect.any(Number),
      email: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String)
    });
  });
});