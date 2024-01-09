import express from 'express';
import ProductManager from '../ProductManager.js';
const products = new ProductManager("products.json");


const router = express.Router();

router.get('/realtimeproducts',async (req,res)=>{
    try{
  const productList = await products.getProducts()

    
    res.render('realTimeProducts', {productList});
}   catch (error) {
    res.status(500).send('Error de servidor')
}
})


router.get('/', async (req,res)=>{
    try{
      const productList = await products.getProducts()
     
      res.render('home', {productList})
}   catch (error) {
    res.status(500).send('Error de servidor')
}

})

export default router;