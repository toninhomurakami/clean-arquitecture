import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "./product";

describe("Unit Test to Product Domain", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Name", "Description", 17, 21);
        }).toThrowError("product: ID has invalid value");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("1", "", "Description", 17, 21);
        }).toThrowError("product: Name has invalid value");
    });

    it("should throw error when id and name are empty", () => {
        expect(() => {
            new Product("", "", "Description", 17, 21);
        }).toThrowError("product: ID has invalid value,product: Name has invalid value");
    });
});