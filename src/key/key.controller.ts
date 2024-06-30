import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { KeyService } from './key.service'
import { CreateKeyDto } from './dto/create-key.dto'
import { UpdateKeyDto } from './dto/update-key.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorator'

@ApiTags('Key')
@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Post()
  @Auth('ADMIN', 'EMPLOYEE')
  create(@Body() createKeyDto: CreateKeyDto) {
    return this.keyService.create(createKeyDto)
  }

  @Get()
  findAll() {
    return this.keyService.findAll()
  }

  @ApiOperation({
    description: 'This endpoint is for update product',
  })
  @Get(':id')
  @Auth('ADMIN', 'EMPLOYEE')
  findOne(@Param('id') id: string) {
    return this.keyService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeyDto: UpdateKeyDto) {
    return this.keyService.update(+id, updateKeyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyService.remove(+id)
  }
}
