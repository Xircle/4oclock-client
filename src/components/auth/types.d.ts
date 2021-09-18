export interface AuthState {
  uid: number;
  email: string;
  phoneNumber: string;
  age: string;
  gender: string;
  name: string;
  university: string;
  isGraduate: boolean;
  title: string;
  bio: string;
  location?: string;
  profileImgUrl?: string;
  profileImgFile?: File;
  agree1: boolean;
  agree2: boolean;
  agree3: boolean;
  agree4: boolean;
  agreeAll: boolean;
  stage1Valid: boolean;
  stage2Valid: boolean;
}
export type AuthAction =
  | { type: "setUid"; payload: number }
  | { type: "setEmail"; payload: string }
  | { type: "setPhoneNumber"; payload: string }
  | { type: "setAge"; payload: string }
  | { type: "setGender"; payload: string }
  | { type: "setName"; payload: string }
  | { type: "setUniversity"; payload: string }
  | { type: "setIsGraduate"; payload: boolean }
  | { type: "setTitle"; payload: string }
  | { type: "setBio"; payload: string }
  | { type: "setLocation"; payload: string }
  | { type: "setProfileImgUrl"; payload: string }
  | { type: "setProfileImgFile"; payload: File }
  | { type: "setAgree1"; payload: boolean }
  | { type: "setAgree2"; payload: boolean }
  | { type: "setAgree3"; payload: boolean }
  | { type: "setAgree4"; payload: boolean }
  | { type: "setAgreeAll"; payload: boolean }
  | { type: "setStage1Valid"; payload: boolean }
  | { type: "setStage2Valid"; payload: boolean };
