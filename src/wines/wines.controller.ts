import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
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
  async create(@Body() createWineDto: CreateWineDto) {
    return new WineEntity(
      await this.winesService.create(createWineDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: [WineEntity] })
  async findAll() {
    const wines = await this.winesService.findAll();
    return wines.map((wine) => new WineEntity(wine));
  }
  @Get('drafts')
  @ApiOkResponse({ type: [WineEntity] })
  async findDrafts() {
    const drafts = await this.winesService.findDrafts();
    return drafts.map((draft) => new WineEntity(draft));
  }
  @Get(':id')
  @ApiOkResponse({ type: WineEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const wine = await this.winesService.findOne(+id);
    if (!wine) {
      throw new NotFoundException(`Wine #${id} not found`);
    }
    return new WineEntity(wine);
  }

  @Patch(':id')
  @ApiOkResponse({ type: WineEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateWineDto: UpdateWineDto) {
    return new WineEntity(await this.winesService.update(+id, updateWineDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: WineEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new WineEntity(await this.winesService.remove(+id));
  }
}
