import ValidatorInterface from "../../@shared/validate/validator.interface";
import Product from "../entity/product";
import ProductYupValidator from "../validate/product.yup.validator";

export default class ProductValidatorFactory {

    static create(): ValidatorInterface<Product> {
        return new ProductYupValidator();
    }
    
}