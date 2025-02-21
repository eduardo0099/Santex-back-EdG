import { Competition } from '@prisma/client';

export interface CompetitionService {
  upsertCompetition(data: Competition): Promise<Competition>;
}
