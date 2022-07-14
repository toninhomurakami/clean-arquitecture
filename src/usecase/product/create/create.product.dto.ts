export interface InputCreateProductDto {
    name: string;
    description: string;
    amount: number;
    price: number;
}

export interface OutputCreateProductDto {
    id: string;
    name: string;
    description: string;
    amount: number;
    price: number;
}