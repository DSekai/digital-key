import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { PrismaService } from '../prisma/prisma.service'
import { handleErrorExceptions } from '../common/handleErrorsExcepcions'
import { compare, hash } from 'bcrypt'
import { LoginAuthDto } from './dto/login-auth.dto'
import { sign } from 'jsonwebtoken'
import { UpdateRoleAuthDto } from './dto/role-auth.dto'

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
        select: { email: true },
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      })
      return user
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { password, id, ...user } = await this.findUserByEmail(loginAuthDto.email)
      if (!user) throw new NotFoundException('User not Found')

      const correctPassword = await compare(loginAuthDto.password, password)
      if (!correctPassword) throw new BadRequestException('Invalid Credentials')

      const secret = process.env.SECRET_JWT_KEY
      const token = sign(
        {
          id,
        },
        secret,
        {
          expiresIn: '1h',
        }
      )
      return {
        user: { ...user },
        token,
      }
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async updateRole(updateRoleAuthDto: UpdateRoleAuthDto) {
    try {
      const user = await this.findUserByEmail(updateRoleAuthDto.email)
      if (!user) throw new NotFoundException('User not Exist')

      return await this.prisma.user.update({
        where: {
          email: updateRoleAuthDto.email,
        },
        data: {
          Role: updateRoleAuthDto.Role,
        },
        select: {
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

  remove(id: number) {
    return `This action removes a #${id} auth`
  }
}
