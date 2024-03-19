const express = require('express');
const fs = require('fs');
const app = express()
const path = require('path');
const router = express.Router();
const appController=require('../controller/adminController');
const authController = require('../controller/authController');
const adminController = require('../controller/admin');
const shopController = require('../controller/shop');
const addPizza = require('../models/addPizza.model');


router.get('/',appController.getHomePage)
router.get('/InvitaionLetter-page',appController.getMondaySpecial)
router.get('/GeneralAdmin-page',appController.getCombodeals)
router.get('/ProjectFile-page',appController.getdrinksPage)
router.get('/BudgetUnit-page',appController.getpizzaPage)
router.get('/Procurement-page',appController.getsidesPage)
router.get('/Composition-page',appController.getAttendacePage)
router.get('/profile-page',appController.getprofilePage)
router.get('/admin-Page',appController.getadminPage)
router.get('/UserProfile',appController.getUserProfile)
router.get('/message-box',appController.getmessage)
router.get('/recipt',appController.getrecipt)
router.get('/purchaseHis',appController.getPurchase)
router.get('/orderform/:id',appController.getorderform)
router.get('/product-page/:id',appController.getproductPage)
router.get('/signin',authController.signIn);
router.get('/signup', authController.signUp);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/add-product', adminController.getProductForm);
router.post('/add-product', adminController.postProduct);
router.get('/edit-filepage', appController.editfilepage);
router.post('/edit-product', adminController.editProductPost);
router.post('/delete-product', adminController.deleteProduct);
router.post('/add-order', adminController.postOrder);
router.post('/save-username', adminController.postOrder);
router.get('/purchase',adminController.purchase)
router.get('/orderlog',appController.getorderlog);
router.get('/commentlog',appController.getcommentlog);
router.post('/search', appController.search);

router.post('/edit-filepage/:id',(req, res, next)=>{
    addPizza.findByIdAndUpdate({_id: req.params.id}, req.body, (err, docs)=>{
        if (err) {
            console.log("Cannot not edit!")
            next(err)
        }
         else {
            res.redirect('/admin-Page');
        }
    })
})

   
module.exports = router;



//the may need to change "get" to something else if we want the website to work correctly
//in order to route, write code in controller