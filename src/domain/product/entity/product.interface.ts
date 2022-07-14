export default interface ProductInterface {
    get id(): string;
    get name(): string;
    get description(): string;
    get amount(): number;
    get price(): number;
  }