import { ProductModel } from './product.model';
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository";
import Product from '../../../../domain/product/entity/product';

export class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            description: entity.description,
            amount: entity.amount,
            price: entity.price,
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            description: entity.description,
            amount: entity.amount,
            price: entity.price,
            }, 
            { where: {
                id: entity.id
            }
        });
    }

    async find(id: string): Promise<Product> {
        let productModel: ProductModel;
        try {
            productModel = await ProductModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Product not found");
        }
        return new Product(productModel.id, 
            productModel.name, 
            productModel.description, 
            productModel.amount, 
            productModel.price);
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        
        const output = 
            productModels.map(productModel => 
                new Product(productModel.id,
                            productModel.name,
                            productModel.description,
                            productModel.amount,
                            productModel.price));
        return output;
    }

}