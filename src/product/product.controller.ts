import { Controller, Get, Post, Body, Param, Patch, ParseUUIDPipe, Delete } from '@nestjs/common'
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
    description: 'This endpoint is for create new Product',
  })
  @Post()
  @Auth('ADMIN', 'CLIENT')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @ApiOperation({
    description: 'This endpoint is for search all Product',
  })
  @Get()
  findAll() {
    return this.productService.findAll()
  }

  @ApiOperation({
    description: 'This endpoint is for search Product',
  })
  @Get(':product')
  findOne(@Param('product') product: string) {
    return this.productService.findProductContain(product)
  }

  @ApiOperation({
    description: 'This endpoint is for update product',
  })
  @Patch()
  @Auth('ADMIN', 'EMPLOYEE')
  update(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto)
  }

  @ApiOperation({
    description: 'This enpoint is for update availability product',
  })
  @Patch(':id/active')
  @Auth('ADMIN', 'EMPLOYEE')
  async updateActive(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.updateActive(id)
  }

  @ApiOperation({
    description: 'This enpoint is for remove category of product',
  })
  @Delete(':id')
  @Auth('ADMIN', 'EMPLOYEE')
  async removeProductCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.removeProductCategory(id)
  }
}
