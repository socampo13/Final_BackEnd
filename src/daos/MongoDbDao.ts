import { IDao } from "../interface/daos/IDao";
import mongoose from "mongoose";
const model = require("../models/mongodb");

export class MongoDbDao implements IDao {
  private products: Array<MongoDbDao>;
  private count: number;
  public id: number;

  constructor() {
    this.products = [];
    this.id = 1;
    this.count = 1;

    (async () => {
      try {
        mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
          console.log("Base de datos conectada");
        });
      } catch (err: any) {
        console.log("Ha ocurrido un error", err);
      } finally {
        mongoose.disconnect(() => {
          console.log("Base de datos desconectada");
        });
      }
    })();
  }

  getProducts(): Array<MongoDbDao> {
    async () => {
      let readProducts = await model.productos.find();
      console.log(readProducts);
    };
    return this.products;
  }

  getProductById(id: number) {
    mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
      console.log("Base de datos conectada");
      model.productos.find({ id: id }, (error: any, docs: any) => {
        if (error) {
          throw new Error();
        }
        console.log(docs);
        mongoose.disconnect(() => {
          console.log("Base de datos desconectada");
        });
      });
    });
    const product = this.products.find((element) => element.id === id);
    console.log(product);
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
      ...product,
      id: this.count + 1,
      templateDate,
    });

    this.count++;

    mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
      console.log("Base de datos conectada");
      model.productos.insertMany(newProduct, (error: any, docs: any) => {
        if (error) {
          throw new Error();
        }
        console.log(docs);
        mongoose.disconnect(() => {
          console.log("Base de datos desconectada");
        });
      });
    });
  }

  updateProduct(product: any, id: number) {
    let index = this.products.findIndex((element) => element.id === id);
    this.products[index] = product;

    mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
      console.log("Base de datos conectada");
      model.productos.update(
        { id: id },
        {
          $set: {
            id: product.id,
            templateDate: product.templateDate,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            stock: product.stock,
            thumbnail: product.thumbnail,
          },
        },
        (error: any, docs: any) => {
          if (error) {
            throw new Error();
          }
          console.log(docs);
          mongoose.disconnect(() => {
            console.log("Base de datos desconectada");
          });
        }
      );
    });
  }

  deleteProduct(id: number): any {
    let index = this.products.findIndex((element) => element.id === id);
    this.products.splice(index, 1);

    mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
      console.log("Base de datos conectada");
      model.productos.deleteOne({ id: id }, (error: any, docs: any) => {
        if (error) {
          throw new Error();
        }
        console.log(docs);
        mongoose.disconnect(() => {
          console.log("Base de datos desconectada");
        });
      });
    });
  }
}