import { $Enums, PrismaClient, User } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany({})

  const amountOfUser = 50
  const rolesArray = Object.values($Enums.Role)
  const salt = parseInt(process.env.SALT_ROUNDS)
  const hashedPassword = await hash('testPsw@123', salt)

  const users: User[] = []

  for (let i = 0; i < amountOfUser; i++) {
    const id = faker.string.uuid()
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const Role = faker.helpers.arrayElement(rolesArray)

    const user: User = {
      id,
      username,
      password: hashedPassword,
      email,
      Role,
    }

    users.push(user)
  }

  const addusers = async () => await prisma.user.createMany({ data: users })

  addusers()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
