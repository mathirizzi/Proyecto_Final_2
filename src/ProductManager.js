import fs from "fs"
class ProductManager {
  constructor(productsFile) {
    this.path = productsFile;
  }

  //----------Para leer archivo json.----------//

  async readFileProducts() {
    try {
      const productsData = await fs.promises.readFile(this.path, "utf-8");
      const productsJs = await JSON.parse(productsData);
    return productsJs;
      
    } catch (error) {
      return [];
    }
  }

  //--------------------Para crear un producto nuevo--------------------//

  async addProduct(newProduct) {
    try {
      let productsList = await this.readFileProducts();
      if (productsList.length === 0) {
      await  productsList.push({ ...newProduct, id: 1 });
      } else {
       await productsList.push({ ...newProduct, id: productsList.length + 1 });
      }

      

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productsList, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------Para ver la lista de productos--------------------//

  async getProducts() {
    try {
      const getList = await this.readFileProducts();
      return getList
      
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------Para ver un producto por su ID--------------------//

  async getProductById(pid) {
    try {
      const getListID = await this.readFileProducts();
      const result = getListID.find((prod) => prod.id === pid);
      if (!result) {
        return "No existe el producto seleccionado";
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------Para actualizar producto llamado a traves de su ID--------------------//

  async updateProduct(pid, update) {
    try {
      let getList = await this.readFileProducts();
      let result = getList.findIndex((prod) => prod.id === pid);
      if (!result) {
        return console.log("No se encontro el producto que desea actualizar");
      } else {
        getList[result] = update;
      }
      return await fs.promises.writeFile(
        this.path,
        JSON.stringify(getList, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------Para eliminar producto seleccionado a traves de su ID--------------------//
  async deleteProduct(pid) {
    try {
      let getList = await this.readFileProducts();
      let result = getList.findIndex((prod) => prod.id === pid);
      if (!result) {
        return console.log("No se encontro el producto que desea actualizar");
      } else {
        getList.splice(result, 1);
      }
      return await fs.promises.writeFile(
        this.path,
        JSON.stringify(getList, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }



  
}

export default ProductManager;




