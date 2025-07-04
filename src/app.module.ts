import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule,
            UsersModule, 
            ProductsModule, 
            CategoriesModule, 
            OrdersModule, 
            CartModule, 
            AuthModule,
            ConfigModule.forRoot({
            isGlobal: true,}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
