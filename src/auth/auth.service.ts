import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { PrismaService } from '../prisma/prisma.service'
import { handleErrorExceptions } from '../common/handleErrorsExcepcions'
import { compare, hash } from 'bcrypt'
import { LoginAuthDto } from './dto/login-auth.dto'
import { sign } from 'jsonwebtoken'

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
        // select: {
        //   username: true,
        //   email: true,
        //   Role: true,
        // },
      })
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.findUserByEmail(loginAuthDto.email)
      if (!user) throw new NotFoundException('User not Found')

      const password = await compare(loginAuthDto.password, user.password)
      if (!password) throw new BadRequestException('Invalid Credentials')

      const secret = process.env.SECRET_JWT_KEY
      const token = sign(
        {
          user,
        },
        secret,
        {
          expiresIn: '1h',
        }
      )
      return {
        user: {
          username: user.username,
          email: user.email,
          role: user.Role,
        },
        token,
      }
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
