import { IDao } from "../interface/daos/IDao";
import path from 'path';

const __dirname = path.resolve();
const admin = require("firebase-admin");

const serviceAccount = require(`${__dirname}path/to/serviceAccountKey.json`);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseUrl: "makeithappen.firebaseio.com",
});

const db = admin.firestore();
const collection = db.collection("productos");

export class FirebaseDao implements IDao {
  private products: Array<FirebaseDao>;
  private count: number;
  public id: number;

  constructor() {
    this.products = [];
    this.id = 1;
    this.count = 1;
  }

  getProducts(): Array<FirebaseDao> {
    async () => {
      const snapshot = await db.collection("productos").get();
      console.log(snapshot);
    };

    return this.products;
  }

  getProductById(id: number) {
    const product = this.products.find((element) => element.id === id);
    console.log(product);

    const queryRef = collection.where("id", "==", id);
    console.log(queryRef);

    return product;
  }

  insertProduct(product: any) {
    const date = new Date();
    const templateDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;

    const newProduct = {
      ...product,
      id: this.count,
      templateDate,
    };

    this.products.push({
      ...newProduct,
    });
    this.count++;
    console.log("Producto insertado correctamente");

    const productFb = db
      .collection("productos")
      .doc(`producto: ${newProduct.id}`);
    productFb.set(newProduct);
  }

  updateProduct(product: any, id: number) {
    const date = new Date();
    const templateDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;

    const newProduct = {
      ...product,
      id: this.count,
      templateDate,
    };
    let index = this.products.findIndex((element) => element.id === id);
    this.products[index] = product;
    const productFb = db
      .collection("productos")
      .doc(`producto: ${newProduct.id}`);
    productFb.set(newProduct);
  }

  deleteProduct(id: number): any {
    let index = this.products.findIndex((element) => element.id === id);
    this.products.splice(index, 1);

    const res = db.collection("productos").doc(`producto: ${id}`).delete();
  }
}