import styled from "styled-components";
import { AuthState, AuthAction } from "./types";
import { useEffect, useState } from "react";
import {
  ContainerwithLeftRightMargin,
  Heading,
  colors,
  Label,
  BigTextArea,
  NextButton,
  SubText,
} from "../../styles/styles";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthProfileDetailData({
  onNext,
  state,
  dispatch,
}: Props) {
  const [drinkingStyle, SetDrinkingStyle] = useState<number>(
    state.drinkingStyle,
  );
  function Validate(
    MBTI: string = state.MBTI,
    personality: string = state.personality,
    drinkingStyle: number = state.drinkingStyle,
  ): void {
    if (
      MBTI !== "" &&
      MBTI !== "MBTI" &&
      personality !== "" &&
      drinkingStyle !== -1
    ) {
      dispatch({ type: "setStage3Valid", payload: true });
    } else {
      dispatch({ type: "setStage3Valid", payload: false });
    }
  }
  return (
    <ContainerwithLeftRightMargin>
      <Heading>회원님을 조금만 더 알려주세요!</Heading>
      <SubText style={{ lineHeight: "20px", marginTop: "12px" }}>
        자세히 알려주실수록 더 잘 맞는 친구와 모임을 주선해드릴 수 있어요
      </SubText>
      <form>
        <SubContainer>
          <Label>나의 성격 {"&"} 스타일</Label>
          <select
            id=""
            name="MBTI"
            value={state.MBTI}
            style={{ marginTop: "12px", color: colors.Black, width: 301 }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch({
                type: "setMBTI",
                payload: e.target.value,
              });
              Validate(e.target.value);
            }}
          >
            <option value="" style={{ color: colors.BareGray }}>
              MBTI
            </option>
            <option value="ISFP" style={{ color: colors.Black }}>
              ISFP (호기심 많은 예술가)
            </option>
            <option value="ISFJ" style={{ color: colors.Black }}>
              ISFJ (용감한 수호자)
            </option>
            <option value="ISTP" style={{ color: colors.Black }}>
              ISTP (만능재주꾼)
            </option>
            <option value="ISTJ" style={{ color: colors.Black }}>
              ISTJ (청렴결백 논리주의자)
            </option>
            <option value="INFP" style={{ color: colors.Black }}>
              INFP (열정적인 중재자)
            </option>
            <option value="INFJ" style={{ color: colors.Black }}>
              INFJ (선의의 옹호자)
            </option>
            <option value="INTP" style={{ color: colors.Black }}>
              INTP (논리적 사색가)
            </option>
            <option value="INTJ" style={{ color: colors.Black }}>
              INTJ (용의주도한 전략가)
            </option>
            <option value="ESFP" style={{ color: colors.Black }}>
              ESFP (자유영혼 연예인)
            </option>
            <option value="ESFJ" style={{ color: colors.Black }}>
              ESFJ (사교적인 외교관)
            </option>
            <option value="ESTP" style={{ color: colors.Black }}>
              ESTP (모험을 즐기는 사업가)
            </option>
            <option value="ESTJ" style={{ color: colors.Black }}>
              ESTJ (엄격한 관리자)
            </option>
            <option value="ENFP" style={{ color: colors.Black }}>
              ENFP (재기발랄한 활동가)
            </option>
            <option value="ENFJ" style={{ color: colors.Black }}>
              ENFJ (정의로운 사회운동가)
            </option>
            <option value="ENTP" style={{ color: colors.Black }}>
              ENTP (논쟁을 즐기는 변론가)
            </option>
            <option value="ENTJ" style={{ color: colors.Black }}>
              ENTJ (대담한 통솔가)
            </option>
            <option value="모름" style={{ color: colors.Black }}>
              모름
            </option>
          </select>
          <SBigTextArea
            name="personality"
            value={state.personality}
            placeholder="ex. 친해지면 말 많아요 / 드립력 상 / 조용하고 이야기 잘 들어줘요 / 연락, 답장이 빨라요"
            style={{ fontSize: "12px", lineHeight: "18px" }}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              dispatch({ type: "setPersonality", payload: e.target.value });
              Validate(state.MBTI, e.target.value);
            }}
          />
        </SubContainer>
        <SubContainer>
          <Label>드링킹 스타일</Label>
          <SubSubContainer>
            <ChoiceSpan
              onClick={() => {
                dispatch({ type: "setDrinkingStyle", payload: 0 });
                SetDrinkingStyle(0);
                Validate(state.MBTI, state.personality, 0);
              }}
              style={
                drinkingStyle === 0
                  ? { borderColor: colors.StrongLime, color: colors.StrongLime }
                  : { borderColor: "#A7B0C0", color: "#A7B0C0" }
              }
            >
              안마셔요
            </ChoiceSpan>
            <ChoiceSpan
              onClick={() => {
                dispatch({ type: "setDrinkingStyle", payload: 1 });
                SetDrinkingStyle(1);
                Validate(state.MBTI, state.personality, 1);
              }}
              style={
                drinkingStyle === 1
                  ? { borderColor: colors.StrongLime, color: colors.StrongLime }
                  : { borderColor: "#A7B0C0", color: "#A7B0C0" }
              }
            >
              가끔
            </ChoiceSpan>
            <ChoiceSpan
              onClick={() => {
                dispatch({ type: "setDrinkingStyle", payload: 2 });
                SetDrinkingStyle(2);
                Validate(state.MBTI, state.personality, 2);
              }}
              style={
                drinkingStyle === 2
                  ? { borderColor: colors.StrongLime, color: colors.StrongLime }
                  : { borderColor: "#A7B0C0", color: "#A7B0C0" }
              }
            >
              술은 분위기상
            </ChoiceSpan>
            <br />
            <ChoiceSpan
              onClick={() => {
                dispatch({ type: "setDrinkingStyle", payload: 3 });
                SetDrinkingStyle(3);
                Validate(state.MBTI, state.personality, 3);
              }}
              style={
                drinkingStyle === 3
                  ? { borderColor: colors.StrongLime, color: colors.StrongLime }
                  : { borderColor: "#A7B0C0", color: "#A7B0C0" }
              }
            >
              메뉴가 좋으면 못 참지!
            </ChoiceSpan>
            <ChoiceSpan
              onClick={() => {
                dispatch({ type: "setDrinkingStyle", payload: 4 });
                SetDrinkingStyle(4);
                Validate(state.MBTI, state.personality, 4);
              }}
              style={
                drinkingStyle === 4
                  ? { borderColor: colors.StrongLime, color: colors.StrongLime }
                  : { borderColor: "#A7B0C0", color: "#A7B0C0" }
              }
            >
              술은 동반자
            </ChoiceSpan>
          </SubSubContainer>
        </SubContainer>

        <NextButton
          type="submit"
          disabled={!state.stage3Valid}
          onClick={onNext}
        >
          가입하기
        </NextButton>
      </form>
    </ContainerwithLeftRightMargin>
  );
}

const ErrorMessage = styled.p`
  margin-top: 7px;
  font-size: 8px;
  margin-left: 5px;
  color: ${colors.StrongLime};
`;

const SubContainer = styled.div``;

const SubSubContainer = styled.div`
  margin-top: 22px;
`;

const ChoiceSpan = styled.span`
  border-radius: 25px;
  border: 1px solid ${colors.LightGray};
  font-size: 15px;
  padding: 5px 10px;
  margin-right: 20px;
  line-height: 40px;
  color: ${colors.LightGray};
  cursor: pointer;
  :hover {
    border-color: #35b2db;
    color: #35b2db;
  }
`;

const SBigTextArea = styled(BigTextArea)`
  height: 80px;
`;
