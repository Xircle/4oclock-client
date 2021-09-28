import styled from "styled-components";
import * as links from "../shared/Links";
import {
  ContainerwithLeftRightMargin,
  Heading,
  SubText,
  colors,
  NextButton,
  SubTextSpan,
} from "../../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { AuthState, AuthAction } from "./types";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthPage4({ onNext, state, dispatch }: Props) {
  return (
    <ContainerwithLeftRightMargin>
      <Heading style={{ fontSize: "22px", lineHeight: "32px" }}>
        환영해요 {":)"}
        <br />
        아래 약관에 동의하시면 <br />
        맛있는 모임이 시작돼요!
      </Heading>
      <SubText style={{ lineHeight: "20px", marginTop: "13px" }}>
        친구들과 네시모여 모임 시작 전 필수 약관 내용에 먼저 <br />
        동의해주세요
      </SubText>
      <TextSpanDiv
        style={{ marginTop: "30px" }}
        onClick={() => {
          dispatch({ type: "setAgreeAll", payload: !state.agreeAll });
        }}
      >
        {state.agreeAll ? (
          <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
        ) : (
          <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
        )}

        <BlackTextSpan style={{ fontWeight: "bold", marginLeft: "10px" }}>
          전체 동의
        </BlackTextSpan>
        <SubTextSpan>
          {"("}선택 항목 포함{")"}
        </SubTextSpan>
      </TextSpanDiv>
      <TextSpanDiv>
        <span
          onClick={() => {
            dispatch({ type: "setAgree1", payload: !state.agree1 });
          }}
        >
          {state.agree1 ? (
            <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
          ) : (
            <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
          )}
          <BlackTextSpan style={{ marginLeft: "10px" }}>
            네시모여 이용약관
          </BlackTextSpan>
          <BlueTextSpan>
            {"("}필수{")"}
          </BlueTextSpan>
        </span>
        <a href={links.LServiceAgree} target={"_blank"}>
          <span style={{ position: "absolute", right: "0%" }}>
            <FontAwesomeIcon icon={faChevronRight} color={colors.LightGray} />
          </span>
        </a>
      </TextSpanDiv>
      <TextSpanDiv>
        <span
          onClick={() => {
            dispatch({ type: "setAgree2", payload: !state.agree2 });
          }}
        >
          {state.agree2 ? (
            <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
          ) : (
            <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
          )}
          <BlackTextSpan style={{ marginLeft: "10px" }}>
            네시모해 개인정보 수집 및 이용동의
          </BlackTextSpan>
          <BlueTextSpan>
            {"("}필수{")"}
          </BlueTextSpan>
        </span>
        <a href={links.LPrivacyAgree} target={"_blank"}>
          <span style={{ position: "absolute", right: "0%" }}>
            <FontAwesomeIcon icon={faChevronRight} color={colors.LightGray} />
          </span>
        </a>
      </TextSpanDiv>
      <TextSpanDiv>
        <span
          onClick={() => {
            dispatch({ type: "setAgree3", payload: !state.agree3 });
          }}
        >
          {state.agree3 ? (
            <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
          ) : (
            <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
          )}
          <BlackTextSpan style={{ marginLeft: "10px" }}>
            위치기반 서비스 이용동의
          </BlackTextSpan>
          <BlueTextSpan>
            {"("}필수{")"}
          </BlueTextSpan>
        </span>
        <a href={links.LLocationAgree} target={"_blank"}>
          <span style={{ position: "absolute", right: "0%" }}>
            <FontAwesomeIcon icon={faChevronRight} color={colors.LightGray} />
          </span>
        </a>
      </TextSpanDiv>
      <TextSpanDiv>
        <span
          onClick={() => {
            dispatch({ type: "setAgree4", payload: !state.agree4 });
          }}
        >
          {state.agree4 ? (
            <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
          ) : (
            <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
          )}
          <BlackTextSpan style={{ marginLeft: "10px" }}>
            네시모해 마케팅 수신동의
          </BlackTextSpan>
          <GrayTextSpan>
            {"("}선택{")"}
          </GrayTextSpan>
        </span>
        <a href={links.LMarketingAgree} target={"_blank"}>
          <span style={{ position: "absolute", right: "0%" }}>
            <FontAwesomeIcon icon={faChevronRight} color={colors.LightGray} />
          </span>
        </a>
      </TextSpanDiv>
      <NextButton
        onClick={onNext}
        disabled={!(state.agree1 && state.agree3 && state.agree3)}
      >
        시작하기
      </NextButton>
    </ContainerwithLeftRightMargin>
  );
}

const TextSpanDiv = styled.div`
  width: 100%;
  margin-top: 8px;
  position: relative;
  cursor: pointer;
`;

const RightTextSpanDiv = styled(TextSpanDiv)`
  width: 10%;
`;
const LeftTextSpanDiv = styled(TextSpanDiv)`
  width: 90%;
`;

const BlackTextSpan = styled(SubTextSpan)`
  color: ${colors.Black};
  font-size: 14px;
`;

const BlueTextSpan = styled(SubTextSpan)`
  color: ${colors.MidBlue};
  font-size: 14px;
`;

const GrayTextSpan = styled(SubTextSpan)`
  font-size: 14px;
`;
