import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

const inputCreate = ProductFactory.create("Teste Product", "Description", 17, 21);

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(inputCreate)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

describe("Unit test update product use case", () => {
    it("should update product", async () => {
        const repository = MockRepository();

        const createProductUsecase = new CreateProductUseCase(repository);
        const updateProductUsecase = new UpdateProductUseCase(repository);

        const product = await createProductUsecase.execute(inputCreate);
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