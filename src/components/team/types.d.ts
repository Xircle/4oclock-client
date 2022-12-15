export interface TeamState {
  leaderId: string;
  name: string;
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
  description?: string;
}
export type TeamAction =
  | { type: "setLeaderId"; payload: string }
  | { type: "setName"; payload: string }
  | { type: "setImages"; payload: File[] }
  | { type: "setSeason"; payload: number }
  | { type: "setStartDate"; payload: string }
  | { type: "setEndDate"; payload: string }
  | { type: "setMax_participant"; payload: number }
  | { type: "setCategoryId"; payload: string }
  | { type: "setQuestion"; payload: string }
  | { type: "setMaleMinAge"; payload: number }
  | { type: "setMaleMaxAge"; payload: number }
  | { type: "setFemaleMinAge"; payload: number }
  | { type: "setFemaleMaxAge"; payload: number }
  | { type: "setPrice"; payload: number }
  | { type: "setLeaderIntro"; payload: string }
  | { type: "setMeeting_day"; payload: number }
  | { type: "setMeeting_hour"; payload: number }
  | { type: "setAreaIds"; payload: string[] }
  | { type: "setActivityTitles"; payload: string[] }
  | { type: "setActivityDetails"; payload: string[] }
  | { type: "setMission"; payload: string }
  | { type: "setDescription"; payload: string };
