import {
  ContainerwithLeftRightMargin,
  Heading,
  SubText,
  colors,
  NextButton,
  Avartar,
  FlexDiv,
  FileLabel,
} from "../../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AuthState, AuthAction } from "./types";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthProfileImage({ onNext, state, dispatch }: Props) {
  const [localImageSrc, setLocalImageSrc] = useState<string | undefined>(
    state.profileImgUrl,
  );

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;

    const files = e.target.files;
    const __file = files[0];
    const __size = files[0]?.size;

    if (__size > 10000000) {
      return alert(
        "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. ",
      );
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(__file);
    fileReader.onload = (e) => {
      setLocalImageSrc(e.target!.result as string);
      dispatch({
        type: "setProfileImgUrl",
        payload: e.target!.result as string,
      });
    };
    dispatch({ type: "setProfileImgFile", payload: __file });
  };

  return (
    <ContainerwithLeftRightMargin>
      <Heading>마지막! 프로필 사진</Heading>
      <SubText style={{ marginTop: "12px" }}>
        개성이 나타나는 사진을 업로드해주세요!
      </SubText>
      <div>
        <FileLabel htmlFor="input-file">
          <FlexDiv>
            <Avartar
              src={localImageSrc || "/avatar/anonymous_user.png"}
              style={{ width: "78px", height: "78px" }}
            />
          </FlexDiv>
          <input
            id="input-file"
            type="file"
            onChange={handleFileOnChange}
            style={{ display: "none" }}
          />
          <FlexDiv
            style={{
              marginTop: "11px",
              fontSize: "14px",
              fontWeight: 700,
              color: colors.StrongLime,
            }}
          >
            <p style={{ color: colors.StrongLime }}>프로필사진 업로드하기</p>
          </FlexDiv>
        </FileLabel>
      </div>
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
        관심사를 즐기는 사진 / 좋아하는 공간에서 찍은 사진 / 라이프 스타일이
        보여지는 사진 / 모임을 즐기고 있는 사진
      </SubText>
      <FlexDiv style={{ justifyContent: "space-around", marginTop: "16px" }}>
        <div>
          <Avartar
            src="/avatar/Avartar001.jpeg"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div>
          <Avartar
            src="/avatar/Avartar002.jpeg"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div>
          <Avartar
            src="/avatar/Avartar003.jpeg"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div>
          <Avartar
            src="/avatar/Avartar004.jpeg"
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
        <FontAwesomeIcon icon={faCheckCircle} color={colors.StrongLime} />
        <FontAwesomeIcon icon={faCheckCircle} color={colors.StrongLime} />
        <FontAwesomeIcon icon={faCheckCircle} color={colors.StrongLime} />
        <FontAwesomeIcon icon={faCheckCircle} color={colors.StrongLime} />
      </FlexDiv>
      <NextButton
        disabled={!localImageSrc && !state.profileImgFile}
        type="submit"
        onClick={onNext}
      >
        가입하기
      </NextButton>
    </ContainerwithLeftRightMargin>
  );
}
