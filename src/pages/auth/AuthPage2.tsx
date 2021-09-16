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
  const CheckAge = (age: number) => {
    if (age >= 19 && age <= 40) {
      return true;
    }
    return false;
  };
  const Validate = () => {
    if (state.name.length <= 0 || state.name.length > 20) {
      dispatch({ type: "setStage2Valid", payload: false });
    } else if (!univs.includes(state.university)) {
      dispatch({ type: "setStage2Valid", payload: false });
    } else if (!CheckAge(Number(state.age))) {
      dispatch({ type: "setStage2Valid", payload: false });
    } else if (state.gender !== "male" && state.gender !== "female") {
      dispatch({ type: "setStage2Valid", payload: false });
    } else if (state.title.length === 0 || state.title.length > 8) {
      dispatch({ type: "setStage2Valid", payload: false });
    } else if (state.bio.length < 1) {
      dispatch({ type: "setStage2Valid", payload: false });
    } else {
      dispatch({ type: "setStage2Valid", payload: true });
    }
  };

  return (
    <ContainerwithLeftRightMargin>
      <Heading>프로필 만들기</Heading>

      <form>
        <MidInput
          name="name"
          placeholder="Username"
          style={{ marginTop: "24px" }}
          type="text"
          value={state.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setName", payload: e.target.value })
          }
          onKeyUp={Validate}
        />
        <select
          id=""
          name="University"
          value={state.university}
          style={{ marginTop: "12px" }}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: "setUniversity", payload: e.target.value });
            Validate();
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
        <MidInput
          placeholder="나이"
          type="number"
          name="Age"
          style={{ marginTop: "12px" }}
          value={state.age}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setAge", payload: e.target.value })
          }
          onKeyUp={Validate}
        ></MidInput>
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
              Validate();
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
                color={colors.LightGray}
                size="lg"
              />
            )}
            <GenderText style={{ marginLeft: "5px" }}>남성</GenderText>
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
              Validate();
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
                color={colors.LightGray}
                size="lg"
              />
            )}
            <GenderText style={{ marginLeft: "5px" }}>여성</GenderText>
          </span>
        </FlexDiv>
        <Label>계열이나 직업을 적어주세요</Label>
        <MidInput
          name="title"
          placeholder="ex. 공대생 / 미개봉 새내기 / 디자이너"
          style={{ fontSize: "12px" }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setTitle", payload: e.target.value })
          }
          value={state.title}
          onKeyUp={Validate}
        />
        <Label>간단한 자기소개</Label>
        <BigTextArea
          name="bio"
          value={state.bio}
          placeholder="ex. 미대에 다니는 다양한 삶을 살고 싶어하는 미개봉화석^^
           요즘 스타트업에 관심이 생겨서 관련하신 분들과 이야기하면 좋을 것 같아요ㅎㅎ"
          style={{ fontSize: "12px", lineHeight: "18px" }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({ type: "setBio", payload: e.target.value })
          }
          onKeyUp={Validate}
        />
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
