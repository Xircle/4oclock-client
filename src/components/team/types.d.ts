export interface TeamState {
  leaderId: string;
  images: File[];
  season: number;
  startDate?: string;
  endDate?: string;
  max_participant: number;
  categoryId: string;
  question: string;
  maleMinAge?: number;
  maleMaxAge?: number;
  femaleMinAge?: number;
  femaleMaxAge?: number;
  price?: number;
  leaderIntro: string;
  meeting_day: number;
  meeting_hour: number;
  areaIds: string[];
  activityTitles: string[];
  activityDetails?: string[];
  mission?: string;
}
export type TeamAction =
  | { type: "leaderId"; payload: string }
  | { type: "images"; payload: File[] }
  | { type: "season"; payload: number }
  | { type: "startDate"; payload: string }
  | { type: "endDate"; payload: string }
  | { type: "max_participant"; payload: number }
  | { type: "categoryId"; payload: string }
  | { type: "question"; payload: string }
  | { type: "maleMinAge"; payload: number }
  | { type: "maleMaxAge"; payload: number }
  | { type: " femaleMinAge"; payload: number }
  | { type: "femaleMaxAge"; payload: number }
  | { type: " price"; payload: number }
  | { type: " leaderIntro"; payload: string }
  | { type: " meeting_day"; payload: number }
  | { type: " meeting_hour"; payload: number }
  | { type: " areaIds"; payload: string[] }
  | { type: " activityTitles"; payload: string[] }
  | { type: " activityDetails"; payload: string[] }
  | { type: " mission"; payload: string };
