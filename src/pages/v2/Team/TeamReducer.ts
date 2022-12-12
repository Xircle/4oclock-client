import { TeamState, TeamAction } from "./../../../components/team/types.d";
export const teamInitialState = {
  leaderId: "",
  images: [],
  season: 6,
  max_participant: 20,
  categoryId: "",
  question: "",
  leaderIntro: "",
  meeting_day: 0,
  meeting_hour: 0,
  areaIds: [],
  activityTitles: [],
  activityDetails: [],
};

export function teamReducer(state: TeamState, action: TeamAction): TeamState {
  switch (action.type) {
    case "setLeaderId":
      return {
        ...state,
        leaderId: action.payload,
      };
    case "setImages":
      return {
        ...state,
        images: action.payload,
      };
    case "setSeason":
      return {
        ...state,
        season: action.payload,
      };
    case "setStartDate":
      return {
        ...state,
        startDate: action.payload,
      };
    case "setEndDate":
      return {
        ...state,
        endDate: action.payload,
      };
    case "setMax_participant":
      return {
        ...state,
        max_participant: action.payload,
      };
    case "setCategoryId":
      return {
        ...state,
        categoryId: action.payload,
      };
    case "setQuestion":
      return {
        ...state,
        question: action.payload,
      };
    case "setMaleMinAge":
      return {
        ...state,
        maleMinAge: action.payload,
      };
    case "setMaleMaxAge":
      return {
        ...state,
        maleMaxAge: action.payload,
      };
    case "setFemaleMinAge":
      return {
        ...state,
        femaleMinAge: action.payload,
      };
    case "setFemaleMaxAge":
      return {
        ...state,
        femaleMaxAge: action.payload,
      };
    case "setPrice":
      return {
        ...state,
        price: action.payload,
      };
    case "setLeaderIntro":
      return {
        ...state,
        leaderIntro: action.payload,
      };
    case "setMeeting_day":
      return {
        ...state,
        meeting_day: action.payload,
      };
    case "setMeeting_hour":
      return {
        ...state,
        meeting_hour: action.payload,
      };
    case "setAreaIds":
      return {
        ...state,
        areaIds: action.payload,
      };
    case "setActivityTitles":
      return {
        ...state,
        activityTitles: action.payload,
      };
    case "setActivityDetails":
      return {
        ...state,
        activityDetails: action.payload,
      };
    case "setMission":
      return {
        ...state,
        mission: action.payload,
      };
    default:
      throw new Error();
  }
}
