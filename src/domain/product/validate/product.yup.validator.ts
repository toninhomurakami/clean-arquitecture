import ValidatorInterface from "../../@shared/validate/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<Product> {
    
    validate(entity: Product): void {
        try {
            yup.object()
            .shape({
                id:          yup.string().required("ID has invalid value"),
                name:        yup.string().required("Name has invalid value"),
                description: yup.string().required("Description has invalid value"),
                amount:      yup.string().required("Amount has invalid value"),
                price:       yup.string().required("Price has invalid value"),
            })
            .validateSync({
                id:          entity.id,
                name:        entity.name,
                description: entity.description,
                amount:      entity.amount,
                price:       entity.price,
            },
            { abortEarly: false, }
            )
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "product",
                    message: error,
                })
            })
        }

    }
    
}