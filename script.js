/* ============================================================
   TechNova — script.js
   Loading Screen | Canvas | Products | Cart | Countdown | FAQ
   UPGRADED: Product Modal | Image Skeleton | Fallback | Light Mode
   ============================================================ */

'use strict';

/* ==================== PRODUCT DATABASE ==================== */
/* 
  Trường bổ sung mới:
  - condition: 'VN/A' | 'Chính Hãng VN' | 'Nội Địa'
  - screen: kích thước/loại màn hình
  - os: hệ điều hành
  - colors: mảng màu sắc
  - gaming: mức gaming 'Cao' | 'Rất Cao' | 'Xuất Sắc' | 'Thường'
  - imgs: mảng ảnh (dùng images/ local, có fallback)
*/
const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='160' viewBox='0 0 120 160'%3E%3Crect width='120' height='160' rx='12' fill='%23dbeafe'/%3E%3Crect x='35' y='20' width='50' height='120' rx='8' fill='%23bfdbfe'/%3E%3Ccircle cx='60' cy='140' r='6' fill='%2393c5fd'/%3E%3Crect x='45' y='10' width='30' height='6' rx='3' fill='%2393c5fd'/%3E%3C/svg%3E";

/* Helper: tạo mảng ảnh từ img chính + phiên bản khác (dùng local nếu có, fallback về CDN) */
function makeImgs(mainUrl, altUrls = []) {
  return [mainUrl, ...altUrls];
}

