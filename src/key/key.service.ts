import { Injectable } from '@nestjs/common'
import { CreateKeyDto } from './dto/create-key.dto'
import { UpdateKeyDto } from './dto/update-key.dto'
import { PrismaService } from '../prisma/prisma.service'
import { ProductService } from 'src/product/product.service'

@Injectable()
export class KeyService {
  constructor(private readonly prisma: PrismaService, private readonly product: ProductService) {}

  async create(createKeyDto: CreateKeyDto) {
    const successfulInserts = []
    const failedInserts = []

    const records = createKeyDto.keys

    for (const record of records) {
      try {
        await this.prisma.keys.create({
          data: record,
        })
        console.log(`Successfully inserted record: ${record.key}`)
        successfulInserts.push(record)
      } catch (error) {
        failedInserts.push({ record, error })
        // Continue to next record if one fails
        continue
      }
    }

    await this.prisma.$disconnect()

    return { successfulInserts, failedInserts }
  }

  findAll() {
    return `This action returns all key`
  }

  async findOne(id: string) {
    const key = await this.prisma.keys.findUnique({
      where: { id },
      select: {
        isUsed: true,
        enable: true,
        product: { select: { name: true } },
      },
    })

    return {
      product: key.product.name,
      isUsed: key.isUsed,
      enable: key.enable,
    }
  }

  update(id: number, updateKeyDto: UpdateKeyDto) {
    return `This action updates a #${id} key`
  }

  remove(id: number) {
    return `This action removes a #${id} key`
  }
}
