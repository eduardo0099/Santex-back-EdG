interface Competition {
  id: number;
  name: string;
  code: string;
}

interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

interface CoachContract {
  start: string;
  until: string;
}

interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  contract: CoachContract;
}

interface SquadMember {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}

interface Team {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  address: string;
  coach: Coach;
  squad: SquadMember[];
}

export interface CompetitionResponseData {
  competition: Competition;
  teams: Team[];
}
