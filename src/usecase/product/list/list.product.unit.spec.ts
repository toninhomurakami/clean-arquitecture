import ProductFactory from "../../../domain/product/factory/product.factory";
import { ListProductUseCase } from "./list.product.usecase";

const product1 = ProductFactory.create("Product 1", "Description 1", 30, 20);
const product2 = ProductFactory.create("Product 2", "Description 2", 17, 31);

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
      create: jest.fn(),
      update: jest.fn(),
    }
}

describe("Unit test list product use case", () => {

    it("should list products", async () => {
        const repository = MockRepository();
        const listProductUsecase = new ListProductUseCase(repository);

        const output = await listProductUsecase.execute({});

        expect(output.products.length).toBe(2);
    });
});