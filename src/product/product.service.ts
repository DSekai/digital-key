import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { handleErrorExceptions } from '../common/handleErrorsExcepcions'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const exist = await this.findForName(createProductDto.name)
      if (exist) throw new ConflictException('Product name already exist')

      const product = await this.prisma.product.create({
        data: {
          description: createProductDto.description,
          name: createProductDto.name,
          price: createProductDto.price,
        },
      })

      await this.createProductCategory(createProductDto.categories, product.id)

      return { message: 'Product succesfully created' }
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async createProductCategory(categories: string[], productID: string) {
    const data = categories.map((categoryID) => ({
      categoryID,
      productID,
    }))

    await this.prisma.productCategory.createMany({
      data,
    })

    return true
  }

  async findAll() {
    return await this.prisma.product.findMany({}).catch((e) => handleErrorExceptions(e))
  }

  async findForName(name: string) {
    const product = await this.prisma.product
      .findFirst({
        where: {
          name,
        },
      })
      .catch((e) => {
        handleErrorExceptions(e)
      })
    if (!product) throw new NotFoundException('Product not found')
    return product
  }
  async findForID(id: string) {
    const product = await this.prisma.product
      .findFirst({
        where: {
          id,
        },
      })
      .catch((e) => {
        handleErrorExceptions(e)
      })
    if (!product) throw new NotFoundException('Product not found')
    return product
  }

  async findProductContain(name: string) {
    return await this.prisma.product
      .findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
      })
      .catch((e) => handleErrorExceptions(e))
  }

  async update(updateProductDto: UpdateProductDto) {
    return await this.prisma.product
      .update({
        where: {
          id: updateProductDto.id,
        },
        data: updateProductDto,
      })
      .catch((e) => handleErrorExceptions(e))
  }

  async updateActive(id: string) {
    const { isActive } = await this.findForID(id)

    return await this.prisma.product.update({
      where: { id },
      data: { isActive: !isActive },
    })
  }
}
