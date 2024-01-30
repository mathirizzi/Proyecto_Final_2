import {Router} from 'express';

import ProductManager from '../ProductManager.js';

import productModel from '../daos/models/products.models.js'

const products = new ProductManager("products.json");


const router = Router();


    router.get('/', async (req,res)=>{
        try{
           const result = await products.getProducts()
           const limit = parseInt(req.query.limit) || 10;
           const productsLimit = result.slice(0, limit);
          res.send({
            status: 'success',
            result: productsLimit
          })
    }   catch (error) {
        res.status(500).send('Error de servidor')
    }
       
})

router.get('/:pid', async (req,res)=>{
    try {
        const {pid} = req.params;   
        const resultID = await products.getProductById(parseInt(pid))
        res.send({
            status: 'success',
            result: resultID
        })
        
    } catch (error) {
        res.status(500).send('Error de servidor')
    }
})

router.post('/', async (req,res)=>{
    const {title, description, price, thumbnail,stock, code} = req.body;

    if(!title|| !description|| !price|| !thumbnail|| !stock|| !code) return res.send({status: "error", error: "Incomplete values"})

  
   let result = await productModel.create({
    title,
    description,
    price,
    thumbnail,
    stock,
    code
   })
    res.status(201).send({
        status: 'success',
        payload: result
    })
})

router.delete('/:pid', async (req,res)=>{
    const {pid} = req.params;
    const productDeleted = await productModel.deleteOne({_id:pid})
    res.send({
        status: 'success',
        result: productDeleted
    })
})

router.put('/:pid', async (req,res)=>{
    const {pid} = req.params;
    const {title, description, price, thumbnail,stock, code, id} = req.body;
    if(!title|| !description|| !price|| !thumbnail|| !stock|| !code) return res.send({status: "error", error: "Incomplete values"})
    const newProductUpdated = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        stock: stock,
        code: code,
        id: id
    }
      const productUpdated = await productModel.updateOne({_id:pid},newProductUpdated)
    res.send({
        status: 'success',
        result: productUpdated
    })
})


export default router;