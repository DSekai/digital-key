import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

export class isActiveCompanyDto {
  @ApiProperty({
    example: 'false',
    description: 'Is active company',
    nullable: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
