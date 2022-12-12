import { CoreOutput } from "./../../components/shared/types.d";
import AxiosClient from "../apiClient";
import { TeamState } from "../../components/team/types";

export const createTeam = async (state: TeamState): Promise<CoreOutput> => {
  const formData = new FormData();

  formData.append("leaderId", state.leaderId + "");
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
  formData.append("max_participant", state.max_participant + "");
  formData.append("categoryId", state.categoryId);
  formData.append("question", state.question);
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
    formData.append("femaleMinAge", state.femaleMaxAge + "");
  }
  if (state.price) {
    formData.append("price", state.price + "");
  }
  formData.append("leaderIntro", state.leaderIntro);
  formData.append("meeting_day", state.meeting_day + "");
  formData.append("meeting_hour", state.meeting_hour + "");
  if (state.areaIds) {
    for (let i = 0; i < state.areaIds.length; i++) {
      formData.append("areaIds", state.areaIds[i]!);
    }
  }
  if (state.activityTitles) {
    for (let i = 0; i < state.activityTitles.length; i++) {
      formData.append("activityTitles", state.activityTitles[i]!);
    }
  }
  if (state.activityDetails) {
    for (let i = 0; i < state.activityDetails.length; i++) {
      formData.append("activityDetails", state.activityDetails[i]!);
    }
  }
  if (state.mission) {
    for (let i = 0; i < state.mission.length; i++) {
      formData.append("mission", state.mission[i]!);
    }
  }
  const { data } = await AxiosClient.post<CoreOutput>("team/create", formData);
  return data;
};
