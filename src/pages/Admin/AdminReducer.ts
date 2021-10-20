import { CreatePlaceOutput } from "../../lib/api/types.d";
import moment from "moment";

export type CreatePlaceAction =
  | { type: "setName"; payload: string }
  | { type: "setIsLightning"; payload: boolean }
  | { type: "setLocation"; payload: string }
  | { type: "setMaxParticipantsNumber"; payload: number }
  | { type: "setReviewDescriptions"; payload: string[] }
  | { type: "setCoverImageURL"; payload: string }
  | { type: "setCoverImageFile"; payload: File }
  | { type: "setReviewImagesURL"; payload: string[] }
  | { type: "setReviewImagesFile"; payload: File[] };

export const createPlaceInitialState = {
  name: "미정",
  isLightning: false,
  maxParticipantsNumber: "4",
  location: "전체",
  oneLineIntroText: "미정",
  participationFee: "미정",
  recommendation: "미정",
  startDateAt: moment(),
  startTime: "4",
  title: "미정",
  description: "미정",
  categories: [],
  detailAddress: "미정",
  detailLink: "미정",
  reviewDescriptions: [],
  coverImageURL: "미정",
  coverImageFile: undefined,
  reviewImagesURL: [],
  reviewImagesFile: [],
};

export function reducer(
  state: CreatePlaceOutput,
  action: CreatePlaceAction
): CreatePlaceOutput {
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.payload,
      };

    default:
      throw new Error();
  }
}
