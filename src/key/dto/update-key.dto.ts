import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class UpdateKeyDto {
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'The id of the product',
    nullable: false,
  })
  @IsString()
  id: string

  @ApiProperty({
    example: 'true',
    description: 'Is used the product',
    nullable: false,
  })
  @IsBoolean()
  isUsed: boolean
}
