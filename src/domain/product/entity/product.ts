import { validate } from "uuid";
import ProductInterface from "./product.interface";

export default class Product implements ProductInterface {

    private _id: string;
    private _name: string;
    private _description: string;
    private _amount: number;
    private _price: number;

    constructor(id: string, name: string, description: string, amount: number, price: number) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._amount = amount;
        this._price = price;
        this.validate();
    }

    get id(): string {
       return this._id;
    }
    get name(): string {
       return this._name;
    }
    get description(): string {
       return this._description;
    }
    get amount(): number {
        return this._amount;
    }
    get price(): number {
        return this._price;
    }

    changeBasicInfo(name: string, description: string) {
        this._name = name;
        this._description = description;

    }
    incrementStock(amount: number) {
        this._amount += amount;
    }
    decrementStock(amount: number) {
        if (this._amount - amount<0) {
            throw new Error(`There are not amount enougth for the product ${this._name} to decrement`);
        }
        this._amount -= amount;
    }
    
    changePrice(price: number) {
        if (price<=0) {
            throw new Error(`Invalid price value`);
        }
        this._price = price;
    }

    validate() {
        if (this._id == undefined ||
            this._name == undefined ||
            this._description == undefined ||
            this._amount == undefined ||
            this._price == undefined) {
            throw new Error("Product with invalid arguments");
        }
    }
}