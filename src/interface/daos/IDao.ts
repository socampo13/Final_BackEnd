export interface IDao {
    getProducts(): any;
    getProductById(id: number): any;
    insertProduct(product: any): any;
    updateProduct(product: any, id: number): any;
    deleteProduct(id: number): any;
  }