let products = [
  { id:1, brand:'iphone', name:'iPhone 16 Pro Max 256GB', chip:'A18 Pro', ram:'8GB', rom:'256GB', battery:'4685mAh', camera:'48MP+12MP+12MP (Triple)', price:34990000, oldPrice:37990000, discount:8, rating:5, ratingCount:2841, stock:'Còn hàng', badge:['VN/A'], hot:true, condition:'VN/A', screen:'6.9" Super Retina XDR OLED', os:'iOS 18', colors:['Titan Đen','Titan Trắng','Titan Sa Mạc','Titan Tự Nhiên'], gaming:'Xuất Sắc', stockCount:42,
    img:'images/id1.png',
    imgs:['images/id1.png', 'images/id1-1.png', 'images/id1-2.png'] },

  { id:2, brand:'iphone', name:'iPhone 16 Pro 256GB', chip:'A18 Pro', ram:'8GB', rom:'256GB', battery:'3582mAh', camera:'48MP+12MP+12MP (Triple)', price:28990000, oldPrice:31990000, discount:9, rating:5, ratingCount:1902, stock:'Còn hàng', badge:['VN/A'], hot:true, condition:'VN/A', screen:'6.3" Super Retina XDR OLED', os:'iOS 18', colors:['Titan Đen','Titan Trắng','Titan Sa Mạc'], gaming:'Xuất Sắc', stockCount:38,
    img:'images/id2.png',
    imgs:['images/id2.png', 'images/id2-1.png', 'images/id2-2.png'] },

  { id:3, brand:'iphone', name:'iPhone 16 Plus 256GB', chip:'A18', ram:'8GB', rom:'256GB', battery:'4674mAh', camera:'48MP+12MP (Dual)', price:24990000, oldPrice:27490000, discount:9, rating:4.8, ratingCount:945, stock:'Còn hàng', badge:['VN/A'], condition:'VN/A', screen:'6.7" Super Retina XDR OLED', os:'iOS 18', colors:['Đen Obsidian','Trắng','Hồng','Xanh Lam','Vàng'], gaming:'Cao', stockCount:25,
    img:'images/id3.png',
    imgs:['images/id3.png', 'images/id3-1.png', 'images/id3-2.png'] },

  { id:4, brand:'iphone', name:'iPhone 16 128GB', chip:'A18', ram:'8GB', rom:'128GB', battery:'3561mAh', camera:'48MP+12MP (Dual)', price:22490000, oldPrice:24490000, discount:8, rating:4.8, ratingCount:1205, stock:'Còn hàng', badge:['VN/A'], condition:'VN/A', screen:'6.1" Super Retina XDR OLED', os:'iOS 18', colors:['Đen Obsidian','Trắng','Hồng','Xanh Lam','Vàng'], gaming:'Cao', stockCount:57,
    img:'images/id4.png',
    imgs:['images/id4.png', 'images/id4-1.png', 'images/id4-2.png'] },

  { id:5, brand:'iphone', name:'iPhone 15 Pro Max 256GB', chip:'A17 Pro', ram:'8GB', rom:'256GB', battery:'4422mAh', camera:'48MP+12MP+12MP (Triple)', price:27990000, oldPrice:32990000, discount:15, rating:5, ratingCount:3142, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.7" Super Retina XDR OLED', os:'iOS 18', colors:['Titan Đen','Titan Trắng','Titan Xanh','Titan Tự Nhiên'], gaming:'Xuất Sắc', stockCount:33,
    img:'images/id5.png',
    imgs:['images/id5.png', 'images/id5-1.png', 'images/id5-2.png'] },

  { id:6, brand:'iphone', name:'iPhone 15 Pro 256GB', chip:'A17 Pro', ram:'8GB', rom:'256GB', battery:'3274mAh', camera:'48MP+12MP+12MP (Triple)', price:22490000, oldPrice:27490000, discount:18, rating:5, ratingCount:2418, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.1" Super Retina XDR OLED', os:'iOS 18', colors:['Titan Đen','Titan Trắng','Titan Xanh','Titan Tự Nhiên'], gaming:'Xuất Sắc', stockCount:28,
    img:'images/id6.png',
    imgs:['images/id6.png', 'images/id6-1.png', 'images/id6-2.png'] },

  { id:7, brand:'iphone', name:'iPhone 15 Plus 128GB', chip:'A16', ram:'6GB', rom:'128GB', battery:'4383mAh', camera:'48MP+12MP (Dual)', price:17490000, oldPrice:22490000, discount:22, rating:4.7, ratingCount:876, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.7" Super Retina XDR OLED', os:'iOS 18', colors:['Đen','Hồng','Xanh Lá','Vàng','Xanh Lam'], gaming:'Cao', stockCount:19,
    img:'images/id7.png',
    imgs:['images/id7.png', 'images/id7-1.png', 'images/id7-2.png'] },

  { id:8, brand:'iphone', name:'iPhone 15 128GB', chip:'A16', ram:'6GB', rom:'128GB', battery:'3877mAh', camera:'48MP+12MP (Dual)', price:15990000, oldPrice:19990000, discount:20, rating:4.8, ratingCount:1567, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.1" Super Retina XDR OLED', os:'iOS 18', colors:['Đen','Hồng','Xanh Lá','Vàng','Xanh Lam'], gaming:'Cao', stockCount:44,
    img:'images/id8-1.png',
    imgs:['images/id8-1.png', 'images/id8.png', 'images/id8-2.png'] },

  { id:9, brand:'iphone', name:'iPhone 14 Pro Max 256GB', chip:'A16 Bionic', ram:'6GB', rom:'256GB', battery:'4323mAh', camera:'48MP+12MP+12MP (Triple)', price:19990000, oldPrice:25990000, discount:23, rating:4.9, ratingCount:2104, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.7" Super Retina XDR OLED', os:'iOS 17', colors:['Đen Không Gian','Bạc','Vàng','Tím'], gaming:'Rất Cao', stockCount:16,
    img:'images/id9.png',
    imgs:['images/id9.png', 'images/id9-1.png', 'images/id9-2.png'] },

  { id:10, brand:'iphone', name:'iPhone 14 128GB', chip:'A15 Bionic', ram:'6GB', rom:'128GB', battery:'3279mAh', camera:'12MP+12MP (Dual)', price:11990000, oldPrice:15990000, discount:25, rating:4.6, ratingCount:1843, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.1" Super Retina XDR OLED', os:'iOS 17', colors:['Đen Khuya','Xanh','Tím','Đỏ','Vàng','Bạc'], gaming:'Cao', stockCount:30,
    img:'images/id10.png',
    imgs:['images/id10.png', 'images/id10-1.png', 'images/id10-2.png'] },

  { id:11, brand:'iphone', name:'iPhone 13 128GB', chip:'A15 Bionic', ram:'4GB', rom:'128GB', battery:'3227mAh', camera:'12MP+12MP (Dual)', price:9990000, oldPrice:14990000, discount:33, rating:4.5, ratingCount:3871, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.1" Super Retina XDR OLED', os:'iOS 17', colors:['Đen Khuya','Xanh','Hồng','Đỏ','Xanh Lá Trắng'], gaming:'Cao', stockCount:62,
    img:'images/id11.png',
    imgs:['images/id11.png', 'images/id11-1.png', 'images/id11-2.png'] },

  { id:12, brand:'iphone', name:'iPhone 13 Pro Max 256GB', chip:'A15 Bionic', ram:'6GB', rom:'256GB', battery:'4352mAh', camera:'12MP+12MP+12MP (Triple)', price:15490000, oldPrice:22990000, discount:33, rating:4.8, ratingCount:2310, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.7" Super Retina XDR OLED', os:'iOS 17', colors:['Đen Đồ Thị','Bạc','Vàng','Xanh Dương'], gaming:'Rất Cao', stockCount:14,
    img:'images/id12.png',
    imgs:['images/id12.png', 'images/id12-1.png', 'images/id12-2.png'] },

  { id:13, brand:'iphone', name:'iPhone SE 2022 64GB', chip:'A15 Bionic', ram:'4GB', rom:'64GB', battery:'2018mAh', camera:'12MP', price:7490000, oldPrice:9990000, discount:25, rating:4.3, ratingCount:987, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'4.7" Retina HD LCD', os:'iOS 17', colors:['Đen Khuya','Trắng Ngôi Sao','Đỏ'], gaming:'Thường', stockCount:20,
    img:'images/id13.png',
    imgs:['images/id13.png', 'images/id13-1.png', 'images/id13-2.png'] },

  { id:14, brand:'iphone', name:'iPhone 16 Pro Max 512GB', chip:'A18 Pro', ram:'8GB', rom:'512GB', battery:'4685mAh', camera:'48MP+12MP+12MP (Triple)', price:39990000, rating:5, ratingCount:420, stock:'Còn hàng', badge:['VN/A'], condition:'VN/A', screen:'6.9" Super Retina XDR OLED', os:'iOS 18', colors:['Titan Đen','Titan Trắng','Titan Sa Mạc','Titan Tự Nhiên'], gaming:'Xuất Sắc', stockCount:18,
    img:'images/id14.png',
    imgs:['images/id14.png', 'images/id14-1.png', 'images/id14-2.png'] },

  { id:15, brand:'iphone', name:'iPhone 15 Pro 512GB', chip:'A17 Pro', ram:'8GB', rom:'512GB', battery:'3274mAh', camera:'48MP+12MP+12MP (Triple)', price:28490000, oldPrice:31990000, discount:11, rating:4.9, ratingCount:638, stock:'Còn hàng', badge:['VN/A'], condition:'VN/A', screen:'6.1" Super Retina XDR OLED', os:'iOS 18', colors:['Titan Đen','Titan Trắng','Titan Xanh','Titan Tự Nhiên'], gaming:'Xuất Sắc', stockCount:10,
    img:'images/id15.png',
    imgs:['images/id15.png', 'images/id15-1.png', 'images/id15-2.png'] },

  /* ===== SAMSUNG ===== */
  { id:20, brand:'samsung', name:'Samsung Galaxy S24 Ultra 256GB', chip:'Snapdragon 8 Gen 3', ram:'12GB', rom:'256GB', battery:'5000mAh', camera:'200MP+12MP+50MP+10MP (Quad)', price:25990000, oldPrice:29990000, discount:13, rating:5, ratingCount:1842, stock:'Còn hàng', badge:['VN/A'], hot:true, condition:'VN/A', screen:'6.8" Dynamic AMOLED 2X 120Hz', os:'Android 14 / One UI 6.1', colors:['Titan Đen','Titan Xám','Titan Tím','Titan Vàng'], gaming:'Xuất Sắc', stockCount:35,
    img:'images/id20.png',
    imgs:['images/id20.png', 'images/id20-1.png', 'images/id20-2.png'] },

  { id:21, brand:'samsung', name:'Samsung Galaxy S24+ 256GB', chip:'Snapdragon 8 Gen 3', ram:'12GB', rom:'256GB', battery:'4900mAh', camera:'50MP+12MP+10MP (Triple)', price:19490000, oldPrice:22990000, discount:15, rating:4.9, ratingCount:921, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.7" Dynamic AMOLED 2X 120Hz', os:'Android 14 / One UI 6.1', colors:['Onyx Đen','Marble Xám','Cobalt Tím','Amber Vàng'], gaming:'Xuất Sắc', stockCount:22,
    img:'images/id21.png',
    imgs:['images/id21.png', 'images/id21-1.png', 'images/id21-2.png'] },

  { id:22, brand:'samsung', name:'Samsung Galaxy S24 256GB', chip:'Exynos 2400', ram:'8GB', rom:'256GB', battery:'4000mAh', camera:'50MP+12MP+10MP (Triple)', price:16490000, oldPrice:19990000, discount:17, rating:4.8, ratingCount:1105, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.2" Dynamic AMOLED 2X 120Hz', os:'Android 14 / One UI 6.1', colors:['Onyx Đen','Marble Xám','Cobalt Tím','Amber Vàng'], gaming:'Rất Cao', stockCount:41,
    img:'images/id22.png',
    imgs:['images/id22.png', 'images/id22-1.png', 'images/id22-2.png'] },

  { id:23, brand:'samsung', name:'Samsung Galaxy S23 Ultra 256GB', chip:'Snapdragon 8 Gen 2', ram:'12GB', rom:'256GB', battery:'5000mAh', camera:'200MP+12MP+10MP+10MP (Quad)', price:17990000, oldPrice:24990000, discount:28, rating:4.9, ratingCount:2340, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.8" Dynamic AMOLED 2X 120Hz', os:'Android 14 / One UI 6', colors:['Phantom Black','Cream','Lavender','Green'], gaming:'Xuất Sắc', stockCount:17,
    img:'images/id23.png',
    imgs:['images/id23.png', 'images/id23-1.png', 'images/id23-2.png'] },

  { id:24, brand:'samsung', name:'Samsung Galaxy Z Fold6 256GB', chip:'Snapdragon 8 Gen 3', ram:'12GB', rom:'256GB', battery:'4400mAh', camera:'50MP+12MP+10MP (Triple)', price:39990000, oldPrice:44990000, discount:11, rating:5, ratingCount:342, stock:'Còn hàng', badge:['VN/A'], condition:'VN/A', screen:'7.6" Foldable AMOLED (chính) + 6.3" (phụ)', os:'Android 14 / One UI 6.1', colors:['Navy Bạc','Hồng','Xám'], gaming:'Rất Cao', stockCount:9,
    img:'images/id24.png',
    imgs:['images/id24.png', 'images/id24-1.png', 'images/id24-2.png'] },

  { id:25, brand:'samsung', name:'Samsung Galaxy Z Flip6 256GB', chip:'Snapdragon 8 Gen 3', ram:'12GB', rom:'256GB', battery:'4000mAh', camera:'50MP+12MP (Dual)', price:22990000, oldPrice:25990000, discount:12, rating:4.8, ratingCount:618, stock:'Còn hàng', badge:['VN/A'], condition:'VN/A', screen:'6.7" Foldable AMOLED + 3.4" phụ', os:'Android 14 / One UI 6.1', colors:['Blue','Mint','Silver Shadow','Peach'], gaming:'Cao', stockCount:13,
    img:'images/id25.png',
    imgs:['images/id25.png', 'images/id25-1.png', 'images/id25-2.png'] },

  { id:26, brand:'samsung', name:'Samsung Galaxy Z Fold5 256GB', chip:'Snapdragon 8 Gen 2', ram:'12GB', rom:'256GB', battery:'4400mAh', camera:'50MP+12MP+10MP (Triple)', price:28490000, oldPrice:37990000, discount:25, rating:4.8, ratingCount:487, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'7.6" Foldable AMOLED + 6.2" phụ', os:'Android 14 / One UI 6', colors:['Icy Blue','Phantom Black','Cream'], gaming:'Rất Cao', stockCount:8,
    img:'images/id26.png',
    imgs:['images/id26.png', 'images/id26-1.png', 'images/id26-2.png'] },

  { id:27, brand:'samsung', name:'Samsung Galaxy A55 5G 256GB', chip:'Exynos 1480', ram:'8GB', rom:'256GB', battery:'5000mAh', camera:'50MP+12MP+5MP (Triple)', price:9490000, oldPrice:11490000, discount:17, rating:4.6, ratingCount:934, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.6" Super AMOLED 120Hz', os:'Android 14 / One UI 6', colors:['Awesome Iceblue','Awesome Lemon','Awesome Navy','Awesome Lilac'], gaming:'Cao', stockCount:51,
    img:'images/id27.png',
    imgs:['images/id27.png', 'images/id27-1.png', 'images/id27-2.png'] },

  { id:28, brand:'samsung', name:'Samsung Galaxy A35 5G 128GB', chip:'Exynos 1380', ram:'6GB', rom:'128GB', battery:'5000mAh', camera:'50MP+8MP+5MP (Triple)', price:7490000, oldPrice:8990000, discount:17, rating:4.5, ratingCount:762, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.6" Super AMOLED 120Hz', os:'Android 14 / One UI 6', colors:['Awesome Iceblue','Awesome Lemon','Awesome Navy','Awesome Lilac'], gaming:'Thường', stockCount:70,
    img:'images/id28.png',
    imgs:['images/id28.png', 'images/id28-1.png', 'images/id28-2.png'] },

  { id:29, brand:'samsung', name:'Samsung Galaxy S23 FE 256GB', chip:'Snapdragon 8 Gen 1', ram:'8GB', rom:'256GB', battery:'4500mAh', camera:'50MP+12MP+8MP (Triple)', price:10990000, oldPrice:14490000, discount:24, rating:4.6, ratingCount:1108, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.4" Dynamic AMOLED 120Hz', os:'Android 14 / One UI 6', colors:['Graphite','Mint','Cream','Purple','Indigo'], gaming:'Cao', stockCount:26,
    img:'images/id29.png',
    imgs:['images/id29.png', 'images/id29-1.png', 'images/id29-2.png'] },

  { id:30, brand:'samsung', name:'Samsung Galaxy M55 5G 256GB', chip:'Snapdragon 7 Gen 1', ram:'8GB', rom:'256GB', battery:'6000mAh', camera:'50MP+8MP+2MP (Triple)', price:8490000, oldPrice:9990000, discount:15, rating:4.4, ratingCount:445, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.7" Super AMOLED 120Hz', os:'Android 14 / One UI 6', colors:['Light Blue','Midnight Blue'], gaming:'Thường', stockCount:35,
    img:'images/id30.png',
    imgs:['images/id30.png', 'images/id30-1.png', 'images/id30-2.png'] },

  { id:31, brand:'samsung', name:'Samsung Galaxy Z Flip5 256GB', chip:'Snapdragon 8 Gen 2', ram:'8GB', rom:'256GB', battery:'3700mAh', camera:'12MP+12MP (Dual)', price:14990000, oldPrice:19990000, discount:25, rating:4.7, ratingCount:722, stock:'Còn hàng', badge:['VN/A','SALE'], condition:'VN/A', screen:'6.7" Foldable AMOLED + 3.4" phụ', os:'Android 14 / One UI 6', colors:['Mint','Lavender','Cream','Gray'], gaming:'Rất Cao', stockCount:12,
    img:'images/id31.png',
    imgs:['images/id31.png', 'images/id31-1.png', 'images/id31-2.png'] },

  { id:32, brand:'samsung', name:'Samsung Galaxy A25 5G 128GB', chip:'Exynos 1280', ram:'6GB', rom:'128GB', battery:'5000mAh', camera:'50MP+8MP+2MP (Triple)', price:5490000, oldPrice:6490000, discount:15, rating:4.3, ratingCount:598, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.5" Super AMOLED 90Hz', os:'Android 14 / One UI 6', colors:['Blue Black','Light Blue','Yellow'], gaming:'Thường', stockCount:80,
    img:'images/id32.png',
    imgs:['images/id32.png', 'images/id32-1.png', 'images/id32-2.png'] },

  { id:33, brand:'samsung', name:'Samsung Galaxy S24 FE 128GB', chip:'Exynos 2500', ram:'8GB', rom:'128GB', battery:'4700mAh', camera:'50MP+12MP+8MP (Triple)', price:13490000, oldPrice:15490000, discount:13, rating:4.7, ratingCount:334, stock:'Còn hàng', badge:['VN/A'], condition:'VN/A', screen:'6.7" Dynamic AMOLED 120Hz', os:'Android 14 / One UI 7', colors:['Blue','Graphite','Mint','Gray','White'], gaming:'Rất Cao', stockCount:29,
    img:'images/id33.png',
    imgs:['images/id33.png', 'images/id33-1.png', 'images/id33-2.png'] },

  { id:34, brand:'samsung', name:'Samsung Galaxy S25 Ultra 256GB', chip:'Snapdragon 8 Elite', ram:'12GB', rom:'256GB', battery:'5000mAh', camera:'200MP+50MP+10MP+50MP (Quad)', price:34990000, rating:5, ratingCount:218, stock:'Còn hàng', badge:['VN/A','MỚI'], hot:true, condition:'VN/A', screen:'6.9" Dynamic AMOLED 2X 120Hz', os:'Android 15 / One UI 7', colors:['Titanium Silver Blue','Titanium Black','Titanium White Silver','Titanium Grey'], gaming:'Xuất Sắc', stockCount:21,
    img:'images/id34.png',
    imgs:['images/id34.png', 'images/id34-1.png', 'images/id34-2.png'] },

  /* ===== REDMI ===== */
  { id:40, brand:'redmi', name:'Redmi K80 Pro 12GB+256GB', chip:'Snapdragon 8 Elite', ram:'12GB', rom:'256GB', battery:'6000mAh', camera:'50MP+50MP+12MP (Triple)', price:10990000, oldPrice:12990000, discount:15, rating:4.9, ratingCount:1234, stock:'Còn hàng', badge:['Nội Địa'], hot:true, condition:'Nội Địa', screen:'6.67" AMOLED 144Hz', os:'Android 14 / HyperOS', colors:['Black','White','Blue'], gaming:'Xuất Sắc', stockCount:34,
    img:'images/id40.png',
    imgs:['images/id40.png', 'images/id40-1.png', 'images/id40-2.png'] },

  { id:41, brand:'redmi', name:'Redmi K70 Ultra 12GB+256GB', chip:'Dimensity 9300+', ram:'12GB', rom:'256GB', battery:'5500mAh', camera:'50MP+8MP+2MP (Triple)', price:9490000, oldPrice:11490000, discount:17, rating:4.8, ratingCount:987, stock:'Còn hàng', badge:['Nội Địa','SALE'], condition:'Nội Địa', screen:'6.67" AMOLED 144Hz', os:'Android 14 / HyperOS', colors:['Shadow Black','Moonlight White','Violet'], gaming:'Xuất Sắc', stockCount:27,
    img:'images/id41.png',
    imgs:['images/id41.png', 'images/id41-1.png', 'images/id41-2.png'] },

  { id:42, brand:'redmi', name:'Redmi K70 Pro 12GB+256GB', chip:'Snapdragon 8 Gen 3', ram:'12GB', rom:'256GB', battery:'5000mAh', camera:'50MP+8MP+2MP (Triple)', price:8990000, oldPrice:10490000, discount:14, rating:4.8, ratingCount:756, stock:'Còn hàng', badge:['Nội Địa'], condition:'Nội Địa', screen:'6.67" AMOLED 144Hz', os:'Android 14 / HyperOS', colors:['Black','White','Blue'], gaming:'Xuất Sắc', stockCount:23,
    img:'images/id42.png',
    imgs:['images/id42.png', 'images/id42-1.png', 'images/id42-2.png'] },

  { id:43, brand:'redmi', name:'Redmi K80 16GB+512GB', chip:'Snapdragon 8s Gen 3', ram:'16GB', rom:'512GB', battery:'6000mAh', camera:'50MP+8MP+2MP (Triple)', price:8490000, oldPrice:9990000, discount:15, rating:4.8, ratingCount:542, stock:'Còn hàng', badge:['Nội Địa'], condition:'Nội Địa', screen:'6.67" AMOLED 120Hz', os:'Android 14 / HyperOS', colors:['Black','White'], gaming:'Rất Cao', stockCount:40,
    img:'images/id43.png',
    imgs:['images/id43.png', 'images/id43-1.png', 'images/id43-2.png'] },

  { id:44, brand:'redmi', name:'Redmi Note 14 Pro+ 5G 12GB+256GB', chip:'Snapdragon 7s Gen 3', ram:'12GB', rom:'256GB', battery:'6200mAh', camera:'200MP+8MP+2MP (Triple)', price:7490000, oldPrice:8990000, discount:17, rating:4.7, ratingCount:1892, stock:'Còn hàng', badge:['Chính Hãng VN','SALE'], condition:'Chính Hãng VN', screen:'6.67" AMOLED 120Hz', os:'Android 14 / HyperOS', colors:['Midnight Black','Moonlight White','Lavender Purple'], gaming:'Cao', stockCount:55,
    img:'images/id44.png',
    imgs:['images/id44.png', 'images/id44-1.png', 'images/id44-2.png'] },

  { id:45, brand:'redmi', name:'Redmi Note 14 Pro 5G 8GB+256GB', chip:'Dimensity 7300 Ultra', ram:'8GB', rom:'256GB', battery:'5500mAh', camera:'200MP+8MP+2MP (Triple)', price:6490000, oldPrice:7490000, discount:13, rating:4.6, ratingCount:1234, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.67" AMOLED 120Hz', os:'Android 14 / HyperOS', colors:['Midnight Black','Moonlight White'], gaming:'Cao', stockCount:68,
    img:'images/id45.png',
    imgs:['images/id45.png', 'images/id45-1.png', 'images/id45-2.png'] },

  { id:46, brand:'redmi', name:'Redmi Note 13 Pro+ 5G 12GB+256GB', chip:'Snapdragon 7s Gen 2', ram:'12GB', rom:'256GB', battery:'5000mAh', camera:'200MP+8MP+2MP (Triple)', price:5490000, oldPrice:7490000, discount:27, rating:4.7, ratingCount:2107, stock:'Còn hàng', badge:['Chính Hãng VN','SALE'], condition:'Chính Hãng VN', screen:'6.67" AMOLED 120Hz', os:'Android 14 / HyperOS', colors:['Fusion Black','Fusion White','Aurora Purple'], gaming:'Cao', stockCount:47,
    img:'images/id46.png',
    imgs:['images/id46.png', 'images/id46-1.png', 'images/id46-2.png'] },

  { id:47, brand:'redmi', name:'Redmi 13 4G 8GB+256GB', chip:'Helio G91 Ultra', ram:'8GB', rom:'256GB', battery:'5030mAh', camera:'108MP+8MP+2MP (Triple)', price:3490000, oldPrice:3990000, discount:13, rating:4.3, ratingCount:876, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.79" IPS LCD 90Hz', os:'Android 13 / HyperOS', colors:['Ocean Blue','Lavender Purple','Midnight Black'], gaming:'Thường', stockCount:90,
    img:'images/id47.png',
    imgs:['images/id47.png', 'images/id47-1.png', 'images/id47-2.png'] },

  { id:48, brand:'redmi', name:'Redmi Note 13 4G 8GB+256GB', chip:'Snapdragon 685', ram:'8GB', rom:'256GB', battery:'5000mAh', camera:'108MP+8MP+2MP (Triple)', price:4490000, oldPrice:5490000, discount:18, rating:4.4, ratingCount:1654, stock:'Còn hàng', badge:['Chính Hãng VN','SALE'], condition:'Chính Hãng VN', screen:'6.67" AMOLED 120Hz', os:'Android 13 / MIUI 14', colors:['Arctic White','Graphite Black','Mint Green'], gaming:'Thường', stockCount:75,
    img:'images/id48.png',
    imgs:['images/id48.png', 'images/id48-1.png', 'images/id48-2.png'] },

  { id:49, brand:'redmi', name:'Redmi K70E 12GB+256GB', chip:'Dimensity 9300', ram:'12GB', rom:'256GB', battery:'5500mAh', camera:'50MP+8MP+2MP (Triple)', price:7990000, oldPrice:9490000, discount:16, rating:4.7, ratingCount:432, stock:'Còn hàng', badge:['Nội Địa'], condition:'Nội Địa', screen:'6.67" AMOLED 144Hz', os:'Android 14 / HyperOS', colors:['Dark Night','White Mist','Blue Moon'], gaming:'Rất Cao', stockCount:30,
    img:'images/id49.png',
    imgs:['images/id49.png', 'images/id49-1.png', 'images/id49-2.png'] },

  { id:50, brand:'redmi', name:'Redmi Note 12 Pro+ 5G 12GB+256GB', chip:'Dimensity 1080', ram:'12GB', rom:'256GB', battery:'4980mAh', camera:'200MP+8MP+2MP (Triple)', price:4290000, oldPrice:6490000, discount:34, rating:4.6, ratingCount:2890, stock:'Còn hàng', badge:['Chính Hãng VN','SALE'], condition:'Chính Hãng VN', screen:'6.67" AMOLED 120Hz', os:'Android 13 / MIUI 13', colors:['Onyx Gray','Stardust White','Frosted Blue'], gaming:'Cao', stockCount:50,
    img:'images/id50.png',
    imgs:['images/id50.png', 'images/id50-1.png', 'images/id50-2.png'] },

  { id:51, brand:'redmi', name:'Redmi 14C 4G 8GB+256GB', chip:'Helio G85', ram:'8GB', rom:'256GB', battery:'5160mAh', camera:'50MP+AI (Dual)', price:2790000, oldPrice:3290000, discount:15, rating:4.2, ratingCount:1230, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.88" IPS LCD 90Hz', os:'Android 14 / HyperOS', colors:['Midnight Black','Dreamy Purple','Sage Green'], gaming:'Thường', stockCount:110,
    img:'images/id51.png',
    imgs:['images/id51.png', 'images/id51-1.png', 'images/id51-2.png'] },

  { id:52, brand:'redmi', name:'Redmi A3 Pro 4GB+128GB', chip:'Helio G36', ram:'4GB', rom:'128GB', battery:'5000mAh', camera:'50MP+AI', price:1990000, oldPrice:2490000, discount:20, rating:4.0, ratingCount:654, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.71" IPS LCD 90Hz', os:'Android 14 / HyperOS', colors:['Midnight Black','Forest Green','Ocean Blue'], gaming:'Thường', stockCount:120,
    img:'images/id52.png',
    imgs:['images/id52.png', 'images/id52-1.png', 'images/id52-2.png'] },

  { id:53, brand:'redmi', name:'Redmi K80 Ultra 16GB+512GB', chip:'Snapdragon 8 Elite', ram:'16GB', rom:'512GB', battery:'6000mAh', camera:'50MP+50MP+12MP (Triple)', price:13490000, rating:5, ratingCount:128, stock:'Còn hàng', badge:['Nội Địa','MỚI'], hot:true, condition:'Nội Địa', screen:'6.67" AMOLED 144Hz', os:'Android 15 / HyperOS 2', colors:['Black','White','Blue'], gaming:'Xuất Sắc', stockCount:15,
    img:'images/id53.png',
    imgs:['images/id53.png', 'images/id53-1.png', 'images/id53-2.png'] },

  /* ===== POCO ===== */
  { id:60, brand:'poco', name:'POCO F6 Pro 12GB+256GB', chip:'Snapdragon 8 Gen 2', ram:'12GB', rom:'256GB', battery:'5000mAh', camera:'50MP+8MP+2MP (Triple)', price:9990000, oldPrice:11990000, discount:17, rating:4.9, ratingCount:1567, stock:'Còn hàng', badge:['Chính Hãng VN'], hot:true, condition:'Chính Hãng VN', screen:'6.67" AMOLED 144Hz', os:'Android 14 / HyperOS', colors:['Black','White'], gaming:'Xuất Sắc', stockCount:38,
    img:'images/id60.png',
    imgs:['images/id60.png', 'images/id60-1.png', 'images/id60-2.png'] },

  { id:61, brand:'poco', name:'POCO F6 8GB+256GB', chip:'Snapdragon 8s Gen 3', ram:'8GB', rom:'256GB', battery:'5000mAh', camera:'50MP+8MP+2MP (Triple)', price:7490000, oldPrice:8990000, discount:17, rating:4.8, ratingCount:987, stock:'Còn hàng', badge:['Chính Hãng VN','SALE'], condition:'Chính Hãng VN', screen:'6.67" AMOLED 144Hz', os:'Android 14 / HyperOS', colors:['Titanium Black','Titanium White'], gaming:'Rất Cao', stockCount:45,
    img:'images/id61.png',
    imgs:['images/id61.png', 'images/id61-1.png', 'images/id61-2.png'] },

  { id:62, brand:'poco', name:'POCO X7 Pro 8GB+256GB', chip:'Dimensity 8400 Ultra', ram:'8GB', rom:'256GB', battery:'6550mAh', camera:'50MP+8MP+2MP (Triple)', price:7990000, oldPrice:9490000, discount:16, rating:4.8, ratingCount:834, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.67" AMOLED 120Hz', os:'Android 15 / HyperOS 2', colors:['Obsidian Black','Jade Green','Titanium Silver'], gaming:'Rất Cao', stockCount:42,
    img:'images/id62.png',
    imgs:['images/id62.png', 'images/id62-1.png', 'images/id62-2.png'] },

  { id:63, brand:'poco', name:'POCO X7 8GB+256GB', chip:'Dimensity 7300 Ultra', ram:'8GB', rom:'256GB', battery:'6000mAh', camera:'50MP+8MP+2MP (Triple)', price:5990000, oldPrice:6990000, discount:14, rating:4.7, ratingCount:654, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.67" AMOLED 120Hz', os:'Android 15 / HyperOS 2', colors:['Obsidian Black','Jade Green'], gaming:'Cao', stockCount:53,
    img:'images/id63.png',
    imgs:['images/id63.png', 'images/id63-1.png', 'images/id63-2.png'] },

  { id:64, brand:'poco', name:'POCO X6 Pro 12GB+512GB', chip:'Dimensity 8300 Ultra', ram:'12GB', rom:'512GB', battery:'5000mAh', camera:'64MP+8MP+2MP (Triple)', price:7490000, oldPrice:9490000, discount:21, rating:4.8, ratingCount:1123, stock:'Còn hàng', badge:['Chính Hãng VN','SALE'], condition:'Chính Hãng VN', screen:'6.67" Flow AMOLED 120Hz', os:'Android 14 / HyperOS', colors:['Grey','Black','Yellow'], gaming:'Rất Cao', stockCount:31,
    img:'images/id64.png',
    imgs:['images/id64.png', 'images/id64-1.png', 'images/id64-2.png'] },

  { id:65, brand:'poco', name:'POCO X6 Neo 8GB+256GB', chip:'Dimensity 6080', ram:'8GB', rom:'256GB', battery:'5100mAh', camera:'108MP+2MP (Dual)', price:4490000, oldPrice:5490000, discount:18, rating:4.5, ratingCount:765, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.67" AMOLED 120Hz', os:'Android 14 / HyperOS', colors:['Chromatic Blue','Chromatic Yellow','Interstellar Blue'], gaming:'Thường', stockCount:66,
    img:'images/id65.png',
    imgs:['images/id65.png', 'images/id65-1.png', 'images/id65-2.png'] },

  { id:66, brand:'poco', name:'POCO M6 Pro 5G 8GB+256GB', chip:'Snapdragon 4 Gen 2', ram:'8GB', rom:'256GB', battery:'5000mAh', camera:'64MP+8MP+2MP (Triple)', price:4990000, oldPrice:5990000, discount:17, rating:4.5, ratingCount:543, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.67" Flow AMOLED 120Hz', os:'Android 14 / HyperOS', colors:['Midnight Grey','Power Black','Celestial Blue'], gaming:'Thường', stockCount:58,
    img:'images/id66.png',
    imgs:['images/id66.png', 'images/id66-1.png', 'images/id66-2.png'] },

  { id:67, brand:'poco', name:'POCO F5 Pro 12GB+256GB', chip:'Snapdragon 8 Gen 2', ram:'12GB', rom:'256GB', battery:'5160mAh', camera:'64MP+8MP+2MP (Triple)', price:8490000, oldPrice:12490000, discount:32, rating:4.8, ratingCount:2134, stock:'Còn hàng', badge:['Chính Hãng VN','SALE'], condition:'Chính Hãng VN', screen:'6.67" Flow AMOLED 120Hz', os:'Android 13 / MIUI 14', colors:['Black','White'], gaming:'Xuất Sắc', stockCount:21,
    img:'images/id67.png',
    imgs:['images/id67.png', 'images/id67-1.png', 'images/id67-2.png'] },

  { id:68, brand:'poco', name:'POCO M6 4G 8GB+256GB', chip:'Helio G91 Ultra', ram:'8GB', rom:'256GB', battery:'5000mAh', camera:'64MP+8MP+2MP (Triple)', price:3490000, oldPrice:3990000, discount:13, rating:4.3, ratingCount:432, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.79" IPS LCD 90Hz', os:'Android 13 / HyperOS', colors:['Orion Blue','Galactic Black'], gaming:'Thường', stockCount:82,
    img:'images/id68.png',
    imgs:['images/id68.png', 'images/id68-1.png', 'images/id68-2.png'] },

  { id:69, brand:'poco', name:'POCO C75 4GB+128GB', chip:'Helio G85', ram:'4GB', rom:'128GB', battery:'5160mAh', camera:'50MP+AI', price:2290000, oldPrice:2790000, discount:18, rating:4.1, ratingCount:287, stock:'Còn hàng', badge:['Chính Hãng VN'], condition:'Chính Hãng VN', screen:'6.88" IPS LCD 90Hz', os:'Android 14 / HyperOS', colors:['Black','Gold'], gaming:'Thường', stockCount:95,
    img:'images/id69.png',
    imgs:['images/id69.png', 'images/id69-1.png', 'images/id69-2.png'] },

  { id:70, brand:'poco', name:'POCO F7 Ultra 16GB+512GB', chip:'Snapdragon 8 Elite', ram:'16GB', rom:'512GB', battery:'6000mAh', camera:'50MP+50MP+12MP (Triple)', price:14990000, rating:5, ratingCount:89, stock:'Còn hàng', badge:['Nội Địa','MỚI'], hot:true, condition:'Nội Địa', screen:'6.67" AMOLED 144Hz', os:'Android 15 / HyperOS 2', colors:['Black','White'], gaming:'Xuất Sắc', stockCount:12,
    img:'images/id70.png',
    imgs:['images/id70.png', 'images/id70-1.png', 'images/id70-2.png'] },

  { id:71, brand:'poco', name:'POCO X6 5G 12GB+256GB', chip:'Snapdragon 7s Gen 2', ram:'12GB', rom:'256GB', battery:'5100mAh', camera:'64MP+8MP+2MP (Triple)', price:5490000, oldPrice:6990000, discount:21, rating:4.6, ratingCount:878, stock:'Còn hàng', badge:['Chính Hãng VN','SALE'], condition:'Chính Hãng VN', screen:'6.67" Flow AMOLED 120Hz', os:'Android 14 / MIUI 14', colors:['Black','White'], gaming:'Cao', stockCount:47,
    img:'images/id71.png',
    imgs:['images/id71.png', 'images/id71-1.png', 'images/id71-2.png'] },

  { id:72, brand:'poco', name:'POCO F5 8GB+256GB', chip:'Snapdragon 7+ Gen 2', ram:'8GB', rom:'256GB', battery:'5000mAh', camera:'64MP+8MP+2MP (Triple)', price:6490000, oldPrice:8990000, discount:28, rating:4.7, ratingCount:1567, stock:'Còn hàng', badge:['Chính Hãng VN','SALE'], condition:'Chính Hãng VN', screen:'6.67" Flow AMOLED 120Hz', os:'Android 13 / MIUI 14', colors:['Black','White','Blue'], gaming:'Rất Cao', stockCount:36,
    img:'images/id72.png',
    imgs:['images/id72.png', 'images/id72-1.png', 'images/id72-2.png'] }
];
const defaultProducts = products.map(product => ({ ...product }));
products = window.TechNova ? window.TechNova.data.loadProducts(defaultProducts) : products;
const defaultBrands = ['iphone', 'samsung', 'redmi', 'poco'];
let brands = window.TechNova ? window.TechNova.data.loadBrands(defaultBrands) : defaultBrands.map(id => ({ id, name: id, active: true }));
let orders = window.TechNova ? window.TechNova.data.loadOrders() : [];
  
