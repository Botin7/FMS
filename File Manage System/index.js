const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload=require('express-fileupload');
const port = 3000;
const cookiePaser = require('cookie-parser');
const router = require('./router/admin');
const shopRoutes = require('./router/shop');
const comment = require('./router/api/comment');
const price = require('./router/api/price');
const shop = require('./router/shop');
const addPizza = require('./models/addPizza.model');
const url = require('url'); 
// const router = express.Router();
const sendAlert = require('./controller/telegramBot');




router.get('/telegramBot', (req, res) => {
    res.render('TelegramBot');
});
router.post('/sendAlert',(req, res) => {
    console.log('==================',req.body)
    const caption = req.body.alertMessage;
    // const file = req.body.alertFile;
    try {
        sendAlert(caption);
        res.send('Alert sent!');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error sending alert!');
      }
    res.redirect('/');
});
app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/assets/css',express.static(__dirname + '/public/assets/css'));
app.use('/public/assets/js',express.static(__dirname + '/public/assets/js'));
app.use('/public/assets/img',express.static(__dirname + '/public/assets/img'));

app.use(cookiePaser());
app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000*60*60,
        sameSite: true,
        secure: false

    },
    secret: "shh, it's a secrete",
    name: 'sid'
}));
app.use(cookiePaser());

// Endpoint to clear cookies
app.get('/clear-cookies', (req, res) => {
    // Iterate through each cookie and set its expiration date to the past
    Object.keys(req.cookies).forEach(cookieName => {
        res.clearCookie(cookieName);
        
    });
    res.redirect(url.format({
        pathname:"/all",
    }));
});


//Change the user1:user1@cluster-ecommerce to your mongoDB mongodb+srv://<username>:<password>@<clustername>-k1jer.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://user1:user1@cluster-ecommerce.k1jer.mongodb.net/users?retryWrites=true&w=majority', {useFindAndModify: false}).then(result=>{
    console.log("DB is connected");
}).catch(err=>{
    console.log(err);
})
// Delete item on click from DB
// Post route to delete record

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));



//method override




// app.use((err, req, res, next) => {
//     res.status(500).send('Something Broke!');
// });


console.log('True');
app.use(router);


app.use('/api', comment);
app.use('/api', price);
app.use('/admin', router);
app.use(shopRoutes);
app.use(shop);
app.listen(port);

//use "npm start" to start the server











