import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // --- ENDPOINT PROTEGIDO PARA CREAR PRODUCTOS (SOLO ADMIN) ---
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo producto (Solo para Admins)' })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  
  // -- Endpoints públicos (Corregidos y en orden) --
  
  // La ruta para listar todos los productos
  @Get()
  @ApiOperation({ summary: 'Obtener una lista de todos los productos activos' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente.'})
  findAll() {
    return this.productsService.findAll(); // <-- ESTA LÍNEA FALTABA
  }

  // La ruta con parámetro dinámico ':id' va DESPUÉS de las rutas GET más específicas.
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiResponse({ status: 200, description: 'Producto obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id); // <-- ESTA LÍNEA FALTABA
  }

  // --- ENDPOINT PROTEGIDO PARA ACTUALIZAR (SOLO ADMIN) ---
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un producto (Solo para Admins)' })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  // --- ENDPOINT PROTEGIDO PARA ELIMINAR (SOLO ADMIN) ---
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un producto (Solo para Admins)' })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}