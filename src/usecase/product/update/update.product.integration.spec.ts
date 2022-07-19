import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () => {
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

      product = await new CreateProductUseCase(productRepository).execute( ProductFactory.create("Teste Product", "Description", 17, 21) );
    });
  afterEach(async () => {
      await sequelize.close();
  });
    it("should update product", async () => {
        const updateProductUsecase = new UpdateProductUseCase(productRepository);

        const inputUpdate = ProductFactory.createWithId(product.id, "Product Updated", "Description Updated", 0, 28);
        const output = await updateProductUsecase.execute(inputUpdate);

        expect(output).toEqual({
          id: expect.any(String),
          name: inputUpdate.name,
          description: inputUpdate.description,
          amount: expect.any(Number),
          price: inputUpdate.price
        });
    });
});