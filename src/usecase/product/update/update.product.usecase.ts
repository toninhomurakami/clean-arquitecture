import { InputUpdateProductDto, OutputUpdateProductDto } from './update.product.dto';
import { ProductRepositoryInterface } from './../../../domain/product/repository/product-repository';

export default class UpdateProductUseCase {

    private repository: ProductRepositoryInterface;
    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    public async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.repository.find(input.id);
        product.changeName(input.name);
        product.changeDescription(input.description);
        product.changeAmount(input.amount);
        product.changePrice(input.price);

        await this.repository.update(product);

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            amount: product.amount,
            price: product.price
        };
    }
}