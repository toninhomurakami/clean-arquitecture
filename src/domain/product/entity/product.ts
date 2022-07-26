import supertest from "supertest";
import { validate } from "uuid";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {

    private _name: string;
    private _description: string;
    private _amount: number;
    private _price: number;

    constructor(id: string, name: string, description: string, amount: number, price: number) {
        super();
        super._id = id;
        this._name = name;
        this._description = description;
        this._amount = amount;
        this._price = price;
        this.validate();

        if (this.notification.hasErros()) {
            throw new NotificationError(this.notification.getErrors());
        }
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
        ProductValidatorFactory.create().validate(this);

        /** Validação abaixo utilizada anteriormente no inicio do desafio. */ 
        /*
        const context = "product";
        if (this.id == undefined || this.id == "") {
            this.notification.addError({context: context, message: "ID has invalid value"});
        }
        if (this._name == undefined || this._name == "") {
            this.notification.addError({context: context, message: "Name has invalid value"});
        }
        if (this._description == undefined || this._description == "") {
            this.notification.addError({context: context, message: "Description has invalid value"});
        }
        if (this._amount == undefined || this._amount <0 ) {
            this.notification.addError({context: context, message: "Amount has invalid value"});
        }
        if (this._price == undefined || this._price <0 ) {
            this.notification.addError({context: context, message: "Price has invalid value"});
        }
        */
    }
}