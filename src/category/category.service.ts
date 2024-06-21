import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { handleErrorExceptions } from 'src/common/handleErrorsExcepcions'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    try {
      return this.prisma.category.create({
        data: createCategoryDto,
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  findAll() {
    return `This action returns all category`
  }

  findOne(id: number) {
    return `This action returns a #${id} category`
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`
  }

  remove(id: number) {
    return `This action removes a #${id} category`
  }
}
