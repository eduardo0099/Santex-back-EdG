import { prisma } from '../../../../app';
import { Competition } from '@prisma/client';
import { CompetitionService } from '../competition.service';

export class CompetitionServiceImpl implements CompetitionService {
  async upsertCompetition(data: Competition): Promise<Competition> {
    const { name, code, areaName, externalId } = data;

    const competition = await prisma.competition.upsert({
      where: { externalId: externalId },
      update: {
        name,
        code,
        areaName: areaName,
      },
      create: {
        externalId: externalId,
        name,
        code,
        areaName: areaName,
      },
    });

    return competition;
  }
}
