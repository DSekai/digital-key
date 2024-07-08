import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUrl, MinLength } from 'class-validator'

export class CreateCompanyDto {
  @ApiProperty({
    example: 'CD Digital',
    description: 'The name of the company',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'AV Margarita',
    description: 'The address of the company',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  address: string

  @ApiProperty({
    example: '+56961649685',
    description: 'The phone of the company',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(4)
  phone: string

  @ApiProperty({
    example: 'http://...',
    description: 'The url of the company logo',
    nullable: false,
    minLength: 4,
  })
  @IsString()
  @IsUrl()
  logo: string
}
