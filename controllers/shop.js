const Product = require('../models/product');
// const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    })

};

exports.getProductId = (req, res, next) => {
  const prodID = req.params.productId;
  console.log(prodID);
  Product.findById(prodID)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));

};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getCart = (req, res, next) => {
  req.user

    .populate('cart.items.productId')

    .then((user) => {
      const products = user.cart.items;
      // console.log(user.cart.items);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));


};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then((product) => {
    return req.user.addToCart(product)
  })
    .then(result => {
      console.log(result)
      res.redirect('/cart');

    })
    .catch(err => console.log(err));

  //   .then(() => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => console.log(err));
}

exports.deleteCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteCartProduct(prodId)

    .then((result) => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.createOrder = (req, res) => {

  req.user.addOrder()
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));

}

exports.getOrders = (req, res, next) => {
  req.user.getOrder()
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })

};

// exports.getCheckout = (req, res, next) => {

//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };
