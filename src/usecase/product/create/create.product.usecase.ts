import ProductFactory from "../../../domain/product/factory/product.factory";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {

    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(input.name,
            input.description, 
            input.amount, 
            input.price);

        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            amount: product.amount,
            price: product.price
        };
    }
}