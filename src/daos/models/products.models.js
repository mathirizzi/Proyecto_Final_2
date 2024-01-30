import mongoose from "mongoose";

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number,
    code: {
        type: String,
        unique: true,
        required: true
    }
})

const productModel = mongoose.model(productsCollection, productsSchema)

export default productModel;
