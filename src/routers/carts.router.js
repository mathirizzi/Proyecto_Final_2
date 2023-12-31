import {Router} from 'express';

import CartManager from '../CartManager.js';

const carts = new CartManager("carts.json");

const router = Router();

router.get('/', async (req,res)=>{
    try{
       const result = await carts.getCarts()
      res.send({
        status: 'success',
        result: result
      })
}   catch (error) {
    res.status(500).send('Error de servidor')
}
   
})

router.get('/:cid', async (req,res)=>{
    try {
        const {cid} = req.params;   
        const resultID = await carts.getCartById(parseInt(cid))
        res.send({
            status: 'success',
            result: resultID
        })
    } catch (error) {
        res.status(500).send('Error de servidor')
    }
})

router.post('/', async (req,res)=>{
    try {
        const result = await carts.createCart()
        res.send({
            status: 'success',
            payload: result
        })
        
    } catch (error) {
        res.status(500).send(`Error de server ${error.message}`)
        
    }
})

router.post('/:cid/products/:pid', async (req,res)=>{
    try {
        const {cid,pid} = req.params
        //const {quantity} = req.body
        const result = await carts.addProductToCart(Number(cid),Number(pid))
        res.send({
            status: 'success',
            payload: result
        })
        
    } catch (error) {
        console.log(error)
        
    }
   
})

export default router;