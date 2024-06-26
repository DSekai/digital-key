import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({
    example: 'Elden Ring',
    description: 'The name of the Product',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'This game if top 3 best game the year',
    description: 'The description of the Product',
    minLength: 1,
  })
  @IsString()
  description: string

  @ApiProperty({
    example: '[c169f3fc-6870-4442-b7ce-66cdad11e8d2,c169f3fc-6870-4442-b7ce-66cdad11e8d2]',
    description: 'The UUID of the Category',
    nullable: false,
    minLength: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  categories: string[]

  @ApiProperty({
    example: 19.99,
    description: 'The price of the product',
    nullable: false,
  })
  @IsNumber()
  price: number
}
