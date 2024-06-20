import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { ApiOperation } from '@nestjs/swagger'
import { LoginAuthDto } from './dto/login-auth.dto'
import { Response } from 'express'

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
    const user = await this.authService.login(loginAuthDto)

    return res
      .cookie('acces_token', user.token, {
        httpOnly: true,
        secure: process.env.LAUNCH === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,
      })
      .send(user)
  }
  @Get()
  findAll() {
    return this.authService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id)
  }
}
