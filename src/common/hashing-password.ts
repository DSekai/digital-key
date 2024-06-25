import { BadRequestException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

const SALT = process.env.SALT_ROUNDS

export const hashingPassword = async (password) => {
  return await hash(password, parseInt(SALT))
}

export const comparePasswordHashing = async (password, hashingPassowrd) => {
  const correctPassword = await compare(password, hashingPassowrd)
  if (!correctPassword) throw new BadRequestException('Invalid Credentials')

  return true
}
