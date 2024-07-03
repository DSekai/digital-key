import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { KeyService } from './key.service'
import { CreateKeyDto } from './dto/create-key.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth, GetUser } from 'src/auth/decorator'
import { User } from 'src/auth/interfaces'
import { FindKeyUserDto } from './dto/relation-key-user.dto'

@ApiTags('Key')
@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @ApiOperation({
    description: 'This endpoint is for create many keys',
  })
  @Post()
  @Auth('ADMIN', 'EMPLOYEE')
  create(@Body() createKeyDto: CreateKeyDto) {
    return this.keyService.create(createKeyDto)
  }

  @ApiOperation({
    description: 'This endpoint is for pusharsed key',
  })
  @Post('buy')
  @Auth()
  BuyKey(@GetUser() user: User) {
    return this.keyService.keyPusharsed(user)
  }

  @ApiOperation({
    description: 'This endpoint retrieves the total count of keys for all products',
  })
  @Get('count-keys')
  @Auth('ADMIN', 'EMPLOYEE')
  findAll() {
    return this.keyService.findAll()
  }

  @ApiOperation({
    description: 'This endpoint is for finding the relationship between the key and the user.',
  })
  @Get('isOwner')
  @Auth('ADMIN', 'EMPLOYEE')
  keyUserRelation(@Query() findKeyUserDto: FindKeyUserDto) {
    return this.keyService.isOwner(findKeyUserDto)
  }

  @ApiOperation({
    description: 'This endpoint is for update product',
  })
  @Get(':id')
  @Auth('ADMIN', 'EMPLOYEE')
  findOne(@Param('id') id: string) {
    return this.keyService.findOne(id)
  }

  @ApiOperation({
    description: 'This endpoint is for update the propertie isUsed of a key',
  })
  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @GetUser() user: User) {
    return this.keyService.isUsed(id, user)
  }

  @ApiOperation({
    description: 'This endpoint is for refund product',
  })
  @Delete()
  @Auth('ADMIN', 'EMPLOYEE')
  remove(@Query() findKeyUserDto: FindKeyUserDto) {
    return this.keyService.refaund(findKeyUserDto)
  }
}
