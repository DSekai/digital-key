import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module'
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, AuthModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
