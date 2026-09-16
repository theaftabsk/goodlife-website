import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlatformsModule } from './platforms/platforms.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    PrismaModule,
    PlatformsModule,
    BrandsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
