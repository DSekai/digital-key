import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
// import { UpdateCategoryDto } from './dto/update-category.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorator'
import { UpdateCategoryDto } from './dto/update-category.dto'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    description: 'This endpoint is for Create new category',
  })
  @Post()
  @Auth('EMPLOYEE', 'ADMIN')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @ApiOperation({
    description: 'This endpoint is for find all category',
  })
  @Get('find-all')
  async findAll() {
    return await this.categoryService.findAll()
  }

  @ApiOperation({
    description: 'This endpoint is for find one category for ID',
  })
  @Get(':id')
  async findByID(@Param('id') id: string) {
    return await this.categoryService.findByID(id)
  }

  @ApiOperation({
    description: 'This endpoint is for delete one category for ID',
  })
  @Delete(':id')
  @Auth('ADMIN', 'EMPLOYEE')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id)
  }

  @ApiOperation({
    description: 'This endpoint is for update one category for ID',
  })
  @Patch()
  @Auth('ADMIN', 'EMPLOYEE')
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto)
  }
}
