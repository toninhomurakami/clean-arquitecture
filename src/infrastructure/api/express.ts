import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../product/repository/sequelize/product.model";
import { productRoute } from "./routes/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setubDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: true,
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
}
setubDb();

