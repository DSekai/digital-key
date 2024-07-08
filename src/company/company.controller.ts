import { Controller, Get, Post, Body, Patch } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorator'

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({
    description: 'This endpoint is for Create Company',
  })
  @Post()
  @Auth('ADMIN')
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.create(createCompanyDto)
  }

  @ApiOperation({
    description: 'This endpoint is for Request data of Company',
  })
  @Get()
  async findCompany() {
    return await this.companyService.findCompany()
  }

  @ApiOperation({
    description: 'This endpoint is for update service of Company',
  })
  @Auth('ADMIN')
  @Patch('isActive')
  async isActive() {
    return await this.companyService.isActive()
  }

  @ApiOperation({
    description: 'This endpoint is for Update Company',
  })
  @Auth('ADMIN', 'EMPLOYEE')
  @Patch()
  async update(@Body() updateCompanyDto: UpdateCompanyDto) {
    return await this.companyService.update(updateCompanyDto)
  }
}
