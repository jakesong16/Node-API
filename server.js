const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Hello NODE API')
})
app.get('/blog', (req, res) => {
    res.send('Hello Blog')
})

//use async and await when interacting with the database

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete a product
app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://jakesong1:12345@jakeapi.b8hu4.mongodb.net/?retryWrites=true&w=majority&appName=JakeAPI')
.then(()=> {
    app.listen(3000, () => {
        console.log('Node API app is running on port 3000')
    })
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error)
})
