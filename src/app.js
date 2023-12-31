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
const httpServer = app.listen(8080, ()=> console.log("Listening on PORT 8080"));
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

socketServer.on('connection', socket=>{
  console.log("Nuevo cliente conectado")


socket.on("message", data =>{
  console.log(data)
});

});