/* ==================== FLASH SALE PRODUCTS ==================== */
const flashSaleIds = [5,6,7,23,46,50,67,72,10,11];

/* ==================== BESTSELLER PRODUCTS ==================== */
const bestsellerIds = [1,20,40,60,5,22,44,61,13,29];

/* ==================== STATE ==================== */
let cart = JSON.parse(localStorage.getItem('technova_cart') || '[]');
let currentFilter = 'all';
let searchQuery = '';
let displayedCount = 12;
const PAGE_SIZE = 12;

/* ==================== LOADING SCREEN ==================== */
function initLoader() {
  const screen = document.getElementById('loading-screen');
  const container = document.getElementById('loaderParticles');

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (3 + Math.random() * 5) + 's';
    p.style.animationDelay = (Math.random() * 4) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 3) + 'px';
    p.style.background = Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6';
    container.appendChild(p);
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      screen.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2800);
  });

  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 4000);
}

/* ==================== HERO CANVAS ==================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? '59,130,246' : '139,92,246';
    }
    update() {
      this.x += this.speedX; this.y += this.speedY;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==================== COUNTDOWN ==================== */
function initCountdown() {
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');
  if (!hoursEl) return;

  const end = new Date();
  end.setHours(23, 59, 59, 0);

  function update() {
    const diff = end - new Date();
    if (diff <= 0) { hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00'; return; }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
    if (diff <= 0) clearInterval(timer);
  }
  update();
  const timer = setInterval(update, 1000);
}

/* ==================== FORMAT PRICE ==================== */
function formatPrice(n) {
  return n.toLocaleString('vi-VN') + 'đ';
}

/* ==================== RENDER STARS ==================== */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/* ==================== BADGE HTML ==================== */
function renderBadges(badges) {
  if (!badges || !badges.length) return '';
  return badges.map(b => {
    if (b === 'SALE') return `<span class="badge badge-sale">-SALE</span>`;
    if (b === 'MỚI') return `<span class="badge badge-new">MỚI</span>`;
    if (b === 'HOT') return `<span class="badge badge-hot">🔥 HOT</span>`;
    if (b === 'VN/A' || b === 'Chính Hãng' || b === 'Chính Hãng VN') return `<span class="badge badge-official">${b}</span>`;
    if (b === 'Nội Địa' || b === 'China Version') return `<span class="badge badge-china">${b}</span>`;
    return `<span class="badge badge-official">${b}</span>`;
  }).join('');
}

/* ==================== LOAD IMAGE WITH SKELETON ==================== */
function loadImageWithSkeleton(imgEl, src, skeletonEl) {
  if (!imgEl) return;
  // Show skeleton
  if (skeletonEl) skeletonEl.classList.remove('hidden');
  imgEl.classList.remove('loaded');

  const tempImg = new Image();
  tempImg.onload = () => {
    imgEl.src = src;
    imgEl.classList.add('loaded');
    if (skeletonEl) skeletonEl.classList.add('hidden');
  };
  tempImg.onerror = () => {
    imgEl.src = FALLBACK_IMG;
    imgEl.classList.add('loaded');
    if (skeletonEl) skeletonEl.classList.add('hidden');
  };
  tempImg.src = src;
}

/* ==================== PRODUCT CARD ==================== */
function createProductCard(product) {
  const stockClass = product.stock === 'Hết hàng' ? 'stock-out' : product.stock === 'Sắp hết' ? 'stock-low' : 'stock-ok';
  const discountBadge = product.discount ? `<span class="badge badge-sale">-${product.discount}%</span>` : '';
  const hotBadge = product.hot ? `<span class="badge badge-hot">🔥 HOT</span>` : '';

  let badgeHtml = discountBadge + hotBadge;
  if (product.badge) {
    product.badge.filter(b => b !== 'SALE' && b !== 'MỚI').forEach(b => {
      if (b === 'VN/A' || b === 'Chính Hãng' || b === 'Chính Hãng VN') badgeHtml += `<span class="badge badge-official">${b}</span>`;
      else if (b === 'Nội Địa' || b === 'China Version') badgeHtml += `<span class="badge badge-china">${b}</span>`;
      else if (b === 'MỚI') badgeHtml += `<span class="badge badge-new">MỚI</span>`;
    });
  }

  const card = document.createElement('div');
  card.className = 'product-card reveal';
  card.setAttribute('data-id', product.id);
  card.innerHTML = `
    <div class="product-img-wrap">
      <div class="product-badges">${badgeHtml}</div>
      <div class="img-skeleton" id="skel-card-${product.id}"></div>
      <img class="product-img" src="${FALLBACK_IMG}" alt="${product.name}" data-src="${product.img}" loading="lazy"
        onerror="this.src='${FALLBACK_IMG}'" />
    </div>
    <div class="product-info">
      <div class="product-brand">${product.brand.toUpperCase()}</div>
      <div class="product-name">${product.name}</div>
      <div class="product-specs">
        <span class="spec-tag">${product.ram}/${product.rom}</span>
        <span class="spec-tag">${product.battery}</span>
        <span class="spec-tag">${product.chip.split(' ').slice(0,3).join(' ')}</span>
      </div>
      <div class="product-rating">
        <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
        <span class="rating-count">(${product.ratingCount.toLocaleString()})</span>
      </div>
      <div class="product-price-row">
        <div>
          ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>
        <span class="product-stock ${stockClass}">${product.stock}</span>
      </div>
      <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})" ${product.stock === 'Hết hàng' ? 'disabled' : ''}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        Thêm Vào Giỏ
      </button>
    </div>
  `;

  // Click card to open modal
  card.addEventListener('click', () => openProductModal(product.id));

  // Lazy load image with skeleton
  const imgEl = card.querySelector('.product-img');
  const skelEl = card.querySelector(`#skel-card-${product.id}`);
  setTimeout(() => loadImageWithSkeleton(imgEl, product.img, skelEl), 50);

  return card;
}

/* ==================== RENDER PRODUCTS ==================== */
function getFilteredProducts() {
  return products.filter(p => {
    const matchBrand = currentFilter === 'all' || p.brand === currentFilter;
    const matchSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.chip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBrand && matchSearch;
  });
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!grid) return;

  const filtered = getFilteredProducts();
  const toShow = filtered.slice(0, displayedCount);

  grid.innerHTML = '';
  if (filtered.length === 0) {
    noResults.style.display = 'block';
    loadMoreBtn.style.display = 'none';
  } else {
    noResults.style.display = 'none';
    toShow.forEach(p => grid.appendChild(createProductCard(p)));
    loadMoreBtn.style.display = displayedCount >= filtered.length ? 'none' : 'block';
    setTimeout(triggerReveal, 50);
  }
}

