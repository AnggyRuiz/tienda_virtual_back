import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async createProduct(createProductDto: CreateProductDto): Promise<string> {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return "Producto Creado con Exito"
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async deleteProduct(id: number): Promise<string> {
    await this.productRepository.delete(id);
    return "Producto Eliminado con Exito"

  }
}
