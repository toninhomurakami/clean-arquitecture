import UpdateProductUseCase from "./update.product.usecase";

const input = {
    id: "123",
    name: "Test Product",
    description: "Description 1",
    amount: 3,
    price: 20
};

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

        expect(output).toEqual(input);
        
    });
});