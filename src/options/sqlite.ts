import path from "path";
const __dirname = path.resolve();

export const options_sqlite = {
  client: "sqlite3",
  connection: {
    filename: `${__dirname}/db/products.sqlite`,
  },
};