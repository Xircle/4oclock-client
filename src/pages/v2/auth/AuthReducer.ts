import { AuthAction, AuthState } from "../../../components/auth/types";

export const initialState = {
  uid: 0,
  email: "",
  phoneNumber: "",
  age: "",
  gender: "",
  name: "",
  university: "",
  title: "",
  bio: "",
  location: "",
  profileImgUrl: "",
  profileImgFile: undefined,
  agree1: false,
  agree2: false,
  agree3: false,
  agree4: false,
  agreeAll: false,
  stage1Valid: false,
  stage2Valid: false,
  stage3Valid: false,
  isGraduate: false,
  MBTI: "",
  personality: "",
  drinkingStyle: -1,
};

export function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "setUid":
      return {
        ...state,
        uid: action.payload,
      };
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setPhoneNumber":
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case "setAge":
      return {
        ...state,
        age: action.payload,
      };
    case "setGender":
      return {
        ...state,
        gender: action.payload,
      };
    case "setName":
      return {
        ...state,
        name: action.payload,
      };
    case "setUniversity":
      return {
        ...state,
        university: action.payload,
      };
    case "setTitle":
      return {
        ...state,
        title: action.payload,
      };
    case "setBio":
      return {
        ...state,
        bio: action.payload,
      };
    case "setLocation":
      return {
        ...state,
        location: action.payload,
      };
    case "setProfileImgUrl":
      return {
        ...state,
        profileImgUrl: action.payload,
      };
    case "setProfileImgFile":
      return {
        ...state,
        profileImgFile: action.payload,
      };
    case "setAgree1":
      if (action.payload === true) {
        return {
          ...state,
          agree1: action.payload,
        };
      } else {
        return {
          ...state,
          agree1: action.payload,
          agreeAll: false,
        };
      }
    case "setAgree2":
      if (action.payload === true) {
        return {
          ...state,
          agree2: action.payload,
        };
      } else {
        return {
          ...state,
          agree2: action.payload,
          agreeAll: false,
        };
      }
    case "setAgree3":
      if (action.payload === true) {
        return {
          ...state,
          agree3: action.payload,
        };
      } else {
        return {
          ...state,
          agree3: action.payload,
          agreeAll: false,
        };
      }
    case "setAgree4":
      if (action.payload === true) {
        return {
          ...state,
          agree4: action.payload,
        };
      } else {
        return {
          ...state,
          agree4: action.payload,
          agreeAll: false,
        };
      }

    case "setAgreeAll":
      return {
        ...state,
        agreeAll: action.payload,
        agree1: action.payload,
        agree2: action.payload,
        agree3: action.payload,
        agree4: action.payload,
      };
    case "setStage1Valid":
      return {
        ...state,
        stage1Valid: action.payload,
      };
    case "setStage2Valid":
      return {
        ...state,
        stage2Valid: action.payload,
      };
    case "setStage3Valid":
      return {
        ...state,
        stage3Valid: action.payload,
      };
    case "setIsGraduate":
      return {
        ...state,
        isGraduate: action.payload,
      };
    case "setMBTI":
      return {
        ...state,
        MBTI: action.payload,
      };
    case "setPersonality":
      return {
        ...state,
        personality: action.payload,
      };
    case "setDrinkingStyle":
      return {
        ...state,
        drinkingStyle: action.payload,
      };
    default:
      throw new Error();
  }
}
