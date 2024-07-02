import { $Enums, Category, Keys, PrismaClient, Product, ProductCategory, User } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()
const salt = parseInt(process.env.SALT_ROUNDS)
const amount = 10

function getRandomElement(data: string[]) {
  const rnd = Math.random() * data.length
  const index = Math.floor(rnd)
  return data[index]
}

async function deleteData() {
  await prisma.user.deleteMany({})
  await prisma.productCategory.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.keys.deleteMany({})
  await prisma.product.deleteMany({})
}

async function users() {
  const amountOfUser = 50
  const rolesArray = Object.values($Enums.Role)
  // const salt = parseInt(process.env.SALT_ROUNDS)
  const hashedPassword = await hash('testPsw@123', salt)

  const data: User[] = []

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

    data.push(user)
  }

  const addusers = async () => await prisma.user.createMany({ data })

  await addusers()
}

async function category() {
  const data: Category[] = []

  for (let i = 0; i < amount; i++) {
    const id = faker.string.uuid()
    const category = faker.lorem.word()

    const Category: Category = {
      id,
      category,
    }

    data.push(Category)
  }

  const addCategories = async () => await prisma.category.createMany({ data })

  await addCategories()
}

async function product() {
  const data: Product[] = []

  for (let i = 0; i < amount; i++) {
    const id = faker.string.uuid()
    const name = faker.commerce.productName()
    const description = faker.commerce.productDescription()
    const price = parseInt(faker.commerce.price())
    const isActive = true

    const product: Product = {
      id,
      name,
      description,
      price,
      isActive,
    }

    data.push(product)
  }

  const addProducts = async () => await prisma.product.createMany({ data })

  await addProducts()
}

async function productCategory() {
  const categories = await prisma.category.findMany({ select: { id: true } })
  const products = await prisma.product.findMany({ select: { id: true } })

  const cat = categories.map((category) => category.id)
  const pro = products.map((product) => product.id)

  const data: ProductCategory[] = []

  for (let i = 0; i < amount; i++) {
    const categoryID = getRandomElement(cat)
    const productID = getRandomElement(pro)
    const id = faker.string.uuid()

    const ProductCategory: ProductCategory = {
      id,
      categoryID,
      productID,
    }
    data.push(ProductCategory)
  }

  const addproductCategory = async () => await prisma.productCategory.createMany({ data })

  await addproductCategory()
}

async function key() {
  const products = await prisma.product.findMany({ select: { id: true } })

  const pro = products.map((product) => product.id)

  const data: Keys[] = []

  for (let i = 0; i < amount; i++) {
    const id = faker.string.uuid()
    const keyUUID = faker.string.uuid()
    const productID = getRandomElement(pro)

    const key: Keys = {
      id,
      key: keyUUID,
      enable: true,
      isUsed: false,
      productID,
    }
    data.push(key)
  }

  const addKey = async () => await prisma.keys.createMany({ data })

  await addKey()
}
async function main() {
  await deleteData()
  await users()
  await category()
  await product()
  await productCategory()
  await key()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
