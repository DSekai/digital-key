import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateAuthDto } from './create-auth.dto'
import { $Enums } from '@prisma/client'
import { IsEnum } from 'class-validator'

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @ApiProperty({
    example: 'CLIENT | ADMIN | EMPLOYEE',
    description: 'The role of the',
    nullable: false,
    minLength: 4,
  })
  @IsEnum($Enums.Role)
  role: $Enums.Role
}
