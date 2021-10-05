import { IDao } from "../interface/daos/IDao";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export class FileSystemDao implements IDao {
  private products: Array<FileSystemDao>;
  private count: number;
  public id: number;

  constructor() {
    this.products = [];
    this.id = 1;
    this.count = 1;
  }

  getProducts(): Array<FileSystemDao> {
    fs.readFile(`${__dirname}/db/filesystem.txt`, "utf8", (err, data) => {
      if (data) {
        console.log(data);
        return data;
      } else {
        console.log("Archivo vacio");
      }
    });

    return this.products;
  }

  getProductById(id: number) {
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

    fs.appendFile(
      `${__dirname}/db/filesystem.txt`,
      JSON.stringify(newProduct),
      (err) => {
        if (err) {
          console.log("Ha ocurrido un error al insertar el producto");
        } else {
          this.products.push({
            ...newProduct,
          });
          this.count++;
          console.log("Producto insertado correctamente");
        }
      }
    );
  }

  updateProduct(product: any, id: number) {
    let index = this.products.findIndex((element) => element.id === id);
    this.products[index] = product;

    fs.writeFile(`${__dirname}/db/filesystem.txt`, product, (err) => {
      if (err) {
        console.log("Ha ocurrido un error al actualizar");
      } else {
        console.log("Producto actualizado");
      }
    });
  }

  deleteProduct(id: number): any {
    let index = this.products.findIndex((element) => element.id === id);
    this.products.splice(index, 1);
  }
}