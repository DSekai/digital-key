import { Injectable } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { handleErrorExceptions } from 'src/common/handleErrorsExcepcions'

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCompanyDto: CreateCompanyDto) {
    return await this.prisma.company
      .create({
        data: createCompanyDto,
      })
      .catch((e) => handleErrorExceptions(e))
  }

  async findCompany() {
    return await this.prisma.company.findFirst({}).catch((e) => handleErrorExceptions(e))
  }

  async update(updateCompanyDto: UpdateCompanyDto) {
    const { id } = await this.findCompany()
    const company = await this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    })
    company.isActive = undefined
    return company
  }

  async isActive() {
    const { id, isActive } = await this.findCompany()

    return await this.prisma.company.update({
      where: {
        id,
      },
      data: {
        isActive: !isActive,
      },
    })
  }
}
