import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { ProductRepository } from "./product.repository";
import FindProductUseCase from "../../../../usecase/product/find/find.product.usecase";
import Product from "../../../../domain/product/entity/product";

describe ("Test product repository using Sequelize", () => {
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

    it("should find a product", async() => {

        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);
        const product = new Product("123", "Product 1", "Description 1", 3, 20);
        
        await productRepository.create(product);

        const input = {
            id: "123"
        }

        const output = await usecase.execute(input);
        expect(output.id).toEqual(product.id);
        expect(output.name).toEqual(product.name);
        expect(output.description).toEqual(product.description);
        
    });
});