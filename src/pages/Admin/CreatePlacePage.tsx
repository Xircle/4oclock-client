import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Container,
  Heading,
  MidInput,
  colors,
  FileLabel,
  FlexDiv,
  Avartar,
} from "../../styles/styles";
import DatePicker from "react-date-picker";

interface Props {}

export default function CreatePlacePage(props: Props) {
  const [startDate, setStartDate] = useState(new Date());
  const [mainFile, setMainFile] = useState<File>();
  const [subFiles, setSubFiles] = useState<File[]>([]);
  const [mainFileUrl, setMainFileUrl] = useState<string>();
  const [subFilesUrl, setSubFilesUrl] = useState<string[]>([]);

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;

    const files = e.target.files;
    const __file = files[0];
    const __size = files[0]?.size;

    console.log(files.length);

    if (__size > 10000000) {
      return alert(
        "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. "
      );
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(__file);
    fileReader.onload = (e) => {
      setMainFileUrl(e.target!.result as string);
    };
    setMainFile(__file);
  };
  const handleFilesOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;

    const files = e.target.files;
    const __file = files[0];
    const __size = files[0]?.size;

    console.log(files.length);
    for (let i = 0; i < files.length; i++) {
      if (files[i]?.size > 10000000) {
        return alert(
          "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. "
        );
      }
    }
    const fileReader = new FileReader();

    Array.from(files).forEach((file) => {
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        setSubFilesUrl([...subFilesUrl, e.target!.result as string]);
      };
      setSubFiles([...subFiles, file]);
    });
  };

  return (
    <Container>
      <Heading>장소 생성</Heading>
      <form>
        <SubContainer>
          모임 이름
          <br />
          <MidInput name="name" placeholder="name" />
        </SubContainer>
        <SubContainer>
          모임일
          <div>
            <DatePicker onChange={setStartDate} value={startDate} />
          </div>
        </SubContainer>
        <SubContainer>
          모임시간 (0~24)
          <br />
          <MidInput name="time" placeholder="time" type="number" />
        </SubContainer>
        <SubContainer>
          대략적 위치
          <select
            id=""
            name="location"
            style={{ marginTop: "12px", color: colors.Black }}
          >
            <option value="전체" style={{ color: colors.Black }}>
              전체
            </option>
            <option value="안암" style={{ color: colors.Black }}>
              안암
            </option>
            <option value="신촌" style={{ color: colors.Black }}>
              신촌
            </option>
          </select>
        </SubContainer>
        <SubContainer>
          제한 (ex. 20세~26세, 모든)
          <br />
          <MidInput name="recommendation" placeholder="recommendation" />
        </SubContainer>
        <SubContainer>
          <FileLabel htmlFor="main-files">
            <FlexDiv>메인사진 넣기</FlexDiv>
            <input
              id="main-files"
              type="file"
              onChange={handleFileOnChange}
              style={{ display: "none" }}
            />
          </FileLabel>
        </SubContainer>
        <SubContainer>
          <FileLabel htmlFor="sub-files">
            <FlexDiv>서브사진(들) 넣기</FlexDiv>
            <input
              id="sub-files"
              type="file"
              onChange={handleFilesOnChange}
              style={{ display: "none" }}
              multiple
            />
          </FileLabel>
        </SubContainer>
      </form>
    </Container>
  );
}

const SubContainer = styled(Container)`
  margin: 50px 0;
`;

const AvartarProfile = styled(Avartar)`
  width: 125px;
  height: 125px;
  margin-top: 45px;
`;
