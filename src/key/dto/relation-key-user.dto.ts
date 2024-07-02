import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsUUID } from 'class-validator'

export class FindKeyUserDto {
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'The id of the product',
    nullable: false,
  })
  @IsUUID()
  keyID: string

  @ApiProperty({
    example: 'test@test.com',
    description: 'The email of the user',
    nullable: false,
  })
  @IsEmail()
  email: string
}
