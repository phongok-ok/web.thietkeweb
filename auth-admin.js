(function () {
  'use strict';

  const USER_KEY = 'technova_users';
  const SESSION_KEY = 'technova_session';
  const PRODUCT_KEY = 'technova_products';
  const BRAND_KEY = 'technova_brands';
  const ORDER_KEY = 'technova_orders';

  const defaultAdmin = {
    id: 'admin',
    name: 'TechNova Admin',
    email: 'admin@technova.vn',
    password: 'admin123',
    phone: '0900000000',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00.000Z',
  };

  function safeParse(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function read(key, fallback) {
    return safeParse(localStorage.getItem(key), fallback);
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function normalizePhone(phone) {
    return String(phone || '').replace(/[^\d+]/g, '');
  }

  function cleanText(value) {
    return String(value || '').replace(/[<>]/g, '').trim();
  }

  function publicUser(user) {
    if (!user) return null;
    const clone = { ...user };
    delete clone.password;
    return clone;
  }

  function ensureUsers() {
    const users = read(USER_KEY, []);
    const hasAdmin = users.some((user) => user.role === 'admin' || normalizeEmail(user.email) === defaultAdmin.email);
    const nextUsers = hasAdmin ? users : [defaultAdmin, ...users];
    if (!hasAdmin) write(USER_KEY, nextUsers);
    return nextUsers;
  }

  function getUsers() {
    return ensureUsers();
  }

  function saveUsers(users) {
    write(USER_KEY, users);
  }

  function upsertUser(users, input) {
    const list = Array.isArray(users) ? users : getUsers();
    const id = input.id || `user-${Date.now()}`;
    const existing = list.find((user) => user.id === id);
    const email = normalizeEmail(input.email || existing?.email);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return list;
    if (list.some((user) => user.id !== id && normalizeEmail(user.email) === email)) return list;
    const user = {
      ...existing,
      id,
      name: cleanText(input.name || existing?.name || 'Khách hàng'),
      email,
      password: String(input.password || existing?.password || '123456'),
      phone: normalizePhone(input.phone || existing?.phone || ''),
      role: input.role === 'admin' ? 'admin' : 'customer',
      createdAt: existing?.createdAt || new Date().toISOString(),
    };
    return existing ? list.map((item) => (item.id === id ? user : item)) : [...list, user];
  }

  function deleteUser(users, id) {
    const list = Array.isArray(users) ? users : getUsers();
    const target = list.find((user) => user.id === id);
    if (!target || target.id === defaultAdmin.id) return list;
    const remainingAdmins = list.filter((user) => user.id !== id && user.role === 'admin').length;
    if (target.role === 'admin' && remainingAdmins === 0) return list;
    return list.filter((user) => user.id !== id);
  }

  function register(input) {
    const name = cleanText(input && input.name);
    const email = normalizeEmail(input && input.email);
    const password = String(input && input.password ? input.password : '');
    const phone = normalizePhone(input && input.phone);

    if (name.length < 2) return { ok: false, message: 'Tên phải có ít nhất 2 ký tự.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: 'Email không hợp lệ.' };
    if (password.length < 6) return { ok: false, message: 'Mật khẩu phải có ít nhất 6 ký tự.' };

    const users = getUsers();
    if (users.some((user) => normalizeEmail(user.email) === email)) {
      return { ok: false, message: 'Email này đã được đăng ký.' };
    }

    const user = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      phone,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    const nextUsers = [...users, user];
    saveUsers(nextUsers);
    write(SESSION_KEY, { userId: user.id });
    return { ok: true, user: publicUser(user) };
  }

  function login(identifierInput, passwordInput) {
    const identifier = String(identifierInput || '').trim();
    const email = normalizeEmail(identifier);
    const phone = normalizePhone(identifier);
    const password = String(passwordInput || '');
    const user = getUsers().find((item) => {
      const matchesIdentifier =
        normalizeEmail(item.email) === email ||
        Boolean(phone && normalizePhone(item.phone) === phone);
      return matchesIdentifier && item.password === password;
    });
    if (!user) return { ok: false, message: 'Email/SĐT hoặc mật khẩu không đúng.' };
    write(SESSION_KEY, { userId: user.id });
    return { ok: true, user: publicUser(user) };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getCurrentUser() {
    const session = read(SESSION_KEY, null);
    if (!session || !session.userId) return null;
    const user = getUsers().find((item) => item.id === session.userId);
    return publicUser(user);
  }

  function isAdmin() {
    const user = getCurrentUser();
    return Boolean(user && user.role === 'admin');
  }

  function loadProducts(defaultProducts) {
    const storedProducts = read(PRODUCT_KEY, null);
    if (Array.isArray(storedProducts) && storedProducts.length) return storedProducts;
    const seededProducts = (defaultProducts || []).map((item) => ({ ...item }));
    write(PRODUCT_KEY, seededProducts);
    return seededProducts;
  }

  function saveProducts(products) {
    write(PRODUCT_KEY, products || []);
  }

  function nextProductId(products) {
    return (products || []).reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
  }

  function normalizeProduct(input, fallback) {
    const source = fallback || {};
    const product = { ...source, ...input };
    product.id = Number(product.id || source.id || 0);
    product.name = cleanText(product.name);
    product.brand = cleanText(product.brand || 'iphone').toLowerCase();
    product.chip = cleanText(product.chip || source.chip || 'Đang cập nhật');
    product.ram = cleanText(product.ram || source.ram || '8GB');
    product.rom = cleanText(product.rom || source.rom || '128GB');
    product.battery = cleanText(product.battery || source.battery || '5000mAh');
    product.camera = cleanText(product.camera || source.camera || 'Đang cập nhật');
    product.price = Math.max(0, Number(product.price || 0));
    product.oldPrice = product.oldPrice ? Math.max(0, Number(product.oldPrice)) : undefined;
    product.discount = product.discount ? Math.max(0, Number(product.discount)) : undefined;
    product.rating = product.rating ? Math.min(5, Math.max(0, Number(product.rating))) : 4.8;
    product.ratingCount = product.ratingCount ? Math.max(0, Number(product.ratingCount)) : 0;
    product.stock = cleanText(product.stock || 'Còn hàng');
    product.badge = Array.isArray(product.badge) ? product.badge : ['Chính Hãng VN'];
    product.condition = cleanText(product.condition || product.badge[0] || 'Chính Hãng VN');
    product.screen = cleanText(product.screen || source.screen || 'Đang cập nhật');
    product.os = cleanText(product.os || source.os || 'Đang cập nhật');
    product.colors = Array.isArray(product.colors) ? product.colors : ['Đen', 'Trắng'];
    product.gaming = cleanText(product.gaming || source.gaming || 'Cao');
    product.stockCount = product.stockCount ? Math.max(0, Number(product.stockCount)) : 10;
    product.img = cleanText(product.img || source.img || 'images/id1.png');
    product.imgs = Array.isArray(product.imgs) && product.imgs.length ? product.imgs : [product.img];
    if (product.oldPrice === undefined) delete product.oldPrice;
    if (product.discount === undefined) delete product.discount;
    return product;
  }

  function upsertProduct(products, input) {
    const list = Array.isArray(products) ? products : [];
    const incomingId = Number(input && input.id ? input.id : 0);
    const existing = list.find((item) => Number(item.id) === incomingId);
    const product = normalizeProduct(
      { ...input, id: incomingId || nextProductId(list) },
      existing
    );

    if (!product.name) return list;
    if (existing) {
      return list.map((item) => (Number(item.id) === product.id ? product : item));
    }
    return [...list, product];
  }

  function deleteProduct(products, id) {
    const numericId = Number(id);
    return (products || []).filter((item) => Number(item.id) !== numericId);
  }

  function loadBrands(defaultBrands) {
    const storedBrands = read(BRAND_KEY, null);
    if (Array.isArray(storedBrands) && storedBrands.length) return storedBrands;
    const logos = {
      iphone: 'https://cdn-icons-png.flaticon.com/512/0/747.png',
      samsung: 'images/ss.png',
      redmi: 'images/redmi.png',
      poco: 'images/poco.png',
    };
    const brands = (defaultBrands || ['iphone', 'samsung', 'redmi', 'poco']).map((id) => {
      const brandId = cleanText(id).toLowerCase();
      return {
        id: brandId,
        name: cleanText(id).replace(/^./, (char) => char.toUpperCase()),
        logo: logos[brandId] || '',
        active: true,
      };
    });
    write(BRAND_KEY, brands);
    return brands;
  }

  function saveBrands(brands) {
    write(BRAND_KEY, brands || []);
  }

  function upsertBrand(brands, input) {
    const list = Array.isArray(brands) ? brands : [];
    const id = cleanText(input.id || input.name).toLowerCase().replace(/\s+/g, '-');
    if (!id) return list;
    const existing = list.find((brand) => brand.id === id);
    const brand = {
      ...existing,
      id,
      name: cleanText(input.name || id),
      logo: cleanText(input.logo || existing?.logo || ''),
      active: input.active !== false,
    };
    return existing ? list.map((item) => (item.id === id ? brand : item)) : [...list, brand];
  }

  function deleteBrand(brands, id) {
    return (brands || []).filter((brand) => brand.id !== id);
  }

  function loadOrders() {
    return read(ORDER_KEY, []);
  }

  function saveOrders(orders) {
    write(ORDER_KEY, orders || []);
  }

  function createOrder(input) {
    const items = Array.isArray(input.items) ? input.items : [];
    const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
    const vatRate = Number(input.vatRate ?? 0.1);
    const vat = Math.round(subtotal * vatRate);
    const total = subtotal + vat;
    const order = {
      id: `TN${Date.now()}`,
      customerName: cleanText(input.customerName || 'Khách lẻ'),
      customerEmail: normalizeEmail(input.customerEmail || ''),
      items,
      subtotal,
      vatRate,
      vat,
      total,
      createdAt: new Date().toISOString(),
      status: 'paid',
    };
    const orders = [...loadOrders(), order];
    saveOrders(orders);
    return order;
  }

  const api = {
    auth: {
      getUsers,
      saveUsers,
      upsertUser,
      deleteUser,
      register,
      login,
      logout,
      getCurrentUser,
      isAdmin,
    },
    data: {
      loadProducts,
      saveProducts,
      upsertProduct,
      deleteProduct,
      loadBrands,
      saveBrands,
      upsertBrand,
      deleteBrand,
      loadOrders,
      saveOrders,
      createOrder,
    },
  };

  window.TechNova = api;
})();
