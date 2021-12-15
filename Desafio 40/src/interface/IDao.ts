export class IDao{
    getProducts: any;
    getProductById: any;
    insertProduct: any;
    updateProduct: any;
    deleteProduct: any;
    constructor(getProducts: any, getProductById: any, insertProduct: any, updateProduct: any, deleteProduct: any){

        this.getProducts = getProducts;
    
        this.getProductById = getProductById;
    
        this.insertProduct = insertProduct;
    
        this.updateProduct = updateProduct;
    
        this.deleteProduct = deleteProduct;
    }
}