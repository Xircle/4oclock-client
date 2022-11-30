import { AdminPlaceOutput } from "../../../lib/api/types";
import moment from "moment";

export type AdminPlaceAction =
  | { type: "setName"; payload: string }
  | { type: "setIsLightning"; payload: boolean }
  | { type: "setLocation"; payload: string }
  | { type: "setMaxParticipantsNumber"; payload: string }
  | { type: "setOneLineIntroText"; payload: string }
  | { type: "setParticipationFee"; payload: string }
  | { type: "setRecommendation"; payload: string }
  | { type: "setStartDateAt"; payload: Date }
  | { type: "setStartTime"; payload: string }
  | { type: "setTitle"; payload: string }
  | { type: "setDescription"; payload: string }
  | { type: "setCategories"; payload: string[] }
  | { type: "setDetailAddress"; payload: string }
  | { type: "setDetailLink"; payload: string }
  | { type: "setReviewDescriptions"; payload: string }
  | { type: "setCoverImageUrl"; payload: string }
  | { type: "setCoverImageFile"; payload: File }
  | { type: "setReviewImagesUrl"; payload: string[] }
  | { type: "setReviewImagesFile"; payload: File[] };

export const placeInitialState: AdminPlaceOutput = {
  name: "미정",
  isLightning: false,
  maxParticipantsNumber: "4",
  location: "전체",
  oneLineIntroText: "미정",
  participationFee: "1",
  recommendation: "미정",
  startDateAt: new Date(),
  startTime: "4",
  title: "미정",
  description: "미정",
  categories: [],
  detailAddress: "미정",
  detailLink: "미정",
  reviewDescription: "미정",
  coverImageUrl: "미정",
  coverImageFile: undefined,
  reviewImagesUrl: [],
  reviewImagesFile: [],
};

export function adminPlaceReducer(
  state: AdminPlaceOutput,
  action: AdminPlaceAction,
): AdminPlaceOutput {
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.payload,
      };
    case "setIsLightning":
      return {
        ...state,
        isLightning: action.payload,
      };
    case "setLocation":
      return {
        ...state,
        location: action.payload,
      };
    case "setMaxParticipantsNumber":
      return {
        ...state,
        maxParticipantsNumber: action.payload,
      };
    case "setOneLineIntroText":
      return {
        ...state,
        oneLineIntroText: action.payload,
      };
    case "setParticipationFee":
      return {
        ...state,
        participationFee: action.payload,
      };
    case "setRecommendation":
      return {
        ...state,
        recommendation: action.payload,
      };
    case "setStartDateAt":
      return {
        ...state,
        startDateAt: action.payload,
      };
    case "setStartTime":
      return {
        ...state,
        startTime: action.payload,
      };
    case "setTitle":
      return {
        ...state,
        title: action.payload,
      };
    case "setDescription":
      return {
        ...state,
        description: action.payload,
      };
    case "setCategories":
      return {
        ...state,
        categories: action.payload,
      };
    case "setDetailAddress":
      return {
        ...state,
        detailAddress: action.payload,
      };
    case "setDetailLink":
      return {
        ...state,
        detailLink: action.payload,
      };
    case "setReviewDescriptions":
      return {
        ...state,
        reviewDescription: action.payload,
      };
    case "setCoverImageUrl":
      return {
        ...state,
        coverImageUrl: action.payload,
      };
    case "setCoverImageFile":
      return {
        ...state,
        coverImageFile: action.payload,
      };
    case "setReviewImagesUrl":
      return {
        ...state,
        reviewImagesUrl: action.payload,
      };
    case "setReviewImagesFile":
      return {
        ...state,
        reviewImagesFile: action.payload,
      };

    default:
      throw new Error();
  }
}
