import CreateProductUseCase from "./create.product.usecase";

const input = {
    id: "123",
    name: "Test Product",
    description: "Description 1",
    amount: 3,
    price: 20
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe("Unit test create product use case", () => {

    it("should create a product", async () => {
        const repository = MockRepository();
        const createProductUsecase = new CreateProductUseCase(repository);

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