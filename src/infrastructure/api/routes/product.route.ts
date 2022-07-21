import express, { Request, Response } from "express";
import { ProductRepository } from './../../product/repository/sequelize/product.repository';
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase( new ProductRepository() );
    try {
        const productDto = {
            name: req.body.name,
            description: req.body.description,
            amount: req.body.amount,
            price: req.body.price
        };

        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase( new ProductRepository() );
    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});