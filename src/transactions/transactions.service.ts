import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { ProductsService } from '../products/products.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<{ transaction: Transaction, change: number }> {
    const { productId, amount } = createTransactionDto;
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.price > amount) {
      throw new Error('Insufficient funds');
    }
    if (product.stock <= 0) {
      throw new Error('Out of stock');
    }

    product.stock -= 1;
    await this.productsService.update(product.id, { stock: product.stock });

    const transaction = this.transactionsRepository.create({ amount, product });
    await this.transactionsRepository.save(transaction);

    const change = amount - product.price;

    return { transaction, change };
  }
}
