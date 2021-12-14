import { Router } from "express";
import productsRouter from "./productsRouter";
import cartRouter from "./cartRoutes";
import usersRouter from "./userRoute";
import { LogIn } from "../middlewares/auth";
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import path from 'path';

const router = Router();

router.use('/products', LogIn, productsRouter);
router.use('/cart', cartRouter);
router.use('/', usersRouter);

const schema = buildSchema(`
    type Query {
        message: String,
        articles: [Article],
    },
    type Mutation {
        createArticle(title: String!, content: String!): Article
    },
    type Article {
        title: String,
        text: String,
        author: String,
    }
`);

const articles: { title: any; text: any; author: any; }[] = [];

function addArticle({ title, text, author }) {
    const article = { title, text, author };
    articles.push(article);
    return true;
}

const root = {
    message: () => 'Add article',
    articles: () => articles,
    addArticle,
}

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// GraphQL
app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/productos", productsRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default router;