// src/products/services/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // --- LÓGICA DE CREACIÓN ---
  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany({ where: { isActive: true } });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id, isActive: true },
    });
    if (!product) {
      throw new NotFoundException(`El producto con el ID #${id} no fue encontrado.`);
    }
    return product;
  }

  // --- LÓGICA DE ACTUALIZACIÓN ---
  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // Reutilizamos findOne para verificar que el producto existe
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  // --- LÓGICA DE ELIMINACIÓN (SOFT DELETE) ---
  async remove(id: number) {
    await this.findOne(id); // Verificamos que existe
    // En lugar de borrarlo, lo marcamos como inactivo
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }
}