/* ==================== RENDER FLASH SALE ==================== */
function renderFlashSale() {
  const grid = document.getElementById('flashGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const flashProducts = products.filter(p => flashSaleIds.includes(p.id));
  flashProducts.forEach(p => grid.appendChild(createProductCard(p)));
  setTimeout(triggerReveal, 50);
}

/* ==================== RENDER BESTSELLER ==================== */
function renderBestseller() {
  const grid = document.getElementById('bestsellerGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const bsProducts = products.filter(p => bestsellerIds.includes(p.id));
  bsProducts.forEach((p, i) => {
    const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other';
    const sold = [4892, 3201, 2876, 2431, 1987, 1654, 1432, 1298, 1187, 1043][i] || 900;
    const card = document.createElement('div');
    card.className = 'bestseller-card reveal';
    card.setAttribute('data-id', p.id);
    card.innerHTML = `
      <div class="bestseller-rank ${rankClass}">${i + 1}</div>
      <img class="bestseller-img" src="${FALLBACK_IMG}" alt="${p.name}" loading="lazy"
        onerror="this.src='${FALLBACK_IMG}'" data-src="${p.img}" />
      <div class="bestseller-info">
        <div class="bestseller-name">${p.name}</div>
        <div class="bestseller-price">${formatPrice(p.price)}</div>
        <div class="bestseller-sold">🛒 Đã bán ${sold.toLocaleString()} chiếc</div>
      </div>
    `;
    // Click bestseller to open modal
    card.addEventListener('click', () => openProductModal(p.id));
    // Load image
    const imgEl = card.querySelector('.bestseller-img');
    setTimeout(() => { imgEl.src = p.img; }, 80);
    grid.appendChild(card);
  });
  setTimeout(triggerReveal, 50);
}

/* ==================== PRODUCT DETAIL MODAL ==================== */
let currentModalProductId = null;

function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  currentModalProductId = productId;

  // Populate modal
  const modal = document.getElementById('productModal');
  const overlay = document.getElementById('productModalOverlay');

  // Badges
  document.getElementById('modalBadges').innerHTML = renderBadges(product.badge);
  // Brand
  document.getElementById('modalBrand').textContent = product.brand.toUpperCase();
  // Title
  document.getElementById('modalTitle').textContent = product.name;
  // Stars & Rating
  document.getElementById('modalStars').textContent = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  document.getElementById('modalRatingCount').textContent = `(${product.ratingCount.toLocaleString()} đánh giá)`;
  // Stock
  const stockEl = document.getElementById('modalStock');
  stockEl.textContent = product.stock;
  stockEl.className = 'modal-stock' + (product.stock === 'Hết hàng' ? ' out' : '');

  // Price
  document.getElementById('modalPrice').textContent = formatPrice(product.price);
  const oldPriceEl = document.getElementById('modalOldPrice');
  const discountEl = document.getElementById('modalDiscount');
  if (product.oldPrice) {
    oldPriceEl.textContent = formatPrice(product.oldPrice);
    oldPriceEl.style.display = '';
  } else {
    oldPriceEl.style.display = 'none';
  }
  if (product.discount) {
    discountEl.textContent = `-${product.discount}%`;
    discountEl.style.display = '';
  } else {
    discountEl.style.display = 'none';
  }

  // Specs grid
  const specs = [
    { label: '📱 Chip', value: product.chip },
    { label: '💾 RAM / ROM', value: `${product.ram} / ${product.rom}` },
    { label: '🔋 Pin', value: product.battery },
    { label: '📷 Camera', value: product.camera },
    { label: '🖥️ Màn hình', value: product.screen || 'N/A' },
    { label: '⚙️ Hệ điều hành', value: product.os || 'N/A' },
    { label: '🎮 Gaming', value: product.gaming || 'N/A' },
    { label: '📦 Tồn kho', value: product.stockCount ? `${product.stockCount} máy` : 'Liên hệ' },
  ];
  document.getElementById('modalSpecsGrid').innerHTML = specs.map(s => `
    <div class="spec-item">
      <div class="spec-item-label">${s.label}</div>
      <div class="spec-item-value">${s.value}</div>
    </div>
  `).join('');

  // Condition + Colors
  const conditionHtml = product.condition ?
    `<div class="condition-tag active">${product.condition}</div>` : '';
  const colorsHtml = (product.colors || []).slice(0, 4).map((c, i) =>
    `<span class="condition-tag${i === 0 ? ' active' : ''}" onclick="setActiveColor(this)">${c}</span>`
  ).join('');
  document.getElementById('modalConditionRow').innerHTML = conditionHtml + colorsHtml;

  // Main image
  const mainImg = document.getElementById('modalMainImg');
  const skelEl = document.getElementById('modalImgSkeleton');
  loadImageWithSkeleton(mainImg, product.imgs ? product.imgs[0] : product.img, skelEl);

  // Thumbnails
  const thumbRow = document.getElementById('modalThumbRow');
const imgs = product.imgs || [product.img];

thumbRow.innerHTML = '';

const thumbImgs = imgs;

thumbImgs.forEach((src, idx) => {
  const thumb = document.createElement('div');
  thumb.className = 'modal-thumb' + (idx === 0 ? ' active' : '');

  thumb.innerHTML = `<img src="${src}" alt="ảnh ${idx + 1}" />`;

  thumb.addEventListener('click', () => {
    document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    loadImageWithSkeleton(mainImg, src, skelEl);
  });

  thumbRow.appendChild(thumb);
});

  // Button actions
  const addCartBtn = document.getElementById('modalAddCart');
  const buyNowBtn = document.getElementById('modalBuyNow');

  addCartBtn.onclick = () => {
    addToCart(productId);
    // Flash effect
    addCartBtn.style.transform = 'scale(0.95)';
    setTimeout(() => addCartBtn.style.transform = '', 200);
  };
  buyNowBtn.onclick = () => {
    addToCart(productId);
    closeProductModal();
    setTimeout(() => {
      document.getElementById('cartSidebar').classList.add('open');
      document.getElementById('cartOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    }, 200);
  };

  // Open
  modal.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
  document.getElementById('productModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  currentModalProductId = null;
}

function setActiveColor(el) {
  el.closest('.modal-condition-row').querySelectorAll('.condition-tag').forEach(t => {
    if (t.textContent !== (document.getElementById('modalConditionRow').querySelector('.active') || {}).textContent) {
      // only target color tags not the condition tag (first one)
    }
  });
  // Find all color tags (skip first condition tag)
  const allTags = el.parentElement.querySelectorAll('.condition-tag');
  allTags.forEach((t, i) => { if (i > 0) t.classList.remove('active'); });
  el.classList.add('active');
}

function initProductModal() {
  document.getElementById('modalClose').addEventListener('click', closeProductModal);
  document.getElementById('productModalOverlay').addEventListener('click', closeProductModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentModalProductId !== null) closeProductModal();
  });
}

/* ==================== AUTH & ADMIN ==================== */
function getAuthApi() {
  return window.TechNova && window.TechNova.auth ? window.TechNova.auth : null;
}

function getDataApi() {
  return window.TechNova && window.TechNova.data ? window.TechNova.data : null;
}

function openAuthModal(tab = 'login') {
  const modal = document.getElementById('authModal');
  const overlay = document.getElementById('authOverlay');
  if (!modal || !overlay) return;
  setAuthTab(tab);
  refreshAuthUI();
  modal.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  const overlay = document.getElementById('authOverlay');
  if (!modal || !overlay) return;
  modal.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function setAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.authTab === tab);
  });
  document.querySelectorAll('.auth-form').forEach(form => {
    form.classList.toggle('active', form.id === `${tab}Form`);
  });
}

