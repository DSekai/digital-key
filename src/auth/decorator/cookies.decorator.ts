import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common'
import { verify } from 'jsonwebtoken'
import { handleErrorExceptions } from 'src/common/handleErrorsExcepcions'
import { User } from '../interfaces/user.interface'

export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()

  const token = data ? req.cookies?.[data] : req.cookies

  try {
    const tokenVerify = verify(token, process.env.SECRET_JWT_KEY)

    return tokenVerify
  } catch (error) {
    handleErrorExceptions(error)
  }
})
