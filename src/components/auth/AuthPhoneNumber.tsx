import styled from "styled-components";
import React, { useState } from "react";
import {
  ContainerwithLeftRightMargin,
  Heading,
  SubText,
  colors,
  NextButton,
} from "../../styles";
import { AuthState, AuthAction } from "./types";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthPhoneNumber({ onNext, state, dispatch }: Props) {
  const Validate = (data: string) => {
    if (data.length < 10 || data.length > 11) {
      dispatch({ type: "setStage1Valid", payload: false });
    } else if (data[0] !== "0" || data[1] !== "1" || data[2] !== "0") {
      dispatch({ type: "setStage1Valid", payload: false });
    } else if (isNaN(Number(data)) || Number(data) < 0) {
      dispatch({ type: "setStage1Valid", payload: false });
    } else {
      dispatch({ type: "setStage1Valid", payload: true });
    }
  };

  const preventDefaultAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <form onSubmit={preventDefaultAction}>
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
        <NextButton
          type="submit"
          onClick={onNext}
          disabled={!state.stage1Valid}
        >
          다음
        </NextButton>
      </form>
    </ContainerwithLeftRightMargin>
  );
}

const PhoneNumberInput = styled.input`
  margin-top: 40px;
  padding: 0 10px;
  width: 100%;
  height: 56px;
  border-radius: 0;
  border: 0px;
  border-bottom: 1px solid ${colors.BareGray};
`;
