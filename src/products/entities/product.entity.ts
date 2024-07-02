import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

export enum ProductCategory {
  SNACKS = 'snacks',
  DRINKS = 'drinks',
  CANDY = 'candy',
  DRY_FOOD = 'dry_food',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @Column({
    type: 'enum',
    enum: ProductCategory,
    nullable: true,
  })
  category: ProductCategory;

  @OneToMany(() => Transaction, transaction => transaction.product)
  transactions: Transaction[];

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @Column({nullable:true})
  file: string;
}
