import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { colors, MidInput } from "../../styles/styles";
import {
  BlankSpace,
  CancelWordCount,
  Container,
  MultilineInput,
  NextButton,
  OnelineInput,
} from "./CreateTeam1";
import Label from "./Label";
import { TeamAction, TeamState } from "./types";

interface Props {
  onNext: () => void;
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

export default function CreateTeam2({ onNext, state, dispatch }: Props) {
  const [filesUrl, setFilesUrl] = useState<string[]>([]);

  const disabledNext =
    state.oneLineInfo?.length > 0 &&
    state.description &&
    state.description?.length > 0 &&
    state.images?.length > 1
      ? false
      : true;

  const handleFilesOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;

    const files = e.target.files;

    console.log(files.length);
    for (let i = 0; i < files.length; i++) {
      if (files[i]?.size > 10000000) {
        return alert(
          "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. ",
        );
      }
    }
    setFilesUrl([]);
    let images: File[] = [];
    Array.from(files).forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        setFilesUrl((prev) => [...prev, e.target!.result as string]);
      };
      images.push(file);
    });
    dispatch({ type: "setImages", payload: images });
  };

  return (
    <Container>
      <Label mandatory={true} labelName="클럽 활동 소개" />
      <OnelineInput
        placeholder="활동을 간단하게 표현한 한줄소개를 적어주세요!"
        type="text"
        name="clubOneLineInfo"
        // style={
        //   ageError
        //     ? { marginTop: "12px", borderColor: colors.StrongLime }
        //     : { marginTop: "12px" }
        // }
        value={state.oneLineInfo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "setOneLineInfo", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
      <CancelWordCount>{state.oneLineInfo?.length ?? 0}/30</CancelWordCount>
      <Label
        mandatory={true}
        labelName="클럽소개 세부글"
        description="진행하실 클럽에 대한 소개를 적어주세요!"
      />
      <MultilineInput
        name="description"
        value={state.description}
        placeholder="프렌즈들에게 보여주는 리더의 자기소개를 적어주세요!"
        // style={
        //   bioError
        //     ? {
        //         fontSize: "12px",
        //         lineHeight: "18px",
        //         borderColor: colors.MidBlue,
        //       }
        //     : { fontSize: "12px", lineHeight: "18px" }
        // }
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          dispatch({ type: "setDescription", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
      <CancelWordCount>{state.description?.length ?? 0}/30</CancelWordCount>
      <Label
        mandatory={true}
        labelName="클럽 소개 사진 올리기(2개 필수)"
        description="설명만으로는 부족한 my클럽을 표현하는 사진을 올려주세요!
사진을 통해 클럽의 매력을 발산해주세요!"
      />
      <PhotoContainer htmlFor="files">
        <FontAwesomeIcon icon={faCamera} color="#A7B0C0" size="2x" />
        <PhotoText>사진 추가</PhotoText>
        <input
          id="files"
          type="file"
          onChange={handleFilesOnChange}
          style={{ display: "none" }}
          multiple
        />
      </PhotoContainer>
      <PhotosContainer>
        {filesUrl.map((fileUrl, idx) => (
          <Photo
            key={idx}
            src={fileUrl || "/avatar/anonymous_user.png"}
          ></Photo>
        ))}
      </PhotosContainer>
      <BlankSpace />
      <NextButton type="submit" disabled={disabledNext} onClick={onNext}>
        다음(2/3)
      </NextButton>
    </Container>
  );
}

const PhotoContainer = styled.label`
  width: 100%;
  height: 150px;
  background-color: #f0eeee;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #12121d;
`;

const PhotoText = styled.div`
  margin-left: 18px;
`;

const PhotosContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const Photo = styled.img`
  width: 110px;
  height: 110px;
  border-radius: none;
  object-fit: cover;
`;
