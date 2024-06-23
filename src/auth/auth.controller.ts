import { Controller, Get, Post, Body, Res, Patch } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginAuthDto } from './dto/login-auth.dto'
import { Response } from 'express'
// import { Cookies } from './decorator/cookies.decorator'
import { User } from './interfaces/user.interface'
import { Auth, GetUser } from './decorator'
import { UpdateRoleAuthDto } from './dto/role-auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'This endpoint is for create new users',
  })
  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto)
  }

  @ApiOperation({
    description: 'This endpoint is for login users',
  })
  @Post('login')
  async login(@Res() res: Response, @Body() loginAuthDto: LoginAuthDto) {
    const { user, token } = await this.authService.login(loginAuthDto)

    return res
      .cookie('acces_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,
      })
      .send(user)
  }

  @ApiOperation({
    description: 'This enpoint is for update user Role',
  })
  @Patch('update-role')
  @Auth('ADMIN')
  async updateRole(@Body() updateRoleAuthDto: UpdateRoleAuthDto) {
    return await this.authService.updateRole(updateRoleAuthDto)
  }

  @Get()
  // findAll(@Cookies('acces_token') token: User) {
  @Auth()
  findAll(@GetUser() user: User) {
    // console.log(token)
    return { user, a: 'awebo' }

    // return this.authService.findAll()
  }
}
