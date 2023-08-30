const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const products = [
    { id: 1, name: 'Product A', price: 10 },
    { id: 2, name: 'Product B', price: 20 },
    { id: 3, name: 'Product C', price: 30 },
  ];

let cartItems = []; 

app.get('/',(req, res)=>{
    res.render('index',{products, cartItems});
});

app.get('/add-to-cart/:id', (req, res) => {
    //request parameter id dan mengubah id menjadi bilangan bulat
    const productId = parseInt(req.params.id);
    //mencari id products yang sesuai id dengan productId
    const product = products.find(item => item.id === productId);

    if (product) {
        //jika product sesuai, akan dikirim ke cartItems
        cartItems.push(product);
    }
    //jika tidak berhasil, akan diarahkan kembali ke halaman '/'
    res.redirect('/'); 

    // membuat fungsi calculateTotal dengan param cart
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

});
  