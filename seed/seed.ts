import { $Enums, Category, PrismaClient, Product, ProductCategory, User } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'

function getRandomElement(data: object[]) {
  const rnd = Math.random() * data.length
  const index = Math.floor(rnd)
  return data[index]
}

const prisma = new PrismaClient()
const salt = parseInt(process.env.SALT_ROUNDS)
const amount = 10

async function users() {
  await prisma.user.deleteMany({})

  const amountOfUser = 50
  const rolesArray = Object.values($Enums.Role)
  // const salt = parseInt(process.env.SALT_ROUNDS)
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

async function category() {
  await prisma.productCategory.deleteMany({})
  await prisma.category.deleteMany({})

  const amountOfCategory = 10

  const categories: Category[] = []

  for (let i = 0; i < amountOfCategory; i++) {
    const id = faker.string.uuid()
    const category = faker.lorem.word()

    const Category: Category = {
      id,
      category,
    }

    categories.push(Category)
  }

  const addCategories = async () => await prisma.category.createMany({ data: categories })

  addCategories()
}
async function product() {
  await prisma.product.deleteMany({})

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

  addProducts()
}

async function productCategory() {
  const categories = await prisma.category.findMany({ select: { id: true } })
  const products = await prisma.product.findMany({ select: { id: true } })
  console.log(categories)

  const data: ProductCategory[] = [] //todo intentar hacer el seed

  for (let i = 0; i < amount; i++) {
    const categoryID = getRandomElement(categories)
    const productID = getRandomElement(products)
    console.log(categoryID, productID)

    // const ProductCategory: ProductCategory = {
    //   categoryID
    // }

    // data.push(ProductCategory)
  }

  // const addproductCategory = async () => await prisma.productCategory.createMany({ data })

  // addproductCategory()
}
async function main() {
  await users()
  await category()
  await product()
  await productCategory()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
