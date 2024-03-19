const Product = require('../models/product');
const Pizza = require('../models/addPizza.model');
const Order = require('../models/order');
const path = require('path');
const addPizza = require('../models/addPizza.model');

exports.getProductForm = (req, res, next) => {
    if(req.cookies["username"] == "admin2021") {
        res.render('បញ្ចូលព័ត៌មាន', { name: 'Botin', path: '/all-product', pageTitle: 'Add Product' });
    } 
    else {
        res.write("You are not an admin, imposter!");
        res.end();
    }
}

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const ID = req.body.ID;
    const FID = req.body.FID;
    const FNum = req.body.FNum;
    const description = req.body.description;
    const category = req.body.category;
    const Filetype = req.body.Filetype;
    const dateSend = req.body.dateSend;
    const etc = req.body.etc;
    const time = req.body.time;
    const price = req.body.price;
    const  dateChIn1 = req.body.dateChIn1;
    const  dateChIn2 = req.body.dateChIn2;
    const  dateChIn3 = req.body.dateChIn2;
    const  dateChOut1 = req.body.dateChOut1;
    const  dateChOut2 = req.body.dateChOut2;
    const  dateChOut3 = req.body.dateChOut3;
    const  Author = req.body.Author;
    const  AuthorChIn = req.body.AuthorChIn;
    const  AuthorChOut = req.body.AuthorChOut;
    const  present  = req.body.present;
    const page = req.body.page;

    const pizza = new Pizza({
        title:title,
        FID: FID,
        FNum: FNum,
        ID: ID,
        description : description,
        category : category,
        Filetype : Filetype,
        dateSend : dateSend,
        etc : etc,
        time : time,
        price : price,
        dateChIn1 : dateChIn1,
        dateChIn2 : dateChIn2,
        dateChIn3 : dateChIn3,
        dateChOut1 : dateChOut1,
        dateChOut2 : dateChOut2,
        dateChOut3 : dateChOut3,
        Author : Author,
        AuthorChIn : AuthorChIn,
        AuthorChOut : AuthorChOut,
        present : present,
        page : page,
    });
    pizza.save().then(result=>{
        console.log('Pizza is created');
        res.redirect('/admin-page');
    }).catch(err=>{
        console.log(err);
    })
}

exports.editProductPage = (req, res, next) => {
  console.log(req)
}

exports.editProductPost = (req, res, next) => {
    const Updatefile = new addPizza(
        req.body.id,
        req.body.title,
        req.body.FID,
        req.body.FNum,
        req.body.ID,
        req.body.description,
        req.body.category,
        req.body.dateSend,
        req.body.etc,
        req.body.time,
        req.body.price,
    );
    Updatefile.update().
    res.redirect("/admin-page"+ Updatefile.id);
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id);
    res.redirect('/all-product');
}

exports.postOrder = (req, res, next) => {
    const price=req.body.price;
    const id= req.body.productID;
    const service = req.body.service;
    const name = req.body.name;
    const phone = req.body.phone;
    const amount = req.body.amount;
    const total = Math.round((price * amount)*100) / 100 ;
    const payment = req.body.payment;
    const date = req.body.date;
    const location = req.body.location;
    const people = req.body.people;
    const product = req.body.product;
    const username= req.body.username;
    
    const order = new Order({
        service: service,
        name: name,
        phone: phone,
        amount: amount,
        payment : payment,
        total: total,
        date : date,
        location : location,
        people : people,
        product : product,
        username: username,
    });
    order.save().then(result=>{
        console.log('order is created');
        // res.redirect('/recipt');
        res.render('Recipt', { service: service, name: name, phone: phone, amount: amount, payment: payment, date: date, location: location, people: people, product: product, id: id, price:price, total:total, username: username });
    }).catch(err=>{
        console.log(err);
    })
}

exports.purchase = (req, res, next) => {
    Order.find().then(order =>{
        res.render('purchaseHistory',{order: order,username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
    })
}