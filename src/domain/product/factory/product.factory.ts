import Product from "../entity/product";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
    public static create(name: string, description: string, amount: number, price: number) {
        return new Product(uuid(), name, description, amount, price);
    }
    
    public static createWithId(id: string, name: string, description: string, amount: number, price: number) {
        return new Product(id, name, description, amount, price);
    }
}