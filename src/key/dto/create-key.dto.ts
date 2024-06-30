import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class KeyDto {
  @ApiProperty({
    example: 'bdsDuakAK-dj12A',
    description: 'The key of the product',
    nullable: false,
  })
  @IsString()
  key: string

  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'The id of the product',
    nullable: false,
  })
  @IsString()
  productID: string
}

export class CreateKeyDto {
  @ApiProperty({
    type: [KeyDto],
    description: 'Array of product Keys',
    nullable: false,
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'The keys array should not be empty' })
  @ValidateNested({ each: true })
  @Type(() => KeyDto)
  keys: KeyDto[]
}
