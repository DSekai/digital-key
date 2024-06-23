import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
// import { UpdateCategoryDto } from './dto/update-category.dto'
import { handleErrorExceptions } from 'src/common/handleErrorsExcepcions'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    await this.prisma.category
      .create({
        data: createCategoryDto,
      })
      .catch((e) => {
        handleErrorExceptions(e)
      })
  }

  async findAll() {
    return await this.prisma.category.findMany().catch((e) => handleErrorExceptions(e))
  }

  async findByID(id: string) {
    const category = await this.prisma.category
      .findUnique({
        where: { id },
      })
      .catch((error) => handleErrorExceptions(error))
    return category
  }

  async remove(id: string) {
    const exist = await this.findByID(id)
    if (!exist) throw new NotFoundException('Category not exist')
    await this.prisma.category.delete({
      where: { id },
    })

    return { message: 'Category succesfully deleted' }
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const exist = await this.findByID(updateCategoryDto.id)
    if (!exist) throw new NotFoundException('Category not exist')

    return this.prisma.category
      .update({
        where: { id: updateCategoryDto.id },
        data: updateCategoryDto,
      })
      .catch((e) => handleErrorExceptions(e))
  }
}
