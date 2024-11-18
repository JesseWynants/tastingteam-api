import { PartialType } from '@nestjs/swagger';
import { CreateScoreDto } from './create-score.dto';
import { ScoreEntity } from '../entities/score.entity';

export class UpdateScoreDto implements Partial<ScoreEntity> {
  score?: number;
  notes?: string;
}
