import { PartialType } from '@nestjs/mapped-types'
import { CreateProductDto } from './create-product.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { UUID } from 'crypto'

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    example: 'Elden Ring',
    description: 'The name of the Product',
    nullable: false,
    minLength: 1,
  })
  @IsUUID()
  id: UUID
}
