const mongoose= require('mongoose');
const pizzaShecma= new mongoose.Schema({

    title: {
        type: String,
        required: false
    },
    ID: {
        type: Number,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    Filetype: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    dateSend: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    FID: {
        type: Number,
        required: false
    },
    FNum: {
        type: Number,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    etc: {
        type: String,
        required: false
    },
    dateChIn1: {
        type: String,
        required: false
    },
    dateChOut1: {
        type: String,
        required: false
    },
    dateChIn2: {
        type: String,
        required: false
    },
    dateChOut2: {
        type: String,
        required: false
    },
    dateChIn3: {
        type: String,
        required: false
    },
    dateChOut3: {
        type: String,
        required: false
    },
    Author: {
        type: String,
        required: false
    },
    AuthorChIn: {
        type: String,
        required: false
    },
    AuthorChOut: {
        type: String,
        required: false
    },
    typefile: {
        type: String,
        require: false
    },
    present: {
        type: String,
        require: false
    },
    page: {
        type: Number,
        require: false
    },

  
});

const addPizza = mongoose.model('addPizza', pizzaShecma)
module.exports = addPizza;