function refreshAuthUI() {
  const auth = getAuthApi();
  if (!auth) return;
  const user = auth.getCurrentUser();
  const accountLabel = document.getElementById('accountLabel');
  const adminSection = document.getElementById('admin');
  const adminNavLink = document.getElementById('adminNavLink');
  const userCard = document.getElementById('authUserCard');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabs = document.querySelector('.auth-tabs');

  if (accountLabel) accountLabel.textContent = user ? user.name : 'Đăng nhập';
  const isAdmin = auth.isAdmin();
  if (adminSection) adminSection.hidden = !isAdmin;
  if (adminNavLink) adminNavLink.hidden = !isAdmin;

  if (userCard) {
    userCard.hidden = !user;
    document.getElementById('authUserName').textContent = user ? user.name : '';
    document.getElementById('authUserRole').textContent = user ? (user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng') : '';
  }
  if (loginForm) loginForm.hidden = Boolean(user);
  if (registerForm) registerForm.hidden = Boolean(user);
  if (tabs) tabs.hidden = Boolean(user);
  if (isAdmin) renderAdminDashboard();
}

function initAuth() {
  const auth = getAuthApi();
  if (!auth) return;

  document.getElementById('accountToggle')?.addEventListener('click', () => openAuthModal('login'));
  document.getElementById('authClose')?.addEventListener('click', closeAuthModal);
  document.getElementById('authOverlay')?.addEventListener('click', closeAuthModal);
  document.querySelectorAll('.auth-tab').forEach(btn => {
    btn.addEventListener('click', () => setAuthTab(btn.dataset.authTab));
  });

  document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = auth.login(
      document.getElementById('loginEmail').value,
      document.getElementById('loginPassword').value
    );
    if (!result.ok) {
      showToast(result.message);
      return;
    }
    showToast(`Xin chào ${result.user.name}!`);
    closeAuthModal();
    refreshAuthUI();
  });

  document.getElementById('registerForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = auth.register({
      name: document.getElementById('registerName').value,
      email: document.getElementById('registerEmail').value,
      phone: document.getElementById('registerPhone').value,
      password: document.getElementById('registerPassword').value,
    });
    if (!result.ok) {
      showToast(result.message);
      return;
    }
    showToast(`Tạo tài khoản thành công, ${result.user.name}!`);
    closeAuthModal();
    refreshAuthUI();
  });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    auth.logout();
    closeAuthModal();
    refreshAuthUI();
    showToast('Đã đăng xuất.');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAuthModal();
  });

  refreshAuthUI();
}

