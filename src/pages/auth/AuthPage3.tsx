import styled from "styled-components";
import {
  ContainerwithLeftRightMargin,
  Heading,
  SubText,
  colors,
  MainBtn,
  NextButtonDisabled,
  Avartar,
  FlexDiv,
  NextButtonEnabled,
} from "../../styles";
import { DummyAvartar } from "../../dummyResources/dummyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AuthState, AuthAction } from "./types";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthPage3({
  onNext,
  state,
  dispatch,
  ...props
}: Props) {
  const [isSelected1, setIsSelected1] = useState<boolean>(false);

  return (
    <ContainerwithLeftRightMargin>
      <Heading>마지막! 프로필 사진</Heading>
      <SubText style={{ marginTop: "12px" }}>
        개성이 나타나는 사진을 업로드해주세요!
      </SubText>
      <FlexDiv
        style={{ marginTop: "29px" }}
        onClick={() => setIsSelected1(true)}
      >
        <Avartar src={DummyAvartar} style={{ width: "78px", height: "78px" }} />
      </FlexDiv>
      <FlexDiv
        style={{
          marginTop: "11px",
          fontSize: "13px",
          fontWeight: 700,
          color: colors.MidBlue,
        }}
      >
        <p>프로필사진 수정하러가기</p>
      </FlexDiv>
      <SubText
        style={{ fontSize: "13px", fontWeight: "bold", marginTop: "36px" }}
      >
        #프로필 사진 예시
      </SubText>
      <SubText
        style={{
          fontSize: "10px",
          fontWeight: 500,
          marginTop: "2px",
          lineHeight: "17px",
        }}
      >
        관심사를 즐기는 사진 / 좋아하는 공간에서 찍은 사진 / 개성이 담긴 사진
      </SubText>
      <FlexDiv style={{ justifyContent: "space-around", marginTop: "16px" }}>
        <div>
          <Avartar
            src={DummyAvartar}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div>
          <Avartar
            src={DummyAvartar}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div>
          <Avartar
            src={DummyAvartar}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div>
          <Avartar
            src={DummyAvartar}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      </FlexDiv>
      <FlexDiv
        style={{
          justifyContent: "space-around",
          transform: "translateY(-10px)",
        }}
      >
        <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
        <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
        <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
        <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
      </FlexDiv>
      {isSelected1 ? (
        <NextButtonEnabled onClick={onNext}>다음</NextButtonEnabled>
      ) : (
        <NextButtonDisabled>다음</NextButtonDisabled>
      )}
    </ContainerwithLeftRightMargin>
  );
}
