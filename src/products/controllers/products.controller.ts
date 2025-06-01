import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // --- ENDPOINT PÚBLICO PARA LISTAR TODOS LOS PRODUCTOS ---
  @Get()
  @ApiOperation({ summary: 'Obtener una lista de todos los productos activos' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente.' })
  findAll() {
    return this.productsService.findAll();
  }

  // --- ENDPOINT PÚBLICO PARA VER UN SOLO PRODUCTO POR SU ID ---
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiResponse({ status: 200, description: 'Producto obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado o inactivo.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    // El 'ParseIntPipe' valida que el 'id' de la URL sea un número entero.
    // Si no lo es, automáticamente devuelve un error 400 Bad Request.
    return this.productsService.findOne(id);
  }
}