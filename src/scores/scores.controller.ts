import { Controller, Get, Post, Body, Patch, Param, Delete,NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Score } from 'src/generated/classes/score';
import { ScoreEntity } from './entities/score.entity';
import { NotFound } from '@aws-sdk/client-s3';


@Controller('scores')
@ApiTags('Scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateScoreDto })
  async create(@Body() createScoreDto: CreateScoreDto) {
    return new ScoreEntity(await this.scoresService.create(createScoreDto));
  }

  @Get()
  @ApiOkResponse({ type: [ScoreEntity] })
  async findAll() {
    const scores = await this.scoresService.findAll();
    return Array.isArray(scores) ? scores.map(score => new ScoreEntity(score)) : [];
  }

  @Get('wine/:wineId')
  @ApiOkResponse({ type: [ScoreEntity] })
  async findWineScores(@Param('wineId', ParseIntPipe) wineId: number) {
    const scores = await this.scoresService.findWineScores(wineId);
    return scores.map(score => new ScoreEntity(score));
  }

  @Get(':id')
  @ApiOkResponse({ type: ScoreEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const score = await this.scoresService.findOne(id);
    if (!score || typeof score === 'string') {
      throw new NotFoundException(`Score #${id} not found`);
    }
    return new ScoreEntity(score);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ScoreEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateScoreDto: UpdateScoreDto) {
    const score = await this.scoresService.update(id, updateScoreDto);
    if (!score || typeof score === 'string') {
      throw new NotFoundException(`Score #${id} not found`);
    }
    return new ScoreEntity(score);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ScoreEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const score = await this.scoresService.remove(id);
    if (!score || typeof score === 'string') {
      throw new NotFoundException(`Score #${id} not found`);
    }
    return new ScoreEntity(score);
  }
}
