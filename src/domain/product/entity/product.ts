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

    changeName(name: string) {
        this._name = name;
    }
    changeDescription(description: string) {
        this._description = description;
    }
    changeAmount(amount: number) {
        this._amount = amount;
    }
    changePrice(price: number) {
        this._price = price;
    }
}