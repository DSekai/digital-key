import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateCategoryDto } from './create-category.dto'
import { IsString } from 'class-validator'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    example: '5fe177c1-9ba6-4a8e-98b6-ceea03231b38',
    description: 'The UUID of the category',
    nullable: false,
  })
  @IsString()
  id: string
}
