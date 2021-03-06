import knex from 'knex';

export class SqliteDao{
    products: never[];
  id: number;
  count: number;
    constructor(){
         /* products = FileSystemDao;
        count = number;
        id = number; */

        this.products = [];
        this.id = 1;
        this.count = 1;

        (async () => {
            try{
                const tableName = "products";
                if(await knex.schema.hasTable(tableName)){
                    await knex.schema.dropTable(tableName);
                }
                await knex.schema
                    .createTable("products", (table: { increments: (arg0: string) => any; date: (arg0: string) => any; string: (arg0: string) => any; integer: (arg0: string) => any; float: (arg0: string) => any; }) => {
                        table.increments("id"),
                        table.date("timestamp"),
                        table.string("title"),
                        table.string("description"),
                        table.integer("code"),
                        table.float("price"),
                        table.integer("stock"),
                        table.string("thumbnail");
                    })
                    .then(() => console.log("Table created with success"))
                    .catch(() => 
                    console.log("error"))
            }catch(err){
                console.log(err);
            }
        })();
    }

    getProducts(){
        let row = "";
        const tableName = "products";

        async () => {
            this.products = knex
            .from("products")
            .select("*")
            .then((r
              row) => {
                for(row of row){
                  const newLocal = "id";
                  const newLocal_1 = "title";
                    console.log(`${row[newLocal]} ${row[newLocal_1]} ${row["price"]}`);
                }
            })
            .catch((err) => {
                console.log("No products", err);
            });
        };
        return this.products;
    }

    getProductById(id){
        let row = "";
        const product = knex
            .from("products")
            .select("*")
            .where("id", "=", id)
            .then((rows) => {
                for(row of rows){
                    console.log(`${row["id"]} ${row["title"]} ${row["price"]}`);
                }
            })
            .catch((err) => console.log("An error occurred", err));
            return product;
    }

    insertProduct(product){
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
            .catch((err) => {
              console.log("Ha ocurrido un error", err);
            });
      
          return productInsered;
    }

    updateProduct(product, id){
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
                let index = this.products.findIndex((element: { id: any; }) => element.id === id);
                this.products[index] = product;
                console.log("Producto actualizado");
              })
              .catch((err) => {
                console.log("Ha ocurrido un error", err);
              });
          };
    }

    deleteProduct(id){
        knex
      .from("products")
      .where("id", "=", id)
      .del()
      .then(() => {
        console.log("Producto borrado");
      })
      .catch((err) => {
        console.log("Ha ocurrido un error", err);
      });

    let index = this.products.findIndex((element) => element.id === id);
    this.products.splice(index, 1);
  }
    
}