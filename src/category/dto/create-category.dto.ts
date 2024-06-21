import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Multiplayer',
    description: 'The name of the category',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  category: string
}
