import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WinesService } from './wines.service';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { WineEntity } from './entities/wine.entity';

@Controller('wines')
@ApiTags('Wines')
export class WinesController {
  constructor(private readonly winesService: WinesService) {}

  @Post()
  @ApiCreatedResponse({ type: WineEntity })
  create(@Body() createWineDto: CreateWineDto) {
    return this.winesService.create(createWineDto);
  }

  @Get()
  @ApiOkResponse({ type: [WineEntity] })
  findAll() {
    return this.winesService.findAll();
  }
  @Get('drafts')
  @ApiOkResponse({ type: [WineEntity] })
  findDrafts() {
    return this.winesService.findDrafts();
  }
  @Get(':id')
  @ApiOkResponse({ type: WineEntity })
  findOne(@Param('id') id: string) {
    return this.winesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: WineEntity })
  update(@Param('id') id: string, @Body() updateWineDto: UpdateWineDto) {
    return this.winesService.update(+id, updateWineDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WineEntity })
  remove(@Param('id') id: string) {
    return this.winesService.remove(+id);
  }
}
