import styled from "styled-components";
import {
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  Heading,
  SubText,
  colors,
  MainBtn,
  MidInput,
  FlexDiv,
  GenderText,
  Label,
  BigTextArea,
  NextButtonDisabled,
  SpaceForNavBar,
  NextButtonEnabled,
} from "../../styles";
import {
  faCheckCircle,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { AuthState, AuthAction } from "./types";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthPage2({
  onNext,
  state,
  dispatch,
  ...props
}: Props) {
  const univs: string[] = [
    "고려대학교 재학",
    "고려대학교 졸업",
    "연세대학교 재학",
    "연세대학교 졸업",
  ];
  const [nameError, SetNameError] = useState<boolean>(false);
  const [univError, SetUnivError] = useState<boolean>(false);
  const [ageError, SetAgeError] = useState<boolean>(false);
  const [genderError, SetGenderError] = useState<boolean>(false);
  const [titleError, SetTitleError] = useState<boolean>(false);
  const [bioError, SetBioError] = useState<boolean>(false);

  const SetErrorAll = (param: boolean) => {
    SetNameError(param);
    SetUnivError(param);
    SetAgeError(param);
    SetGenderError(param);
    SetTitleError(param);
    SetBioError(param);
  };
  const errorMessages: string[] = [
    "20자 이하의 이름을 입력해주세요",
    "학교를 선택해주세요",
    "19 ~ 40 사이의 나이를 입력해주세요",
    "성별을 선택해주세요",
    "1자에서 8자 이내로 입력해주세요",
    "1자 이상의 자기소개를 입력해주세요",
  ];

  const CheckAge = (age: number) => {
    if (age >= 19 && age <= 40) {
      return true;
    }
    return false;
  };
  function Validate(
    univ: string = state.university,
    gender: string = state.gender
  ): void {
    if (state.name.length <= 0 || state.name.length > 20) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetNameError(true);
    } else if (!univs.includes(univ)) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetUnivError(true);
    } else if (!CheckAge(Number(state.age))) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetAgeError(true);
    } else if (gender !== "male" && gender !== "female") {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetGenderError(true);
    } else if (state.title.length === 0 || state.title.length > 8) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetTitleError(true);
    } else if (state.bio.length < 1) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetBioError(true);
    } else {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: true });
    }
  }

  return (
    <ContainerwithLeftRightMargin>
      <Heading>프로필 만들기</Heading>

      <form>
        <MidInput
          name="name"
          placeholder="Username"
          style={
            nameError
              ? { marginTop: "24px", borderColor: colors.Red }
              : { marginTop: "24px", borderColor: colors.BareGray }
          }
          type="text"
          value={state.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setName", payload: e.target.value })
          }
          onKeyUp={() => Validate()}
        />
        {nameError && <ErrorMessage>{errorMessages[0]}</ErrorMessage>}
        <select
          id=""
          name="University"
          value={state.university}
          style={
            univError
              ? { marginTop: "12px", borderColor: colors.Red }
              : { marginTop: "12px" }
          }
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: "setUniversity", payload: e.target.value });
            Validate(e.target.value);
          }}
        >
          <option value="" style={{ color: colors.BareGray }}>
            학교
          </option>
          <option value="고려대학교 재학" style={{ color: colors.Black }}>
            고려대학교 재학
          </option>
          <option value="고려대학교 졸업" style={{ color: colors.Black }}>
            고려대학교 졸업
          </option>
          <option value="연세대학교 재학" style={{ color: colors.Black }}>
            연세대학교 재학
          </option>
          <option value="연세대학교 졸업" style={{ color: colors.Black }}>
            연세대학교 졸업
          </option>
        </select>
        {univError && <ErrorMessage>{errorMessages[1]}</ErrorMessage>}
        <MidInput
          placeholder="나이"
          type="number"
          name="Age"
          style={
            ageError
              ? { marginTop: "12px", borderColor: colors.Red }
              : { marginTop: "12px" }
          }
          value={state.age}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setAge", payload: e.target.value })
          }
          onKeyUp={() => Validate()}
        ></MidInput>
        {ageError && <ErrorMessage>{errorMessages[2]}</ErrorMessage>}
        {/* <SubText>나이는 20초 20중 20후 30초 방식으로 표기가되요!</SubText> */}
        <FlexDiv style={{ justifyContent: "normal", marginTop: "20px" }}>
          <span
            style={{
              justifyContent: "normal",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch({ type: "setGender", payload: "male" });
              Validate(state.university, "male");
            }}
          >
            {state.gender === "male" ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                color={colors.MidBlue}
                size="lg"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircle}
                color={genderError ? colors.Red : colors.LightGray}
                size="lg"
              />
            )}
            <GenderText
              style={
                genderError
                  ? { marginLeft: "5px", color: colors.Red }
                  : { marginLeft: "5px" }
              }
            >
              남성
            </GenderText>
          </span>
          <span
            style={{
              justifyContent: "normal",
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
            onClick={() => {
              dispatch({ type: "setGender", payload: "female" });
              Validate(state.university, "female");
            }}
          >
            {state.gender === "female" ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                color={colors.MidBlue}
                size="lg"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircle}
                color={genderError ? colors.Red : colors.LightGray}
                size="lg"
              />
            )}
            <GenderText
              style={
                genderError
                  ? { marginLeft: "5px", color: colors.Red }
                  : { marginLeft: "5px" }
              }
            >
              여성
            </GenderText>
          </span>
        </FlexDiv>
        {genderError && <ErrorMessage>{errorMessages[3]}</ErrorMessage>}
        <Label>계열이나 직업을 적어주세요</Label>
        <MidInput
          name="title"
          placeholder="ex. 공대생 / 미개봉 새내기 / 디자이너"
          style={
            titleError
              ? { fontSize: "12px", borderColor: colors.Red }
              : { fontSize: "12px" }
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setTitle", payload: e.target.value })
          }
          value={state.title}
          onKeyUp={() => Validate()}
        />
        {titleError && <ErrorMessage>{errorMessages[4]}</ErrorMessage>}
        <Label>간단한 자기소개</Label>
        <BigTextArea
          name="bio"
          value={state.bio}
          placeholder="ex. 미대에 다니는 다양한 삶을 살고 싶어하는 미개봉화석^^
           요즘 스타트업에 관심이 생겨서 관련하신 분들과 이야기하면 좋을 것 같아요ㅎㅎ"
          style={
            bioError
              ? {
                  fontSize: "12px",
                  lineHeight: "18px",
                  borderColor: colors.Red,
                }
              : { fontSize: "12px", lineHeight: "18px" }
          }
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({ type: "setBio", payload: e.target.value })
          }
          onKeyUp={() => Validate()}
        />
        {bioError && <ErrorMessage>{errorMessages[5]}</ErrorMessage>}
      </form>
      <p
        style={{
          justifyContent: "end",
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          color: colors.MidGray,
          marginTop: "5px",
        }}
      >
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          color={colors.LightGray}
          size="lg"
          style={{ marginRight: "8px" }}
        />
        {state.location ? state.location : "대한민국 어딘가"}
      </p>
      <SpaceForNavBar></SpaceForNavBar>

      {state.stage2Valid ? (
        <NextButtonEnabled onClick={onNext}>다음</NextButtonEnabled>
      ) : (
        <NextButtonDisabled>다음</NextButtonDisabled>
      )}
    </ContainerwithLeftRightMargin>
  );
}

const ErrorMessage = styled.p`
  margin-top: 3px;
  font-size: 8px;
  margin-left: 5px;
  color: ${colors.Red};
`;
