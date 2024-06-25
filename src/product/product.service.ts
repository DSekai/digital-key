import { ConflictException, Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { handleErrorExceptions } from '../common/handleErrorsExcepcions'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const exist = await this.findOne(createProductDto.name)
      if (exist) throw new ConflictException('Product name already exist')

      return await this.prisma.product.create({
        data: {
          description: createProductDto.description,
          name: createProductDto.name,
          price: createProductDto.price,
          categoryID: createProductDto.categoryID,
        },
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  findAll() {
    return `This action returns all product`
  }

  async findOne(name: string) {
    return await this.prisma.product
      .findFirst({
        where: {
          name,
        },
      })
      .catch((e) => {
        handleErrorExceptions(e)
      })
  }

  update(updateProductDto: UpdateProductDto) {
    return this.prisma.product
      .update({
        where: {
          id: updateProductDto.id,
        },
        data: updateProductDto,
      })
      .catch((e) => handleErrorExceptions(e))
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
