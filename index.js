const express = require('express')
const app = express()

require('dotenv').config()
const password = process.env.ATLAS_PASS
const dbname = 'Projekt'

const mongoose = require("mongoose");

const userRoute = require("./rute/users");
const authRoute = require("./rute/auth");
const productRoute = require("./rute/product");
const cartRoute = require("./rute/cart");
const orderRoute = require("./rute/order");

const url = `mongodb+srv://OARWA-projekt:${password}@cluster0.lfbwurh.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url)
    .then(result => {
        console.log('Spojeni smo na bazu');
        })
    .catch(error => {
        console.log('Greška pri spajanju', error.message);
        }) 

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})
