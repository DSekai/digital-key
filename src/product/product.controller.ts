import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorator'
import { UpdateProductDto } from './dto/update-product.dto'

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    description: 'This endpoint is for create new users',
  })
  @Post()
  @Auth('ADMIN', 'CLIENT')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @Get()
  findAll() {
    return this.productService.findAll()
  }

  @Get(':product')
  findOne(@Param('product') product: string) {
    return this.productService.findOne(product)
  }

  @ApiOperation({
    description: 'This endpoint is for update product',
  })
  @Patch()
  @Auth('ADMIN', 'EMPLOYEE')
  update(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id)
  }
}
