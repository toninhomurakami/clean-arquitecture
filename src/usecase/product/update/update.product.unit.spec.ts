import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const input = ProductFactory.create("Teste Product", "Description", 17, 21);

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(input)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

describe("Unit test update product use case", () => {
    it("should update product", async () => {
        const repository = MockRepository();
        const updateProductUsecase = new UpdateProductUseCase(repository);
        const output = await updateProductUsecase.execute(input);

        expect(output).toEqual({
          id: expect.any(String),
          name: input.name,
          description: input.description,
          amount: input.amount,
          price: input.price
      });
        
    });
});