import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe ("Integration Test find product use case", () => {
    let sequelize: Sequelize;
    let product: any;
    const productRepository = new ProductRepository();
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();

        product = await new CreateProductUseCase(productRepository).execute( ProductFactory.create("Product", "Description", 30, 20) );
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async() => {
        const input = {
            id: product.id
        }
        const usecase = new FindProductUseCase(productRepository);
        const output = await usecase.execute(input);
        expect(output).toEqual({
            id: product.id,
            name: product.name,
            description: product.description,
            amount: product.amount,
            price: product.price,
        });
        
    });
});