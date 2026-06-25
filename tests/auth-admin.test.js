const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function createStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

function loadModule() {
  const localStorage = createStorage();
  const sandbox = {
    window: {},
    localStorage,
    console,
  };
  sandbox.globalThis = sandbox;

  const source = fs.readFileSync(path.join(__dirname, '..', 'auth-admin.js'), 'utf8');
  vm.runInNewContext(source, sandbox, { filename: 'auth-admin.js' });

  return { localStorage, api: sandbox.window.TechNova };
}

const { api } = loadModule();

const adminLogin = api.auth.login('admin@technova.vn', 'admin123');
assert.equal(adminLogin.ok, true);
assert.equal(adminLogin.user.role, 'admin');
assert.equal(api.auth.isAdmin(), true);

api.auth.logout();
assert.equal(api.auth.getCurrentUser(), null);

const registerResult = api.auth.register({
  name: 'Nguyen Van A',
  email: 'user@example.com',
  password: '123456',
  phone: '0909000000',
});
assert.equal(registerResult.ok, true);
assert.equal(registerResult.user.role, 'customer');

const duplicateResult = api.auth.register({
  name: 'Nguyen Van B',
  email: 'USER@example.com',
  password: '123456',
});
assert.equal(duplicateResult.ok, false);

const userLogin = api.auth.login('user@example.com', '123456');
assert.equal(userLogin.ok, true);
assert.equal(api.auth.isAdmin(), false);

api.auth.logout();
const phoneLogin = api.auth.login('0909000000', '123456');
assert.equal(phoneLogin.ok, true);
assert.equal(phoneLogin.user.email, 'user@example.com');

const defaults = [
  { id: 1, brand: 'iphone', name: 'iPhone Demo', price: 100, stock: 'Còn hàng' },
  { id: 2, brand: 'poco', name: 'POCO Demo', price: 200, stock: 'Còn hàng' },
];

let products = api.data.loadProducts(defaults);
assert.equal(products.length, 2);
assert.equal(products[0].name, 'iPhone Demo');

products = api.data.upsertProduct(products, { id: 2, name: 'POCO Updated', price: 250 });
assert.equal(products.find((item) => item.id === 2).name, 'POCO Updated');
assert.equal(products.find((item) => item.id === 2).brand, 'poco');

products = api.data.upsertProduct(products, { brand: 'redmi', name: 'Redmi New', price: 300 });
assert.equal(products.length, 3);
assert.equal(products[2].id, 3);

products = api.data.deleteProduct(products, 1);
assert.equal(products.some((item) => item.id === 1), false);

api.data.saveProducts(products);
assert.deepEqual(api.data.loadProducts(defaults), products);

let users = api.auth.getUsers();
users = api.auth.upsertUser(users, {
  name: 'Staff',
  email: 'staff@example.com',
  password: 'abcdef',
  role: 'admin',
});
api.auth.saveUsers(users);
assert.equal(api.auth.getUsers().some((user) => user.email === 'staff@example.com'), true);

const staff = api.auth.getUsers().find((user) => user.email === 'staff@example.com');
users = api.auth.deleteUser(api.auth.getUsers(), staff.id);
api.auth.saveUsers(users);
assert.equal(api.auth.getUsers().some((user) => user.email === 'staff@example.com'), false);

let brands = api.data.loadBrands(['iphone', 'poco']);
brands = api.data.upsertBrand(brands, { name: 'Xiaomi', logo: 'images/xiaomi.png' });
assert.equal(brands.some((brand) => brand.id === 'xiaomi'), true);
assert.equal(brands.find((brand) => brand.id === 'xiaomi').logo, 'images/xiaomi.png');
brands = api.data.deleteBrand(brands, 'xiaomi');
assert.equal(brands.some((brand) => brand.id === 'xiaomi'), false);

const order = api.data.createOrder({
  customerName: 'Nguyen Van A',
  customerEmail: 'user@example.com',
  items: [{ id: 2, name: 'POCO Updated', price: 250, qty: 2 }],
  vatRate: 0.1,
});
assert.equal(order.subtotal, 500);
assert.equal(order.vat, 50);
assert.equal(order.total, 550);
assert.equal(api.data.loadOrders().length, 1);

console.log('auth-admin logic tests passed');
