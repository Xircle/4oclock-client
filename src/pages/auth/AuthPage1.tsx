import styled from "styled-components";
import React, { useState } from "react";
import {
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  Heading,
  SubText,
  colors,
  MainBtn,
  NextButtonDisabled,
  NextButtonEnabled,
} from "../../styles";
import { AuthState, AuthAction } from "./types";
import routes from "../../routes";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthPage1({
  onNext,
  state,
  dispatch,
  ...props
}: Props) {
  const Validate = (data: string) => {
    if (data.length < 10 || data.length > 11) {
      dispatch({ type: "setStage1Valid", payload: false });
      return;
    } else if (data[0] !== "0" || data[1] !== "1" || data[2] !== "0") {
      dispatch({ type: "setStage1Valid", payload: false });
      return;
    } else {
      for (var i = 3; i < data.length; i++) {
        if (data[i] < "0" || data[i] > "9") {
          dispatch({ type: "setStage1Valid", payload: false });
          return;
        }
      }
      dispatch({ type: "setStage1Valid", payload: true });
    }
  };

  return (
    <ContainerwithLeftRightMargin>
      <Heading style={{ lineHeight: "35px" }}>
        친구들과
        <br /> 맛있는 밥 먹으러 갈까요?
      </Heading>
      <SubText style={{ lineHeight: "20px", marginTop: "12px" }}>
        단톡방을 만들어드리는 용도로 사용되기에 꼭! 사용하시는 전화번호를
        적어주셔야 해요.
      </SubText>
      <form>
        <PhoneNumberInput
          placeholder="전화번호를 입력해주세요"
          type="number"
          name="phone"
          value={state.phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: "setPhoneNumber", payload: e.target.value });
            Validate(e.target.value);
          }}
        />
      </form>
      {state.stage1Valid ? (
        <NextButtonEnabled onClick={onNext}>다음</NextButtonEnabled>
      ) : (
        <NextButtonDisabled>다음</NextButtonDisabled>
      )}
    </ContainerwithLeftRightMargin>
  );
}

const PhoneNumberInput = styled.input`
  margin-top: 40px;
  padding: 0px;
  width: 100%;
  height: 56px;
  border-radius: 0;
  border: 0px;
  border-bottom: 1px solid ${colors.BareGray};
`;
