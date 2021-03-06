import { Option } from "react-dropdown";

export const CURRENT_USER = "CURRENT_USER";
export const POP_UP = "POP_UP";
export const CURRENT_PLACE = "CURRENT_PLACE";
export const BACKDROP_Z_INDEX = "100";
export const IS_YK_ONLY = "IS_YK_ONLY";
export const placeLocationoptions: Option[] = [
  {
    value: "전체",
    label: "전체 근처",
    className: "drop-down-option",
  },
  {
    value: "안암",
    label: "안암 근처",
    className: "drop-down-option",
  },
  {
    value: "신촌",
    label: "신촌 근처",
    className: "drop-down-option",
  },
];
