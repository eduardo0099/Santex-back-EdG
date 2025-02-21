export interface TeamApiData {
  id: number;
  name: string;
  tla: string;
  shortName: string;
  area: { name: string };
  address?: string;
}
