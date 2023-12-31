import fs from "fs"

class CartManager {
  constructor(cartsFile) {
    this.path = cartsFile;
  }

  //----------Para leer archivo json.----------//
  async readFileCarts() {
    try {
      const cartsData = await fs.promises.readFile(this.path, "utf-8");
      const cartsJs = await JSON.parse(cartsData);
    return cartsJs;
      
    } catch (error) {
      return [];
    }
  }

  //--------------------Para crear un carrito nuevo--------------------//
async createCart(){
    try {
        let carts = await this.readFileCarts()
        let newCart = {
            id: carts.length + 1,
            products : []
        }
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        return newCart
        
    } catch (error) {
        return 'Error al crear el carrito'
        
    }
}

   //--------------------Para ver la lista de carritos--------------------//

   async getCarts() {
    try {
        const carts = await this.readFileCarts()
        return carts
        
    } catch (error) {
        console.log(error)
        
    }
   }

    //--------------------Para ver carrito por su ID--------------------//
async getCartById(cid){
    try {
        const carts = await this.readFileCarts()
        const cart = carts.find(cart => cart.id === cid)

        if (!cart) {
            return 'No se encuentra el carrito'
        }
        return cart
        
    } catch (error) {
        console.log(error)
        
    }
}


     //--------------------Para agregar un producto al carrito--------------------//
  async addProductToCart(cid,pid){
    try {
        
    
    const cartsList = await this.readFileCarts()
    const cartIdx = cartsList.findIndex(cart => cart.id === cid)

    if(cartIdx === -1){
        return 'El carrito seleccionado no existe'
    }
    const productIdx = cartsList[cartIdx].products.findIndex(produc => produc.product === pid)
    if(productIdx === -1){
        cartsList[cartIdx].products.push({
            product: pid,
            quantity: 1
        })
    }else{
        cartsList[cartIdx].products[productIdx].quantity += 1
    }
    await fs.promises.writeFile(this.path, JSON.stringify(cartsList, null, 2), "utf-8")
  return cartsList[cartIdx]
}
  catch (error) {
    console.log(error)
        
}
} 

    }

export default CartManager;
