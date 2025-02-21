import { Coach } from '@prisma/client';
import { CoachApiData } from '../interfaces';

export interface CoachService {
  upsertCoach(data: CoachApiData): Promise<Coach>;
}