function renderAllProductViews() {
  displayedCount = PAGE_SIZE;
  renderBrandFilters();
  renderFlashSale();
  renderProducts();
  renderBestseller();
  renderAdminDashboard();
}

function renderBrandFilters() {
  const bar = document.getElementById('brandFilterBar');
  if (!bar) return;
  const allActive = currentFilter === 'all' ? ' active' : '';
  const brandButtons = brands.map(brand => {
    const active = currentFilter === brand.id ? ' active' : '';
    const logo = brand.logo ? `<img src="${brand.logo}" alt="${brand.name}" class="brand-icon" onerror="this.style.display='none'" />` : '';
    return `<button class="filter-btn${active}" data-brand="${brand.id}">${logo}${brand.name}</button>`;
  }).join('');
  bar.innerHTML = `<button class="filter-btn${allActive}" data-brand="all">Tất Cả</button>${brandButtons}`;
}

function productFromAdminForm() {
  const oldPrice = Number(document.getElementById('adminProductOldPrice').value || 0);
  const price = Number(document.getElementById('adminProductPrice').value || 0);
  const discount = oldPrice > price && oldPrice > 0 ? Math.round((1 - price / oldPrice) * 100) : undefined;
  const img = document.getElementById('adminProductImage').value.trim() || 'images/id1.png';
  const brand = document.getElementById('adminProductBrand').value;
  const condition = brand === 'redmi' || brand === 'poco' ? 'Chính Hãng VN' : 'VN/A';

  return {
    id: Number(document.getElementById('adminProductId').value || 0) || undefined,
    name: document.getElementById('adminProductName').value,
    brand,
    price,
    oldPrice: oldPrice || undefined,
    discount,
    ram: document.getElementById('adminProductRam').value || '8GB',
    rom: document.getElementById('adminProductRom').value || '128GB',
    chip: document.getElementById('adminProductChip').value || 'Đang cập nhật',
    stock: document.getElementById('adminProductStock').value,
    stockCount: Number(document.getElementById('adminProductStockCount').value || 10),
    img,
    imgs: [img],
    camera: document.getElementById('adminProductCamera').value || 'Đang cập nhật',
    screen: document.getElementById('adminProductScreen').value || 'Đang cập nhật',
    battery: '5000mAh',
    os: brand === 'iphone' ? 'iOS 18' : 'Android / HyperOS',
    badge: [condition],
    condition,
    colors: ['Đen', 'Trắng'],
    gaming: 'Cao',
    rating: 4.8,
    ratingCount: 0,
  };
}

