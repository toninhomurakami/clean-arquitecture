import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

const input = {
    id: "123",
    name: "Test Product",
    description: "Description 1",
    amount: 3,
    price: 20
};

describe("Integration test create product use case", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
    const productRepository = new ProductRepository();

    it("should create a product", async () => {
        const createProductUsecase = new CreateProductUseCase(productRepository);
        const output = await createProductUsecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            description: input.description,
            amount: input.amount,
            price: input.price
        });
    });
});