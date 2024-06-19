import { ConflictException, Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { PrismaService } from '../prisma/prisma.service'
import { handleErrorExceptions } from '../common/handleErrorsExcepcions'
import { hash } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAuthDto: CreateAuthDto) {
    const password = await hash(createAuthDto.password, parseInt(process.env.SALT_ROUNDS))
    createAuthDto.password = password
    try {
      const email = await this.findUserByEmail(createAuthDto.email)
      if (email) throw new ConflictException('Email already used')

      return this.prisma.user.create({
        data: createAuthDto,
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async findUserByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({
        where: { email },
        select: {
          username: true,
          email: true,
          Role: true,
        },
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  findAll() {
    return `This action returns all auth`
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`
  }

  remove(id: number) {
    return `This action removes a #${id} auth`
  }
}
