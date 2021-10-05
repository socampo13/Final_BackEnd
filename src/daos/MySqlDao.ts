import { IDao } from "../interface/daos/IDao";
import { options_mysql } from "../options/mysql";
const knex = require("knex")(options_mysql);

export class MySqlDao implements IDao {
  private products: Array<MySqlDao>;
  private count: number;
  public id: number;

  constructor() {
    this.products = [];
    this.id = 1;
    this.count = 1;

    (async () => {
      try {
        const tableName = "products";
        if (await knex.schema.hasTable(tableName)) {
          await knex.schema.dropTable(tableName);
        }

        await knex.schema
          .createTable("products", (table: any) => {
            table.increments("id"),
              table.date("timestamp"),
              table.string("title"),
              table.string("description"),
              table.integer("code"),
              table.float("price"),
              table.integer("stock"),
              table.string("thumbnail");
          })
          .then(() => console.log("Se ha creado la tabla correctamente"))
          .catch((err: any) =>
            console.log(
              "No se ha podido crear la tabla o la misma ya existe",
              err
            )
          );
      } catch (err) {
        console.log(err);
      }
    })();
  }

  getProducts(): any {
    let row: any = "";

    const tableName = "products";

    async () => {
      this.products = await knex
        .from("products")
        .select("*")
        .then((rows: any) => {
          for (row of rows) {
            console.log(`${row["id"]} ${row["title"]} ${row["price"]}`);
          }
        })
        .catch((err: any) => {
          console.log("Sin productos", err);
        });
    };

    return this.products;
  }

  getProductById(id: number) {
    let row: any = "";

    const product = knex
      .from("products")
      .select("*")
      .where("id", "=", id)
      .then((rows: any) => {
        for (row of rows) {
          console.log(`${row["id"]} ${row["title"]} ${row["price"]}`);
        }
      })
      .catch((err: any) => console.log("Ha ocurrido un error", err));

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

    this.count++;

    const productInsered = knex("products")
      .insert(product)
      .then(() => {
        console.log("Producto insertado");
        this.products.push(newProduct);
      })
      .catch((err: any) => {
        console.log("Ha ocurrido un error", err);
      });

    return productInsered;
  }

  updateProduct(product: any, id: number) {
    const date = new Date();
    const templateDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;

    async () => {
      await knex
        .from("products")
        .select("*")
        .where("id", "=", id)
        .then(() => {
          knex.update({
            timestamp: templateDate,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            stock: product.stock,
            thumbnail: product.thumbnail,
          });
          let index = this.products.findIndex((element) => element.id === id);
          this.products[index] = product;
          console.log("Producto actualizado");
        })
        .catch((err: any) => {
          console.log("Ha ocurrido un error", err);
        });
    };
  }

  deleteProduct(id: number): any {
    knex
      .from("products")
      .where("id", "=", id)
      .del()
      .then(() => {
        console.log("Producto borrado");
      })
      .catch((err: any) => {
        console.log("Ha ocurrido un error", err);
      });

    let index = this.products.findIndex((element) => element.id === id);
    this.products.splice(index, 1);
  }
}