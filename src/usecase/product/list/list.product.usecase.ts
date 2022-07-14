import { ProductRepositoryInterface } from '../../../domain/product/repository/product-repository';
import { InputListProductDto, OutputListProductDto } from './list.product.dto';

export class ListProductUseCase {

    private repository: ProductRepositoryInterface;
    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const output = await this.repository.findAll();
        
        return
        output.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            amount: product.amount,
            price: product.price,
        }));
    }
}