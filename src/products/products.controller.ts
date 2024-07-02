import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProductDto: any,
    @UploadedFile() file: Express.MulterFile,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('alldata')
  async findAllData() {
    const products = await this.productsService.findAll();
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image: product.image ? product.image.toString('base64') : null
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Put(':id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.MulterFile,
  ) {
    return this.productsService.uploadImage(+id, file);
  }
}
