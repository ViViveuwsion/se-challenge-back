import { ProductCategory } from '../entities/product.entity';

export class CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: ProductCategory;
}
