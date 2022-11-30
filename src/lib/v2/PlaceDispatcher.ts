import { PlaceAction, placeInitialState } from "./PlaceReducer";

export interface existingPlace {
  coverImage?: string;
  name?: string;
  id: string;
  kakaoPlaceId?: string;
  maxParticipantsNumber?: number;
  detailAddress?: string;
  participationFee?: string;
  startDateAt?: string;
  activityType?: string;
  kakaoLink?: string;
  subImages?: string[];
  team?: string;
  recommendation?: string;
  description?: string;
  qAndA?: string[];
}

export const activityDispatcher = {
  dispatchMaxParticipants: (
    newNum: number,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    if (newNum >= 1)
      dispatch({
        type: "setMaxParticipantsNumber",
        payload: newNum,
      });
  },
  dispatchName: (text: string, dispatch: React.Dispatch<PlaceAction>) => {
    dispatch({
      type: "setName",
      payload: text,
    });
    dispatch({
      type: "setStage1Valid",
      payload: text.length > 2,
    });
  },
  dispatchKakaoLink: (link: string, dispatch: React.Dispatch<PlaceAction>) => {
    dispatch({
      type: "setKakaoLink",
      payload: link,
    });
  },
  dispatchDescription: (
    text: string,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({
      type: "setDescription",
      payload: text,
    });
  },
  dispatchRecommendation: (
    recommendation: string,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({
      type: "setRecommendation",
      payload: recommendation,
    });
  },
  dispatchParticipating: (
    participating: boolean,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({
      type: "setParticipating",
      payload: participating,
    });
  },
  dispatchDetailAddress: (
    placeName: string,
    placeId: string,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({
      type: "setDetailAddress",
      payload: placeName,
    });
    dispatch({ type: "setPlaceId", payload: placeId });
  },
  dispatchParticipationFee: (
    text: string,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({
      type: "setParticipationFee",
      payload: Number(text).toString(),
    });
  },
  dispatchStartDateAt: (date: Date, dispatch: React.Dispatch<PlaceAction>) => {
    dispatch({ type: "setStartDateAt", payload: date.toString() });
  },
  dispatchActivityType: (
    type: string,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({ type: "setActivityType", payload: type });
  },
  dispatchCoverImage: (
    // @ts-ignore
    file: File,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({ type: "setCoverImageFile", payload: file });
  },
  deleteExistingCoverImage: (dispatch: React.Dispatch<PlaceAction>) => {
    dispatch({ type: "setModifyCoverImageUrl", payload: undefined });
    dispatch({ type: "setIsCoverImageDeleted", payload: true });
  },
  dispatchSubImages: (
    // @ts-ignore
    oldFiles: File[],
    // @ts-ignore
    newFiles: File[],
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({ type: "setSubImagesFile", payload: oldFiles.concat(newFiles) });
  },
  removeExistingSubImage: (
    oldFiles: string[],
    toRomoveIndex: number,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    if (toRomoveIndex !== -1) {
      const temp = [...oldFiles];
      temp.splice(toRomoveIndex, 1);
      dispatch({
        type: "setModifySubImageUrls",
        payload: temp,
      });
    }
  },
  removeSubImagesByFile: (
    // @ts-ignore
    oldFiles: File[],
    // @ts-ignore
    fileToRemove: File,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    const toRomoveIndex = oldFiles.indexOf(fileToRemove);
    if (toRomoveIndex !== -1) {
      const temp = [...oldFiles];
      temp.splice(toRomoveIndex, 1);
      dispatch({
        type: "setSubImagesFile",
        payload: temp,
      });
    }
  },
  removeSubImagesByIndex: (
    // @ts-ignore
    oldFiles: File[],
    // @ts-ignore
    toRomoveIndex: number,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    if (toRomoveIndex !== -1) {
      const temp = [...oldFiles];
      temp.splice(toRomoveIndex, 1);
      dispatch({
        type: "setSubImagesFile",
        payload: temp,
      });
    }
  },
  dispatchStage1Valid: (
    // @ts-ignore
    bool: boolean,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({ type: "setStage1Valid", payload: bool });
  },
  dispatchTeamOnly: (bool: boolean, dispatch: React.Dispatch<PlaceAction>) => {
    dispatch({ type: "setTeamOnly", payload: bool });
  },
  dispatchInitialState: (dispatch: React.Dispatch<PlaceAction>) => {
    dispatch({ type: "setName", payload: placeInitialState.name });
    dispatch({
      type: "setMaxParticipantsNumber",
      payload: placeInitialState.maxParticipantsNumber,
    });
    dispatch({
      type: "setTeamOnly",
      payload: placeInitialState.teamOnly,
    });
    dispatch({
      type: "setParticipationFee",
      payload: placeInitialState.participationFee,
    });
    dispatch({
      type: "setStartDateAt",
      payload: placeInitialState.startDateAt,
    });
    dispatch({
      type: "setDescription",
      payload: placeInitialState.description,
    });
    dispatch({
      type: "setDetailAddress",
      payload: placeInitialState.detailAddress,
    });
    dispatch({
      type: "setCoverImageFile",
      payload: placeInitialState.coverImage,
    });
    dispatch({
      type: "setSubImagesFile",
      payload: placeInitialState.subImages,
    });
    dispatch({
      type: "setActivityType",
      payload: placeInitialState.activityType,
    });
    dispatch({
      type: "setKakaoLink",
      payload: placeInitialState.kakaoLink,
    });
    dispatch({
      type: "setRecommendation",
      payload: placeInitialState.recommendation,
    });
    dispatch({
      type: "setParticipating",
      payload: placeInitialState.participating,
    });
    dispatch({
      type: "setModify",
      payload: false,
    });
    dispatch({ type: "setStage1Valid", payload: false });
    dispatch({ type: "setIsFinished", payload: false });
    dispatch({
      type: "setQAndA",
      payload: placeInitialState.qAndA,
    });
  },
  dispatchExistingState: (
    loadedData: existingPlace,
    dispatch: React.Dispatch<PlaceAction>,
  ) => {
    dispatch({
      type: "setName",
      payload: loadedData.name || placeInitialState.name,
    });
    dispatch({
      type: "setTeamOnly",
      payload: loadedData.team ? true : false,
    });
    dispatch({
      type: "setMaxParticipantsNumber",
      payload:
        loadedData.maxParticipantsNumber ||
        placeInitialState.maxParticipantsNumber,
    });
    dispatch({
      type: "setParticipationFee",
      payload:
        loadedData.participationFee || placeInitialState.participationFee,
    });
    dispatch({
      type: "setStartDateAt",
      payload: loadedData.startDateAt || placeInitialState.startDateAt,
    });
    dispatch({
      type: "setDescription",
      payload: loadedData.description || placeInitialState.description,
    });
    dispatch({
      type: "setDetailAddress",
      payload: loadedData.detailAddress || placeInitialState.detailAddress,
    });
    dispatch({
      type: "setCoverImageFile",
      payload: placeInitialState.coverImage,
    });
    dispatch({
      type: "setSubImagesFile",
      payload: placeInitialState.subImages,
    });
    dispatch({
      type: "setActivityType",
      payload: loadedData.activityType || placeInitialState.activityType,
    });
    dispatch({
      type: "setKakaoLink",
      payload: loadedData.kakaoLink || placeInitialState.kakaoLink,
    });
    dispatch({
      type: "setRecommendation",
      payload: loadedData.recommendation || placeInitialState.recommendation,
    });
    dispatch({ type: "setPlaceId", payload: loadedData.kakaoPlaceId });
    dispatch({
      type: "setModifyPlaceId",
      payload: loadedData.id,
    });
    dispatch({
      type: "setModify",
      payload: true,
    });
    dispatch({ type: "setModifySubImageUrls", payload: loadedData.subImages });
    dispatch({
      type: "setModifyCoverImageUrl",
      payload: loadedData.coverImage,
    });
    dispatch({ type: "setStage1Valid", payload: true });
    dispatch({ type: "setIsFinished", payload: false });
    dispatch({ type: "setIsCoverImageDeleted", payload: false });
    dispatch({ type: "setQAndA", payload: loadedData.qAndA });
  },
  dispatchQAndA(questions: string[], dispatch: React.Dispatch<PlaceAction>) {
    dispatch({ type: "setQAndA", payload: questions });
  },
};
