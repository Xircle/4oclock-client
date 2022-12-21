import { CreateTeamOutput } from "./../api/types.d";
import { CoreOutput } from "./../../components/shared/types.d";
import AxiosClient from "../apiClient";
import { TeamState } from "../../components/team/types";

export const createTeam = async (
  state: TeamState,
): Promise<CreateTeamOutput> => {
  console.log(state);
  const formData = new FormData();
  formData.append("name", state.name);
  if (state.images) {
    for (let i = 0; i < state.images.length; i++) {
      formData.append("images", state.images[i]!);
    }
  }
  formData.append("season", state.season + "");
  if (state.startDate) {
    formData.append("startDate", state.startDate);
  }
  if (state.endDate) {
    formData.append("endDate", state.endDate);
  }
  formData.append("maxParticipant", state.max_participant + "");
  formData.append("category_id", state.categoryId);
  if (state.question) formData.append("question", state.question);
  if (state.maleMinAge) {
    formData.append("maleMinAge", state.maleMinAge + "");
  }
  if (state.maleMaxAge) {
    formData.append("maleMaxAge", state.maleMaxAge + "");
  }
  if (state.femaleMinAge) {
    formData.append("femaleMinAge", state.femaleMinAge + "");
  }
  if (state.femaleMaxAge) {
    formData.append("femaleMaxAge", state.femaleMaxAge + "");
  }
  if (state.price) {
    formData.append("price", state.price + "");
  }
  formData.append("leaderIntro", state.leaderIntro);
  formData.append("meetingDay", state.meeting_day + "");
  formData.append("meetingHour", state.meeting_hour + "");
  if (state.areaIds) {
    for (let i = 0; i < state.areaIds.length; i++) {
      formData.append("areaIds", state.areaIds[i]!);
    }
  }
  if (state.activityTitles) {
    for (let i = 0; i < state.activityTitles.length; i++) {
      formData.append("activity_titles", state.activityTitles[i]!);
    }
    formData.append("activity_titles", "");
  }
  if (state.activityDetails) {
    for (let i = 0; i < state.activityDetails.length; i++) {
      formData.append("activity_details", state.activityDetails[i]!);
    }
    formData.append("activity_details", "");
  }
  if (state.mission) {
    formData.append("mission", state.mission);
  }
  if (state.description) {
    formData.append("description", state.description);
  }

  formData.append("oneLineInfo", state.oneLineInfo);

  const { data } = await AxiosClient.post<CoreOutput>("team/create", formData);
  return data;
};
