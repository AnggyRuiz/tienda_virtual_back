import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })  // Descripción de la operación
  @ApiResponse({ status: 201, description: 'Productos creado con éxito' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const result = await this.productsService.createProduct(createProductDto);
    return { message: result };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los Productos' })
  @ApiResponse({ status: 200, description: 'Lista de Productos' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getProducts() {
    return this.productsService.findAll();
  }

  @Delete(':id')
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado con éxito' })
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') id: number) {
    const result = await this.productsService.deleteProduct(id);
    return { message: result };

  }
}
