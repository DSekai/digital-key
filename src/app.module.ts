import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module'
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { KeyModule } from './key/key.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [ProductModule, AuthModule, CategoryModule, KeyModule, CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
