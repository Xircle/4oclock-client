import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Container,
  Heading,
  MidInput,
  colors,
  FileLabel,
  FlexDiv,
  BigTextArea,
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
  // useEffect(() => {
  //   console.log(subFilesUrl);
  // }, [subFilesUrl]);
  // useEffect(() => {
  //   console.log(subFiles);
  // }, [subFiles]);

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
    setSubFilesUrl([]);
    setSubFiles([]);
    const files = e.target.files;

    console.log(files.length);
    for (let i = 0; i < files.length; i++) {
      if (files[i]?.size > 10000000) {
        return alert(
          "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. "
        );
      }
    }
    Array.from(files).forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        setSubFilesUrl((prev) => [...prev, e.target!.result as string]);
      };
      setSubFiles((prev) => [...prev, file]);
    });
  };

  return (
    <Container>
      <Heading>장소 생성</Heading>
      <form>
        <SubContainer>
          모임 이름
          <br />
          <MidInput name="name" placeholder="ex. 한잔의 추억" />
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
          <MidInput name="time" placeholder="ex. 6" type="number" />
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
          <div>
            {mainFileUrl && (
              <Photo src={mainFileUrl || "/avatar/anonymous_user.png"}></Photo>
            )}
          </div>
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
          <div>
            {subFilesUrl.map((fileUrl, idx) => (
              <Photo
                key={idx}
                src={fileUrl || "/avatar/anonymous_user.png"}
              ></Photo>
            ))}
          </div>
        </SubContainer>
        <SubContainer>
          리뷰(서브사진 숫자와 맞추어주시고 (,)로 나누어주세요)
          <br />
          <BigTextArea
            name="reviewDescriptions"
            placeholder="ex. 정말 꿀잼인듯!, 와 이런장소가 있었다니 또 와야겠네요"
          />
        </SubContainer>
        <SubContainer>
          제목
          <br />
          <MidInput name="name" placeholder="ex. 고대 근본 막걸리집" />
        </SubContainer>
        <SubContainer>
          모임 이름
          <br />
          <MidInput name="name" placeholder="ex. 한잔의 추억" />
        </SubContainer>
        <SubContainer>
          설명
          <br />
          <BigTextArea
            name="description"
            placeholder="ex. 맥주는 싱거우니 신촌골로 돌려라~언제나 정겹고, 언제나 맛있는 바로 그 가게!아는 분들은 다 알고 계시죠?"
          />
        </SubContainer>
        <SubContainer>
          카테고리(,로 나누어주세요)
          <br />
          <MidInput
            name="categories"
            placeholder="ex. 막걸리,안주맛,북적북적"
          />
        </SubContainer>
        <SubContainer>
          상세주소(Kakao map에서 지번 그대로 가져오기)
          <br />
          <MidInput
            name="detailAddress"
            placeholder="ex. 서울 성북구 고려대로24길 58-5"
          />
        </SubContainer>
        <SubContainer>
          링크 (네이버지도에서 장소검색시 나오는 URL)
          <br />
          <MidInput
            name="detailLink"
            placeholder="ex. https://map.naver.com/v5/search/%EB%A7%89%EA%B1%B8%EB%A6%AC%EC%B0%AC%EA%B0%80/place/100544741?c=14140901.3122277,4520956.3955455,15,0,0,0,dh"
          />
        </SubContainer>
        <SubContainer>
          한줄소개
          <br />
          <MidInput
            name="oneLineIntroText"
            placeholder="ex. 안주 좋고, 기분 좋은 고대 근본 막걸리집"
          />
        </SubContainer>
        <SubContainer>
          참가비 숫자로
          <br />
          <MidInput name="participationFee" placeholder="ex. 0" type="number" />
        </SubContainer>
        <SubContainer>
          번개? (맞으면 예)
          <br />
          <select
            id=""
            name="isLightning"
            style={{ marginTop: "12px", color: colors.Black }}
          >
            <option value="false" style={{ color: colors.Black }}>
              아니오
            </option>
            <option value="true" style={{ color: colors.Black }}>
              예
            </option>
          </select>
        </SubContainer>
        <SubContainer>
          모임 인원수 (숫자)
          <br />
          <MidInput
            name="maxParticipantsNumber"
            placeholder="ex. 4"
            type="number"
          />
        </SubContainer>
      </form>
    </Container>
  );
}

const SubContainer = styled(Container)`
  margin: 50px 0;
`;

const Photo = styled.img`
  width: 125px;
  height: 125px;
  margin-top: 45px;
  border-radius: none;
  object-fit: cover;
`;
