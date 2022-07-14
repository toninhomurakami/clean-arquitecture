import FindProductUseCase from "./find.product.usecase";

const product = {
    id: "123",
    name: "Product 1",
    description: "Description 1",
    amount: 3
};

const MockRepository = () => {
    return {
        create:  jest.fn(),
        update:  jest.fn(),
        find:    jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    }
}

describe ("Unit Test find product use case", () => {

    it("should find a product", async() => {

        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);
        
        await productRepository.create(product);

        const input = {
            id: "123"
        }

        const output = await usecase.execute(input);
        expect(output).toEqual(product);
        
    });
});