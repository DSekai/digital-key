import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateKeyDto } from './dto/create-key.dto'
import { PrismaService } from '../prisma/prisma.service'
import { handleErrorExceptions } from 'src/common/handleErrorsExcepcions'
import { User } from '../auth/interfaces'
import { FindKeyUserDto } from './dto/relation-key-user.dto'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class KeyService {
  constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

  async create(createKeyDto: CreateKeyDto) {
    const successfulInserts = []
    const failedInserts = []

    const records = createKeyDto.keys

    for (const record of records) {
      try {
        await this.prisma.keys.create({
          data: record,
        })
        console.log(`Successfully inserted record: ${record.key}`)
        successfulInserts.push(record)
      } catch (error) {
        failedInserts.push({ record, error })
        // Continue to next record if one fails
        continue
      }
    }

    await this.prisma.$disconnect()

    return { successfulInserts, failedInserts }
  }

  async findAll() {
    const data = await this.prisma.keys.groupBy({
      by: ['productID'],
      where: {
        enable: true,
      },
      _count: {
        _all: true,
      },
    })

    const keys = data.map((data) => ({
      product: data.productID,
      count: data._count._all,
    }))
    return keys
  }

  async findOne(id: string) {
    const key = await this.prisma.keys
      .findUnique({
        where: { id },
        select: {
          isUsed: true,
          enable: true,
          product: { select: { name: true } },
        },
      })
      .catch((e) => handleErrorExceptions(e))

    if (!key) throw new NotFoundException('Key not found')

    return {
      product: key.product.name,
      isUsed: key.isUsed,
      enable: key.enable,
    }
  }

  async isOwner(findKeyUserDto: FindKeyUserDto) {
    const { id: userID } = await this.auth.findUserByEmail(findKeyUserDto.email)

    const isOwner = await this.prisma.userProduct
      .findFirst({
        where: {
          keyID: findKeyUserDto.keyID,
          userID,
        },
      })
      .catch((e) => handleErrorExceptions(e))

    if (!isOwner) throw new BadRequestException('Key not found')

    return isOwner
  }

  async isUsed(keyID: string, user: User) {
    const userData: FindKeyUserDto = {
      email: user.email,
      keyID,
    }

    await this.isOwner(userData)

    const { isUsed } = await this.findOne(keyID)
    if (isUsed === true) throw new BadRequestException('key already used')
    const { key } = await this.prisma.keys
      .update({
        where: {
          id: keyID,
        },
        data: {
          isUsed: !isUsed,
        },
      })
      .catch((e) => handleErrorExceptions(e))
    return { key }
  }

  async findKeyAvalible() {
    return await this.prisma.keys
      .findFirst({
        where: {
          enable: true,
        },
      })
      .catch((e) => handleErrorExceptions(e))
  }

  async updateKeyAvalible(id: string) {
    const { enable } = await this.findOne(id)

    return this.prisma.keys
      .update({
        where: {
          id,
        },
        data: {
          enable: !enable,
        },
      })
      .catch((e) => handleErrorExceptions(e))
  }

  async keyPusharsed(user: User) {
    try {
      const key = await this.prisma.$transaction(async (prisma) => {
        const key = await this.findKeyAvalible()

        if (!key) throw new BadRequestException('Sorry, this product is out of stock.')

        const keyUser = await prisma.userProduct.create({
          data: {
            keyID: key.id,
            userID: user.id,
          },
        })

        if (!keyUser) throw new ConflictException('Error with the key. Please contact support for assistance')

        await this.updateKeyAvalible(key.id)

        return {
          keyID: keyUser.keyID,
        }
      })

      return key
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async refaund(findKeyUserDto: FindKeyUserDto) {
    try {
      const refund = await this.prisma.$transaction(async (prisma) => {
        const { id: productOwnerID } = await this.isOwner(findKeyUserDto)

        const { isUsed } = await this.findOne(findKeyUserDto.keyID)

        if (isUsed) throw new BadRequestException('The key is already used')

        const { id: userID } = await this.auth.findUserByEmail(findKeyUserDto.email)

        await this.removeKeyUser(productOwnerID, userID)

        await prisma.keys.update({
          where: {
            id: findKeyUserDto.keyID,
          },
          data: {
            enable: true,
          },
        })

        return {
          message: 'Product is refunded',
        }
      })

      return refund
    } catch (error) {
      handleErrorExceptions(error)
    }
  }

  async removeKeyUser(productOwnerID: string, userID: string) {
    return this.prisma.userProduct
      .delete({
        where: {
          id: productOwnerID,
          userID,
        },
      })
      .catch((e) => {
        handleErrorExceptions(e)
        throw e
      })
  }
}
