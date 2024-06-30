import { Module } from '@nestjs/common'
import { KeyService } from './key.service'
import { KeyController } from './key.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { ProductModule } from 'src/product/product.module'

@Module({
  controllers: [KeyController],
  providers: [KeyService],
  imports: [PrismaModule, ProductModule],
})
export class KeyModule {}
