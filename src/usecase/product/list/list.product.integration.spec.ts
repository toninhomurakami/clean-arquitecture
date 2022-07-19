import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Integration test list product use case", () => {
    let sequelize: Sequelize;
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
        
        const createProductUsecase = new CreateProductUseCase(productRepository);
        await createProductUsecase.execute( ProductFactory.create("Product 1", "Description 1", 30, 20) );
        await createProductUsecase.execute( ProductFactory.create("Product 2", "Description 2", 17, 31) );
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should list products", async () => {
        const listProductUsecase = new ListProductUseCase(productRepository);
        const output = await listProductUsecase.execute({});

        expect(output.products.length).toBe(2);
    });
});