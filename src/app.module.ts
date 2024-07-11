import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { KeyModule } from './key/key.module'
import { CompanyModule } from './company/company.module'
import { PaymentModule } from './payment/payment.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    AuthModule,
    CategoryModule,
    KeyModule,
    CompanyModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
