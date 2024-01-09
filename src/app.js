import express from 'express'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/views.router.js'
import {Server} from 'socket.io';
import productsRouter from "./routers/products.router.js"
import cartsRouter from "./routers/carts.router.js"
import ProductManager from './ProductManager.js';

//-------------------------SERVIDOR------------------------------//
const app = express();
const PORT = 8080 || process.env.PORT
const httpServer = app.listen(PORT, ()=> console.log("Listening on PORT 8080"));
const socketServer = new Server(httpServer);

//-------------------------PLANTILLAS------------------------------//

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.use("/products", ()=>{});

//socket lado servidor
const products = new ProductManager("products.json");
const productList = await products.getProducts()
     

socketServer.on('connection', socket=>{
  console.log("Nuevo cliente conectado")

socket.emit("lista-de-productos", productList)

socket.on("id-producto-eliminado", data =>{
  products.deleteProduct(parseInt(data))
})

socket.on("producto-creado", data =>{
  
  products.addProduct(newProduct)
})

});