import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // --- MÉTODO PARA LISTAR TODOS LOS PRODUCTOS ---
  async findAll() {
    // Buscamos todos los productos que estén activos en la base de datos
    return this.prisma.product.findMany({
      where: { isActive: true },
    });
  }

  // --- MÉTODO PARA VER UN SOLO PRODUCTO POR SU ID ---
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { 
        id: id,
        isActive: true, // Solo lo encontramos si está activo
      },
    });

    // Si no se encuentra ningún producto con ese ID, lanzamos un error 404
    if (!product) {
      throw new NotFoundException(`El producto con el ID #${id} no fue encontrado o no está activo.`);
    }

    return product;
  }

  // Los métodos de abajo los implementaremos cuando trabajemos en el panel de admin
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product (admin only)';
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product (admin only)`;
  }

  remove(id: number) {
    return `This action removes a #${id} product (admin only)`;
  }
}