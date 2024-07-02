import { Module } from '@nestjs/common'
import { KeyService } from './key.service'
import { KeyController } from './key.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [KeyController],
  providers: [KeyService],
  imports: [PrismaModule, AuthModule],
})
export class KeyModule {}