function resetAdminForm() {
  const form = document.getElementById('adminProductForm');
  if (!form) return;
  form.reset();
  document.getElementById('adminProductId').value = '';
  document.getElementById('adminFormTitle').textContent = 'Thêm sản phẩm';
  document.getElementById('adminProductBrand').value = 'iphone';
  document.getElementById('adminProductStock').value = 'Còn hàng';
}

function fillAdminForm(product) {
  document.getElementById('adminProductId').value = product.id;
  document.getElementById('adminFormTitle').textContent = 'Sửa sản phẩm';
  document.getElementById('adminProductName').value = product.name || '';
  document.getElementById('adminProductBrand').value = product.brand || 'iphone';
  document.getElementById('adminProductPrice').value = product.price || '';
  document.getElementById('adminProductOldPrice').value = product.oldPrice || '';
  document.getElementById('adminProductRam').value = product.ram || '';
  document.getElementById('adminProductRom').value = product.rom || '';
  document.getElementById('adminProductChip').value = product.chip || '';
  document.getElementById('adminProductStock').value = product.stock || 'Còn hàng';
  document.getElementById('adminProductStockCount').value = product.stockCount || '';
  document.getElementById('adminProductImage').value = product.img || '';
  document.getElementById('adminProductCamera').value = product.camera || '';
  document.getElementById('adminProductScreen').value = product.screen || '';
  document.getElementById('adminProductName').focus();
}

function renderAdminDashboard() {
  const auth = getAuthApi();
  if (!auth || !auth.isAdmin()) return;

  const rows = document.getElementById('adminProductRows');
  if (!rows) return;
  renderAdminBrandOptions();
  const query = (document.getElementById('adminSearch')?.value || '').trim().toLowerCase();
  const filteredProducts = products.filter(product =>
    !query ||
    product.name.toLowerCase().includes(query) ||
    product.brand.toLowerCase().includes(query)
  );

  document.getElementById('adminTotalProducts').textContent = products.length.toLocaleString('vi-VN');
  document.getElementById('adminTotalBrands').textContent = new Set(products.map(product => product.brand)).size;
  document.getElementById('adminTotalStock').textContent = products.reduce((sum, product) => sum + (Number(product.stockCount) || 0), 0).toLocaleString('vi-VN');
  document.getElementById('adminTotalValue').textContent = formatPrice(products.reduce((sum, product) => sum + ((Number(product.price) || 0) * (Number(product.stockCount) || 0)), 0));

  rows.innerHTML = filteredProducts.map(product => `
    <tr>
      <td>
        <div class="admin-product-cell">
          <img src="${product.img || FALLBACK_IMG}" alt="${product.name}" onerror="this.src='${FALLBACK_IMG}'" />
          <div>
            <strong>${product.name}</strong>
            <small>ID ${product.id} · ${product.ram || ''}/${product.rom || ''}</small>
          </div>
        </div>
      </td>
      <td>${product.brand.toUpperCase()}</td>
      <td>${formatPrice(product.price || 0)}</td>
      <td>${product.stockCount || 0} · ${product.stock}</td>
      <td>
        <div class="admin-row-actions">
          <button class="admin-icon-btn" data-admin-edit="${product.id}" title="Sửa">✎</button>
          <button class="admin-icon-btn danger" data-admin-delete="${product.id}" title="Xóa">✕</button>
        </div>
      </td>
    </tr>
  `).join('');
  renderAdminBrands();
  renderAdminUsers();
  renderAdminRevenue();
}

function renderAdminBrandOptions() {
  const select = document.getElementById('adminProductBrand');
  if (!select) return;
  const currentValue = select.value;
  select.innerHTML = brands.map(brand => `<option value="${brand.id}">${brand.name}</option>`).join('');
  if (brands.some(brand => brand.id === currentValue)) select.value = currentValue;
}

function renderAdminBrands() {
  const rows = document.getElementById('adminBrandRows');
  if (!rows) return;
  rows.innerHTML = brands.map(brand => {
    const count = products.filter(product => product.brand === brand.id).length;
    return `
      <tr>
        <td>
          <div class="admin-product-cell">
            ${brand.logo ? `<img src="${brand.logo}" alt="${brand.name}" onerror="this.style.display='none'" />` : ''}
            <strong>${brand.name}</strong>
          </div>
        </td>
        <td>${brand.id}</td>
        <td>${count}</td>
        <td><div class="admin-row-actions">
          <button class="admin-icon-btn" data-brand-edit="${brand.id}" title="Sửa">✎</button>
          <button class="admin-icon-btn danger" data-brand-delete="${brand.id}" title="Xóa">✕</button>
        </div></td>
      </tr>
    `;
  }).join('');
}

function resetUserForm() {
  document.getElementById('adminUserForm')?.reset();
  document.getElementById('adminUserId').value = '';
  document.getElementById('adminUserFormTitle').textContent = 'Thêm user';
  document.getElementById('adminUserRole').value = 'customer';
}

function fillUserForm(user) {
  document.getElementById('adminUserId').value = user.id;
  document.getElementById('adminUserFormTitle').textContent = 'Sửa user';
  document.getElementById('adminUserName').value = user.name || '';
  document.getElementById('adminUserEmail').value = user.email || '';
  document.getElementById('adminUserPhone').value = user.phone || '';
  document.getElementById('adminUserPassword').value = '';
  document.getElementById('adminUserRole').value = user.role || 'customer';
}

function renderAdminUsers() {
  const auth = getAuthApi();
  const rows = document.getElementById('adminUserRows');
  if (!auth || !rows) return;
  const users = auth.getUsers();
  rows.innerHTML = users.map(user => `
    <tr>
      <td><strong>${user.name}</strong><br/><small>${user.email}</small></td>
      <td>${user.role === 'admin' ? 'Admin' : 'Khách hàng'}</td>
      <td>${new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
      <td><div class="admin-row-actions">
        <button class="admin-icon-btn" data-user-edit="${user.id}" title="Sửa">✎</button>
        <button class="admin-icon-btn danger" data-user-delete="${user.id}" title="Xóa">✕</button>
      </div></td>
    </tr>
  `).join('');
}

function inSelectedRange(date, range) {
  const now = new Date();
  const target = new Date(date);
  if (range === 'year') return target.getFullYear() === now.getFullYear();
  if (range === 'month') return target.getFullYear() === now.getFullYear() && target.getMonth() === now.getMonth();
  return target.toDateString() === now.toDateString();
}

function renderAdminRevenue() {
  const rows = document.getElementById('adminOrderRows');
  if (!rows) return;
  const range = document.getElementById('adminRevenueRange')?.value || 'day';
  const scopedOrders = orders.filter(order => inSelectedRange(order.createdAt, range));
  const subtotal = scopedOrders.reduce((sum, order) => sum + Number(order.subtotal || 0), 0);
  const vat = scopedOrders.reduce((sum, order) => sum + Number(order.vat || 0), 0);
  const total = scopedOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  document.getElementById('adminRevenueSubtotal').textContent = formatPrice(subtotal);
  document.getElementById('adminRevenueVat').textContent = formatPrice(vat);
  document.getElementById('adminRevenueTotal').textContent = formatPrice(total);
  rows.innerHTML = orders.slice().reverse().map(order => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>${order.customerName || 'Khách lẻ'}</td>
      <td>${new Date(order.createdAt).toLocaleString('vi-VN')}</td>
      <td>${formatPrice(order.total || 0)}</td>
      <td><div class="admin-row-actions">
        <button class="admin-icon-btn" data-print-order="${order.id}" title="In hóa đơn">⎙</button>
      </div></td>
    </tr>
  `).join('');
}

function printInvoice(orderId) {
  const order = orders.find(item => item.id === orderId);
  if (!order) return;
  const itemRows = order.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${formatPrice(item.price)}</td>
      <td>${formatPrice(item.price * item.qty)}</td>
    </tr>
  `).join('');
  const html = `
    <!doctype html><html lang="vi"><head><meta charset="utf-8" />
    <title>Hóa đơn ${order.id}</title>
    <style>
      body{font-family:Arial,sans-serif;color:#111827;padding:32px}
      h1{margin:0 0 4px} table{width:100%;border-collapse:collapse;margin-top:20px}
      th,td{border-bottom:1px solid #e5e7eb;text-align:left;padding:10px}
      .totals{margin-top:20px;margin-left:auto;width:320px}.row{display:flex;justify-content:space-between;padding:6px 0}
      .total{font-size:20px;font-weight:700}.meta{color:#6b7280}
    </style></head><body>
      <h1>TECHNOVA</h1>
      <div class="meta">Hóa đơn: ${order.id}</div>
      <div class="meta">Ngày: ${new Date(order.createdAt).toLocaleString('vi-VN')}</div>
      <div class="meta">Khách hàng: ${order.customerName || 'Khách lẻ'} ${order.customerEmail ? `(${order.customerEmail})` : ''}</div>
      <table><thead><tr><th>Sản phẩm</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody>${itemRows}</tbody></table>
      <div class="totals">
        <div class="row"><span>Tạm tính</span><strong>${formatPrice(order.subtotal)}</strong></div>
        <div class="row"><span>VAT ${Math.round((order.vatRate || 0.1) * 100)}%</span><strong>${formatPrice(order.vat)}</strong></div>
        <div class="row total"><span>Tổng cộng</span><strong>${formatPrice(order.total)}</strong></div>
      </div>
      <script>window.print();<\/script>
    </body></html>
  `;
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showToast('Trình duyệt đã chặn cửa sổ in.');
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
}

