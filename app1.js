const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Data simulasi daftar produk
const products = [
  { id: 1, name: 'Product A', price: 10 },
  { id: 2, name: 'Product B', price: 20 },
  { id: 3, name: 'Product C', price: 30 },
];

let cartItems = []; // Simpan item keranjang

app.get('/', (req, res) => {
    const total = calculateTotal(cartItems);
    res.render('index', { products, cartItems, total });
  });

// Tambahkan item ke keranjang
app.get('/add-to-cart/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const quantity = parseInt(req.query.quantity) || 1; // Mengambil jumlah, default 1
    const product = products.find(item => item.id === productId);
  
    if (product) {
      // Menambahkan item dengan jumlah ke keranjang
      for (let i = 0; i < quantity; i++) {
        cartItems.push(product);
      }
    }
  
    res.redirect('/');
  });

// Hitung total harga di keranjang
function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.price, 0);
}

app.get('/cart', (req, res) => {
  const total = calculateTotal(cartItems);
  res.render('cart', { cartItems, total });
});

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
