import { prisma } from '../../../../app';
import { Coach } from '@prisma/client';
import { CoachService } from '../coach.service';
import { CoachApiData } from '../../interfaces';

export class CoachServiceImpl implements CoachService {
  async upsertCoach(data: CoachApiData): Promise<Coach> {
    return prisma.coach.upsert({
      where: { externalId: data.id },
      update: {
        name: data.name,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        nationality: data.nationality,
      },
      create: {
        externalId: data.id,
        name: data.name,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        nationality: data.nationality,
      },
    });
  }
}