function openPaymentSuccess(order) {
  const modal = document.getElementById('successModal');
  const overlay = document.getElementById('successOverlay');
  if (!modal || !overlay || !order) return;
  modal.dataset.orderId = order.id;
  document.getElementById('successOrderId').textContent = order.id;
  document.getElementById('successSubtotal').textContent = formatPrice(order.subtotal || 0);
  document.getElementById('successVat').textContent = formatPrice(order.vat || 0);
  document.getElementById('successTotal').textContent = formatPrice(order.total || 0);
  modal.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePaymentSuccess() {
  document.getElementById('successModal')?.classList.remove('open');
  document.getElementById('successOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function initAdmin() {
  const dataApi = getDataApi();
  if (!dataApi) return;

  document.getElementById('adminProductForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const product = productFromAdminForm();
    if (!product.name || !product.price) {
      showToast('Vui lòng nhập tên và giá sản phẩm.');
      return;
    }
    products = dataApi.upsertProduct(products, product);
    dataApi.saveProducts(products);
    resetAdminForm();
    renderAllProductViews();
    showToast('Đã lưu sản phẩm.');
  });

  document.getElementById('adminCancelEdit')?.addEventListener('click', resetAdminForm);
  document.getElementById('adminNewProduct')?.addEventListener('click', () => {
    resetAdminForm();
    document.getElementById('adminProductName')?.focus();
  });
  document.getElementById('adminSearch')?.addEventListener('input', renderAdminDashboard);
  document.getElementById('adminResetData')?.addEventListener('click', () => {
    products = defaultProducts.map(product => ({ ...product }));
    dataApi.saveProducts(products);
    resetAdminForm();
    renderAllProductViews();
    showToast('Đã khôi phục dữ liệu gốc.');
  });
  document.getElementById('adminProductRows')?.addEventListener('click', (event) => {
    const editBtn = event.target.closest('[data-admin-edit]');
    const deleteBtn = event.target.closest('[data-admin-delete]');
    if (editBtn) {
      const product = products.find(item => Number(item.id) === Number(editBtn.dataset.adminEdit));
      if (product) fillAdminForm(product);
    }
    if (deleteBtn) {
      products = dataApi.deleteProduct(products, deleteBtn.dataset.adminDelete);
      dataApi.saveProducts(products);
      renderAllProductViews();
      showToast('Đã xóa sản phẩm.');
    }
  });

  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(panel => panel.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-admin-panel-id="${tab.dataset.adminPanel}"]`)?.classList.add('active');
      renderAdminDashboard();
    });
  });

  document.getElementById('adminBrandForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const dataApi = getDataApi();
    const name = document.getElementById('adminBrandName').value;
    const logo = document.getElementById('adminBrandLogo').value;
    brands = dataApi.upsertBrand(brands, { name, logo });
    dataApi.saveBrands(brands);
    document.getElementById('adminBrandForm').reset();
    renderBrandFilters();
    renderAdminDashboard();
    showToast('Đã lưu hãng.');
  });
  document.getElementById('adminBrandRows')?.addEventListener('click', (event) => {
    const editBtn = event.target.closest('[data-brand-edit]');
    const deleteBtn = event.target.closest('[data-brand-delete]');
    const dataApi = getDataApi();
    if (editBtn) {
      const brand = brands.find(item => item.id === editBtn.dataset.brandEdit);
      if (brand) {
        document.getElementById('adminBrandName').value = brand.name;
        document.getElementById('adminBrandLogo').value = brand.logo || '';
      }
    }
    if (deleteBtn) {
      const brandId = deleteBtn.dataset.brandDelete;
      if (products.some(product => product.brand === brandId)) {
        showToast('Không thể xóa hãng đang có sản phẩm.');
        return;
      }
      brands = dataApi.deleteBrand(brands, brandId);
      dataApi.saveBrands(brands);
      renderAdminDashboard();
    }
  });

  document.getElementById('adminUserForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const auth = getAuthApi();
    const users = auth.getUsers();
    const nextUsers = auth.upsertUser(users, {
      id: document.getElementById('adminUserId').value || undefined,
      name: document.getElementById('adminUserName').value,
      email: document.getElementById('adminUserEmail').value,
      phone: document.getElementById('adminUserPhone').value,
      password: document.getElementById('adminUserPassword').value || undefined,
      role: document.getElementById('adminUserRole').value,
    });
    auth.saveUsers(nextUsers);
    resetUserForm();
    refreshAuthUI();
    renderAdminDashboard();
    showToast('Đã lưu user.');
  });
  document.getElementById('adminCancelUserEdit')?.addEventListener('click', resetUserForm);
  document.getElementById('adminUserRows')?.addEventListener('click', (event) => {
    const editBtn = event.target.closest('[data-user-edit]');
    const deleteBtn = event.target.closest('[data-user-delete]');
    const auth = getAuthApi();
    if (editBtn) {
      const user = auth.getUsers().find(item => item.id === editBtn.dataset.userEdit);
      if (user) fillUserForm(user);
    }
    if (deleteBtn) {
      const nextUsers = auth.deleteUser(auth.getUsers(), deleteBtn.dataset.userDelete);
      auth.saveUsers(nextUsers);
      resetUserForm();
      refreshAuthUI();
      renderAdminDashboard();
      showToast('Đã xóa user nếu hợp lệ.');
    }
  });
  document.getElementById('adminRevenueRange')?.addEventListener('change', renderAdminRevenue);
  document.getElementById('adminOrderRows')?.addEventListener('click', (event) => {
    const printBtn = event.target.closest('[data-print-order]');
    if (printBtn) printInvoice(printBtn.dataset.printOrder);
  });

  document.getElementById('successClose')?.addEventListener('click', closePaymentSuccess);
  document.getElementById('successOverlay')?.addEventListener('click', closePaymentSuccess);
  document.getElementById('successContinue')?.addEventListener('click', closePaymentSuccess);
  document.getElementById('successPrintInvoice')?.addEventListener('click', () => {
    const orderId = document.getElementById('successModal')?.dataset.orderId;
    if (orderId) printInvoice(orderId);
  });
}

/* ==================== CART FUNCTIONS ==================== */
function saveCart() {
  localStorage.setItem('technova_cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`✓ ${product.name.split(' ').slice(0, 4).join(' ')}... đã vào giỏ!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  if (item.qty === 0) removeFromCart(productId);
  else { saveCart(); updateCartUI(); }
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = totalQty;

  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div style="font-size:3rem">🛒</div>
        <p>Giỏ hàng trống</p>
        <small>Hãy chọn thêm sản phẩm nhé!</small>
      </div>`;
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'flex';
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}"
        onerror="this.src='${FALLBACK_IMG}'" loading="lazy" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Xóa">✕</button>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  totalEl.textContent = formatPrice(total);
}

/* ==================== CART SIDEBAR TOGGLE ==================== */
function initCartToggle() {
  const toggle = document.getElementById('cartToggle');
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  const closeBtn = document.getElementById('cartClose');
  const clearBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function openCart() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle && toggle.addEventListener('click', openCart);
  closeBtn && closeBtn.addEventListener('click', closeCart);
  overlay && overlay.addEventListener('click', closeCart);
  clearBtn && clearBtn.addEventListener('click', clearCart);
  checkoutBtn && checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Giỏ hàng đang trống.');
      return;
    }
    const auth = getAuthApi();
    const data = getDataApi();
    const user = auth ? auth.getCurrentUser() : null;
    const order = data ? data.createOrder({
      customerName: user ? user.name : 'Khách lẻ',
      customerEmail: user ? user.email : '',
      items: cart.map(item => ({ ...item })),
      vatRate: 0.1,
    }) : null;
    orders = data ? data.loadOrders() : orders;
    clearCart();
    closeCart();
    renderAdminDashboard();
    if (order) openPaymentSuccess(order);
    else showToast('Thanh toán thành công!');
  });
}

/* ==================== TOAST ==================== */
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  msgEl.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ==================== NAVBAR ==================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  hamburger && hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks && navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ==================== SEARCH ==================== */
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const dropdown = document.getElementById('searchDropdown');
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');

  toggle && toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
    if (dropdown.classList.contains('open')) setTimeout(() => input.focus(), 150);
  });

  clearBtn && clearBtn.addEventListener('click', () => {
    input.value = '';
    searchQuery = '';
    displayedCount = PAGE_SIZE;
    renderProducts();
  });

  let searchTimeout;
  input && input.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = e.target.value.trim();
      displayedCount = PAGE_SIZE;
      renderProducts();
      if (searchQuery) document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dropdown.classList.remove('open');
  });
}

/* ==================== FILTER ==================== */
function initFilter() {
  renderBrandFilters();
  const brandFilterBar = document.getElementById('brandFilterBar');
  brandFilterBar && brandFilterBar.addEventListener('click', (event) => {
    const btn = event.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.brand;
    displayedCount = PAGE_SIZE;
    renderProducts();
  });

  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn && loadMoreBtn.addEventListener('click', () => {
    displayedCount += PAGE_SIZE;
    renderProducts();
  });
}

/* ==================== FAQ ==================== */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-question').forEach(b => {
        b.classList.remove('open');
        const ans = b.nextElementSibling;
        if (ans) ans.classList.remove('open');
      });
      if (!isOpen) {
        btn.classList.add('open');
        const ans = btn.nextElementSibling;
        if (ans) ans.classList.add('open');
      }
    });
  });
}

/* ==================== CONTACT FORM ==================== */
function initContact() {
  const submitBtn = document.getElementById('contactSubmit');
  submitBtn && submitBtn.addEventListener('click', () => {
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    if (!name || !phone) { showToast('⚠️ Vui lòng điền đầy đủ thông tin!'); return; }
    showToast(`✓ Cảm ơn ${name}! Chúng tôi sẽ liên hệ bạn sớm.`);
    document.getElementById('contactName').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactMessage').value = '';
  });
}

/* ==================== BACK TO TOP ==================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  btn && btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ==================== SCROLL REVEAL ==================== */
function triggerReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ==================== HERO COUNTER ANIMATION ==================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

function animateCounter(el, target) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString('vi-VN');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString('vi-VN');
    }
  }, 25);
}

/* ==================== INIT ==================== */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';

  initLoader();
  initNavbar();
  initSearch();
  initFilter();
  initFAQ();
  initContact();
  initBackToTop();
  initCartToggle();
  initCountdown();
  initProductModal(); // MỚI THÊM
  initAuth();
  initAdmin();

  // Render data
  renderFlashSale();
  renderProducts();
  renderBestseller();

  // Update cart from localStorage
  updateCartUI();

  // Canvas and animations
  setTimeout(() => {
    initHeroCanvas();
    initCounterAnimation();
    triggerReveal();
  }, 100);

  window.addEventListener('scroll', triggerReveal, { passive: true });
});
