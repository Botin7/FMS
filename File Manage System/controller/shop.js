const Product = require('../models/product');
const UserComment = require('../models/userCommentModel');
const Cart = require('../models/cart');
const Pizza = require('../models/addPizza.model');
const Order = require('../models/order');
const fs = require('fs');

exports.getAllProducts = (req, res, next) => {
    const products = Product.findAll();
    // console.log(products);
    res.render('app', { name: 'Selasak', prods: products, path: '/all-product', pageTitle: 'Prdouct' });
};

exports.getProductDetail = (req, res, next) => {
    const products = Product.findById(req.params.prodId);
    res.render('product-detail', { prod: products[0], pageTitle: 'Product Detail', path: '/detail', name: 'Pariha' });
}

exports.addToCart = (req, res, next) => {
    const addedProduct = Product.findById(req.body.id)[0];
    Cart.save(addedProduct);
    res.redirect('/cart');
}

exports.getCart = (req, res, next) => {
    res.render('cart', { cart: Cart.getCart(), pageTitle: 'Shopping Cart Detail', path: '/cart', name: 'Botin' })
}

exports.editfile = (req, res, next) => {
    console.log(req.body.prodId);

    //res.redirect('/admin-page');
    const id= req.body.prodId;
    console.log(id)
    Pizza.findById(id)
    .then(result=>{
        console.log(result)
        res.redirect('/edit-product/:prodId')
    }).catch(error=>{
        console.log(error)
    })
}
exports.deleteById = (req, res, next) => {
    console.log('hi')
    console.log(req.body.prodId);

    //res.redirect('/admin-page');
    const id= req.body.prodId;
    console.log(id)
    Pizza.findByIdAndDelete(id)
    .then(result=>{
        console.log(result)
        res.redirect('/admin-page')
    }).catch(error=>{
        console.log(error)
    })
}

exports.deleteOrder = (req, res, next) => {
    const id= req.body.orderId;
    Order.findByIdAndDelete(id)
    .then(result=>{
        console.log(result)
        res.redirect('/orderlog')
    }).catch(error=>{
        console.log(error)
    }) 
}

exports.deleteComment = (req, res, next) => {
    const id= req.body.commentId;
    UserComment.findByIdAndDelete(id)
    .then(result=>{
        console.log(result)
        res.redirect('/commentlog')
    }).catch(error=>{
        console.log(error)
    }) 
}

exports.newComment = (req, res, next) => {
    const id= req.body.commentId;
    const productId = req.body.productId;
    UserComment.findByIdAndDelete(id)
    .then(result=>{
        console.log(result)
        res.redirect('/product-page/'+productId)
    }).catch(error=>{
        console.log(error)
    }) 
}