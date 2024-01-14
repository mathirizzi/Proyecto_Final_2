import mongoose from "mongoose";

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number,
    code: String
})

const productModel = mongoose.model(productsCollection, productsSchema)

module.exports = {
    productModel
}